// ---------- Storage ----------
const STORAGE_KEY = "mathsApp.state.v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { daily: {}, chapterStats: {} };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const state = loadState();

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function recordAttempt(chapter, correct) {
  const day = todayKey();
  if (!state.daily[day]) state.daily[day] = { solved: 0, correct: 0 };
  state.daily[day].solved += 1;
  if (correct) state.daily[day].correct += 1;

  if (!state.chapterStats[chapter]) state.chapterStats[chapter] = { attempted: 0, correct: 0 };
  state.chapterStats[chapter].attempted += 1;
  if (correct) state.chapterStats[chapter].correct += 1;

  saveState();
}

function lastNDays(n) {
  const days = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const dd = new Date(d);
    dd.setDate(d.getDate() - i);
    const key = `${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(2, "0")}-${String(dd.getDate()).padStart(2, "0")}`;
    days.push({ key, label: dd.toLocaleDateString(undefined, { weekday: "short" })[0] });
  }
  return days;
}

function currentStreak() {
  let streak = 0;
  const d = new Date();
  for (;;) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const entry = state.daily[key];
    if (entry && entry.solved > 0) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// ---------- Router ----------
let activeTab = "dashboard";
const app = document.getElementById("app");
const tabButtons = document.querySelectorAll(".tabbar button");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});

function setTab(tab) {
  activeTab = tab;
  tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  render();
}

function render() {
  if (activeTab === "dashboard") renderDashboard();
  else if (activeTab === "practice") renderPractice();
  else if (activeTab === "flashcards") renderFlashcards();
  else if (activeTab === "mcq") renderMcq();
}

// ---------- Dashboard ----------
function renderDashboard() {
  const days = lastNDays(7);
  const totalSolved = Object.values(state.daily).reduce((s, d) => s + d.solved, 0);
  const todaySolved = (state.daily[todayKey()] || { solved: 0 }).solved;
  const streak = currentStreak();
  const maxSolved = Math.max(1, ...days.map((d) => (state.daily[d.key] || { solved: 0 }).solved));

  const barsHtml = days
    .map((d) => {
      const solved = (state.daily[d.key] || { solved: 0 }).solved;
      const heightPct = Math.max(4, (solved / maxSolved) * 100);
      return `<div class="bar-wrap">
        <div class="bar" style="height:${heightPct}%" title="${solved} solved"></div>
        <div class="bar-day">${d.label}</div>
      </div>`;
    })
    .join("");

  const chapterRows = CHAPTERS.map((ch) => {
    const s = state.chapterStats[ch] || { attempted: 0, correct: 0 };
    const total = PROBLEMS.filter((p) => p.chapter === ch).length;
    const pct = total ? Math.min(100, (s.attempted / total) * 100) : 0;
    return `<div class="chapter-row">
      <div class="name">${ch}</div>
      <div class="track"><div class="fill" style="width:${pct}%"></div></div>
      <div class="count">${s.attempted}/${total}</div>
    </div>`;
  }).join("");

  app.innerHTML = `
    <div class="stat-row">
      <div class="stat-card"><div class="num">${todaySolved}</div><div class="label">Solved today</div></div>
      <div class="stat-card"><div class="num">${streak}🔥</div><div class="label">Day streak</div></div>
    </div>
    <div class="stat-row">
      <div class="stat-card"><div class="num">${totalSolved}</div><div class="label">Total solved</div></div>
      <div class="stat-card"><div class="num">${Object.keys(state.daily).length}</div><div class="label">Active days</div></div>
    </div>
    <div class="chart">
      <h3>Last 7 days</h3>
      <div class="bars">${barsHtml}</div>
    </div>
    <div class="chapter-progress">
      <h3>Chapter coverage</h3>
      ${chapterRows}
    </div>
  `;
}

// ---------- Practice ----------
let practiceChapter = "All";
let practiceQueue = [];
let practiceIndex = 0;
let answerShown = false;

function buildPracticeQueue() {
  const pool = practiceChapter === "All" ? PROBLEMS : PROBLEMS.filter((p) => p.chapter === practiceChapter);
  practiceQueue = [...pool].sort(() => Math.random() - 0.5);
  practiceIndex = 0;
  answerShown = false;
}

function renderPractice() {
  if (practiceQueue.length === 0) buildPracticeQueue();

  const chips = ["All", ...CHAPTERS]
    .map((ch) => `<div class="chip ${ch === practiceChapter ? "active" : ""}" data-chapter="${ch}">${ch}</div>`)
    .join("");

  if (practiceQueue.length === 0) {
    app.innerHTML = `<div class="chip-row">${chips}</div><div class="card"><div class="qtext">No problems in this chapter yet.</div></div>`;
    bindPracticeChips();
    return;
  }

  if (practiceIndex >= practiceQueue.length) {
    practiceIndex = 0;
    practiceQueue = [...practiceQueue].sort(() => Math.random() - 0.5);
  }

  const problem = practiceQueue[practiceIndex];

  app.innerHTML = `
    <div class="chip-row">${chips}</div>
    <div class="progress-text">Question ${practiceIndex + 1} of ${practiceQueue.length}</div>
    <div class="card">
      <div class="tag">${problem.chapter}</div>
      <div class="qtext">${problem.q}</div>
      ${answerShown ? `<div class="answer">✅ ${problem.a}</div>` : `<div class="hint">Hint: ${problem.hint}</div>`}
    </div>
    <div class="btn-row">
      ${
        answerShown
          ? `<button class="good" id="markRight">Got it right</button><button class="bad" id="markWrong">Got it wrong</button>`
          : `<button id="showAnswer">Show Answer</button>`
      }
    </div>
  `;

  bindPracticeChips();

  const showBtn = document.getElementById("showAnswer");
  if (showBtn) showBtn.addEventListener("click", () => { answerShown = true; renderPractice(); });

  const rightBtn = document.getElementById("markRight");
  const wrongBtn = document.getElementById("markWrong");
  if (rightBtn) rightBtn.addEventListener("click", () => nextPracticeQuestion(problem, true));
  if (wrongBtn) wrongBtn.addEventListener("click", () => nextPracticeQuestion(problem, false));
}

function nextPracticeQuestion(problem, correct) {
  recordAttempt(problem.chapter, correct);
  practiceIndex += 1;
  answerShown = false;
  renderPractice();
}

function bindPracticeChips() {
  document.querySelectorAll("[data-chapter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      practiceChapter = chip.dataset.chapter;
      buildPracticeQueue();
      renderPractice();
    });
  });
}

// ---------- Flashcards ----------
let flashChapter = "All";
let flashDeck = [];
let flashIndex = 0;
let flashFlipped = false;

function buildFlashDeck() {
  const pool = flashChapter === "All" ? FLASHCARDS : FLASHCARDS.filter((f) => f.chapter === flashChapter);
  flashDeck = [...pool].sort(() => Math.random() - 0.5);
  flashIndex = 0;
  flashFlipped = false;
}

function renderFlashcards() {
  if (flashDeck.length === 0) buildFlashDeck();

  const chips = ["All", ...CHAPTERS]
    .map((ch) => `<div class="chip ${ch === flashChapter ? "active" : ""}" data-fchapter="${ch}">${ch}</div>`)
    .join("");

  if (flashDeck.length === 0) {
    app.innerHTML = `<div class="chip-row">${chips}</div><div class="flashcard">No flashcards in this chapter yet.</div>`;
    bindFlashChips();
    return;
  }

  if (flashIndex >= flashDeck.length) flashIndex = 0;
  const card = flashDeck[flashIndex];

  app.innerHTML = `
    <div class="chip-row">${chips}</div>
    <div class="progress-text">Card ${flashIndex + 1} of ${flashDeck.length}</div>
    <div class="flashcard" id="flashcard">
      <div class="tag">${card.chapter}</div>
      ${flashFlipped ? `<div class="back-text">${card.back}</div>` : `<div class="front-text">${card.front}</div>`}
      <div class="flip-hint">${flashFlipped ? "Tap to see term" : "Tap card to reveal formula"}</div>
    </div>
    <div class="btn-row">
      <button class="secondary" id="shuffleFlash">Shuffle</button>
      <button id="nextFlash">Next Card</button>
    </div>
  `;

  bindFlashChips();
  document.getElementById("flashcard").addEventListener("click", () => {
    flashFlipped = !flashFlipped;
    renderFlashcards();
  });
  document.getElementById("nextFlash").addEventListener("click", () => {
    flashIndex += 1;
    flashFlipped = false;
    renderFlashcards();
  });
  document.getElementById("shuffleFlash").addEventListener("click", () => {
    buildFlashDeck();
    renderFlashcards();
  });
}

function bindFlashChips() {
  document.querySelectorAll("[data-fchapter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      flashChapter = chip.dataset.fchapter;
      buildFlashDeck();
      renderFlashcards();
    });
  });
}

// ---------- MCQ ----------
const MCQ_SESSION_LENGTH = 8;
let mcqChapter = "All";
let mcqSession = [];
let mcqIndex = 0;
let mcqScore = 0;
let mcqAnswered = false;
let mcqSelected = -1;
let mcqStarted = false;

function buildMcqSession() {
  const pool = mcqChapter === "All" ? MCQS : MCQS.filter((m) => m.chapter === mcqChapter);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  mcqSession = shuffled.slice(0, Math.min(MCQ_SESSION_LENGTH, shuffled.length));
  mcqIndex = 0;
  mcqScore = 0;
  mcqAnswered = false;
  mcqSelected = -1;
  mcqStarted = true;
}

function renderMcq() {
  const chips = ["All", ...CHAPTERS]
    .map((ch) => `<div class="chip ${ch === mcqChapter ? "active" : ""}" data-mchapter="${ch}">${ch}</div>`)
    .join("");

  if (!mcqStarted) {
    app.innerHTML = `
      <div class="chip-row">${chips}</div>
      <div class="score-banner">
        <div class="big">MCQ Quiz</div>
        <p>Test yourself on formulae &amp; concepts. ${MCQ_SESSION_LENGTH} questions per round.</p>
        <button id="startMcq">Start Quiz</button>
      </div>
    `;
    bindMcqChips();
    document.getElementById("startMcq").addEventListener("click", () => { buildMcqSession(); renderMcq(); });
    return;
  }

  if (mcqSession.length === 0) {
    app.innerHTML = `<div class="chip-row">${chips}</div><div class="card"><div class="qtext">No MCQs in this chapter yet.</div></div>`;
    bindMcqChips();
    return;
  }

  if (mcqIndex >= mcqSession.length) {
    app.innerHTML = `
      <div class="score-banner">
        <div class="big">${mcqScore} / ${mcqSession.length}</div>
        <p>Quiz complete! Nice work.</p>
        <div class="btn-row">
          <button class="secondary" id="backToStart">Change Chapter</button>
          <button id="retryMcq">Play Again</button>
        </div>
      </div>
    `;
    document.getElementById("retryMcq").addEventListener("click", () => { buildMcqSession(); renderMcq(); });
    document.getElementById("backToStart").addEventListener("click", () => { mcqStarted = false; renderMcq(); });
    return;
  }

  const item = mcqSession[mcqIndex];
  const optionsHtml = item.options
    .map((opt, i) => {
      let cls = "option-btn";
      if (mcqAnswered) {
        if (i === item.answerIndex) cls += " correct";
        else if (i === mcqSelected) cls += " incorrect";
      }
      return `<button class="${cls}" data-opt="${i}" ${mcqAnswered ? "disabled" : ""}>${opt}</button>`;
    })
    .join("");

  app.innerHTML = `
    <div class="chip-row">${chips}</div>
    <div class="progress-text">Question ${mcqIndex + 1} of ${mcqSession.length} &middot; Score: ${mcqScore}</div>
    <div class="card">
      <div class="tag">${item.chapter}</div>
      <div class="qtext">${item.q}</div>
      <div class="mcq-options">${optionsHtml}</div>
    </div>
    <div class="btn-row">
      ${mcqAnswered ? `<button id="nextMcq">Next Question</button>` : ""}
    </div>
  `;

  bindMcqChips();

  if (!mcqAnswered) {
    document.querySelectorAll("[data-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        mcqSelected = parseInt(btn.dataset.opt, 10);
        mcqAnswered = true;
        const correct = mcqSelected === item.answerIndex;
        if (correct) mcqScore += 1;
        recordAttempt(item.chapter, correct);
        renderMcq();
      });
    });
  } else {
    document.getElementById("nextMcq").addEventListener("click", () => {
      mcqIndex += 1;
      mcqAnswered = false;
      mcqSelected = -1;
      renderMcq();
    });
  }
}

function bindMcqChips() {
  document.querySelectorAll("[data-mchapter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      mcqChapter = chip.dataset.mchapter;
      mcqStarted = false;
      renderMcq();
    });
  });
}

// ---------- Init ----------
setTab("dashboard");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
