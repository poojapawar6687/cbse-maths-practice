// CBSE Class 10 Maths content bank

const CHAPTERS = [
  "Real Numbers",
  "Polynomials",
  "Pair of Linear Equations",
  "Quadratic Equations",
  "Arithmetic Progressions",
  "Triangles",
  "Coordinate Geometry",
  "Trigonometry",
  "Circles",
  "Areas Related to Circles",
  "Surface Areas and Volumes",
  "Statistics",
  "Probability",
];

// ---------- PRACTICE PROBLEMS ----------
// Each problem: { chapter, q, a (answer text), hint }
const PROBLEMS = [
  // Real Numbers
  { chapter: "Real Numbers", q: "Find the HCF and LCM of 6 and 20 by prime factorisation.", a: "HCF = 2, LCM = 60", hint: "6 = 2×3, 20 = 2²×5" },
  { chapter: "Real Numbers", q: "Prove that √5 is irrational (state the key idea).", a: "Assume √5 = p/q in lowest terms, show 5 divides p and q, contradiction — so √5 is irrational.", hint: "Use contradiction method" },
  { chapter: "Real Numbers", q: "Find the LCM and HCF of 26 and 91 and verify LCM×HCF = product of numbers.", a: "HCF = 13, LCM = 182; 13×182 = 26×91 = 2366", hint: "26 = 2×13, 91 = 7×13" },
  { chapter: "Real Numbers", q: "Without actual division, state whether 13/3125 has a terminating decimal expansion.", a: "Yes, since 3125 = 5^5 (only prime factors 2 and/or 5).", hint: "Check denominator's prime factors" },
  { chapter: "Real Numbers", q: "Find HCF(96, 404) using Euclid's division algorithm.", a: "HCF = 4", hint: "404 = 4×96 + 20; 96 = 4×20 + 16; 20 = 1×16 + 4; 16 = 4×4 + 0" },

  // Polynomials
  { chapter: "Polynomials", q: "Find the zeroes of p(x) = x² - 3x - 10 and verify the relation between zeroes and coefficients.", a: "Zeroes: 5 and -2. Sum = 3 = -b/a, Product = -10 = c/a", hint: "Factorise: (x-5)(x+2)" },
  { chapter: "Polynomials", q: "If α, β are zeroes of x² - 5x + 6, find α² + β².", a: "α+β=5, αβ=6, α²+β² = 25-12 = 13", hint: "(α+β)² - 2αβ" },
  { chapter: "Polynomials", q: "Find a quadratic polynomial whose sum and product of zeroes are 3 and -2 respectively.", a: "x² - 3x - 2", hint: "x² - (sum)x + product" },
  { chapter: "Polynomials", q: "Divide 3x² - x³ - 3x + 5 by x - 1 - x² and find quotient & remainder.", a: "Quotient = x - 2, Remainder = 3", hint: "Arrange in standard form first" },

  // Pair of Linear Equations
  { chapter: "Pair of Linear Equations", q: "Solve: x + y = 14, x - y = 4 by substitution.", a: "x = 9, y = 5", hint: "Add the two equations" },
  { chapter: "Pair of Linear Equations", q: "Solve: 2x + 3y = 11, 2x - 4y = -24 by elimination.", a: "x = -2, y = 5", hint: "Subtract equations to eliminate x" },
  { chapter: "Pair of Linear Equations", q: "For what value of k does the pair 2x+3y=7, (k-1)x+(k+2)y=3k have infinitely many solutions?", a: "k = 7", hint: "Use a1/a2 = b1/b2 = c1/c2" },
  { chapter: "Pair of Linear Equations", q: "The sum of two numbers is 8 and difference is 2. Find the numbers.", a: "5 and 3", hint: "Form two linear equations" },

  // Quadratic Equations
  { chapter: "Quadratic Equations", q: "Solve x² - 7x + 12 = 0 by factorisation.", a: "x = 3, 4", hint: "(x-3)(x-4)=0" },
  { chapter: "Quadratic Equations", q: "Find the discriminant of 2x² - 4x + 3 = 0 and state the nature of roots.", a: "D = 16-24 = -8, no real roots", hint: "D = b² - 4ac" },
  { chapter: "Quadratic Equations", q: "Solve 2x² - 5x + 3 = 0 using the quadratic formula.", a: "x = 3/2, 1", hint: "x = [-b ± √(b²-4ac)]/2a" },
  { chapter: "Quadratic Equations", q: "The product of two consecutive positive integers is 306. Find the integers.", a: "17 and 18", hint: "Let integers be x, x+1" },

  // Arithmetic Progressions
  { chapter: "Arithmetic Progressions", q: "Find the 10th term of AP: 2, 7, 12, 17, ...", a: "47", hint: "an = a + (n-1)d" },
  { chapter: "Arithmetic Progressions", q: "Find the sum of first 20 terms of AP: 2, 7, 12, ...", a: "1030", hint: "Sn = n/2[2a+(n-1)d]" },
  { chapter: "Arithmetic Progressions", q: "Which term of the AP 3, 8, 13, 18, ... is 78?", a: "16th term", hint: "78 = 3 + (n-1)5" },
  { chapter: "Arithmetic Progressions", q: "How many terms of AP 9,17,25,... must be taken to give a sum of 636?", a: "12", hint: "Solve n/2[2a+(n-1)d]=636" },

  // Triangles
  { chapter: "Triangles", q: "State and use the Basic Proportionality Theorem (Thales) to explain: In triangle ABC, DE || BC, D on AB, E on AC. What can you conclude?", a: "AD/DB = AE/EC", hint: "DE divides the two sides proportionally" },
  { chapter: "Triangles", q: "Sides of a triangle are 7cm, 24cm, 25cm. Is it right-angled?", a: "Yes, since 7²+24² = 49+576 = 625 = 25²", hint: "Check Pythagoras theorem" },
  { chapter: "Triangles", q: "Two triangles are similar with sides in ratio 4:9. Find the ratio of their areas.", a: "16:81", hint: "Ratio of areas = (ratio of sides)²" },
  { chapter: "Triangles", q: "A ladder 10m long reaches a window 8m above the ground. Find the distance of the foot of the ladder from the base of the wall.", a: "6m", hint: "Use Pythagoras: 10² = 8² + x²" },

  // Coordinate Geometry
  { chapter: "Coordinate Geometry", q: "Find the distance between points (2,3) and (4,1).", a: "2√2", hint: "Distance formula: √[(x2-x1)²+(y2-y1)²]" },
  { chapter: "Coordinate Geometry", q: "Find the coordinates of the point which divides the join of (-1,7) and (4,-3) in ratio 2:3.", a: "(1, 3)", hint: "Section formula: [(m1x2+m2x1)/(m1+m2), ...]" },
  { chapter: "Coordinate Geometry", q: "Find the area of the triangle with vertices (1,-1), (-4,6), (-3,-5).", a: "24 square units", hint: "Use the area formula with determinant" },
  { chapter: "Coordinate Geometry", q: "Find the midpoint of the segment joining (6,2) and (-2,8).", a: "(2, 5)", hint: "Midpoint = ((x1+x2)/2, (y1+y2)/2)" },

  // Trigonometry
  { chapter: "Trigonometry", q: "If sin A = 3/5, find cos A and tan A (A acute).", a: "cos A = 4/5, tan A = 3/4", hint: "Use sin²A + cos²A = 1" },
  { chapter: "Trigonometry", q: "Evaluate: 2 tan²45° + cos²30° - sin²60°.", a: "2", hint: "tan45=1, cos30=√3/2, sin60=√3/2" },
  { chapter: "Trigonometry", q: "Prove: (1 - cos²θ)(1 + cot²θ) = 1 (state the key identity used).", a: "Uses sin²θ = 1-cos²θ and 1+cot²θ = csc²θ, so expression = sin²θ·csc²θ = 1", hint: "1+cot²θ = csc²θ" },
  { chapter: "Trigonometry", q: "A tower's angle of elevation from a point 30m away is 30°. Find the height.", a: "10√3 m", hint: "tan30° = height/30" },
  { chapter: "Trigonometry", q: "If cos A = 12/13, find sin A and tan A (A acute).", a: "sin A = 5/13, tan A = 5/12", hint: "Use sin²A + cos²A = 1, then tanA = sinA/cosA" },
  { chapter: "Trigonometry", q: "Write cosec θ and sec θ in terms of sin θ and cos θ respectively.", a: "cosec θ = 1/sin θ, sec θ = 1/cos θ", hint: "They are reciprocals of sin and cos" },
  { chapter: "Trigonometry", q: "If tan θ = 1, find the value of θ (0° ≤ θ ≤ 90°) and hence find sin θ and cos θ.", a: "θ = 45°, sin θ = cos θ = 1/√2", hint: "tan45° = 1" },
  { chapter: "Trigonometry", q: "Evaluate: (sin 30° + cos 60°) ÷ (cos 30° - sin 60°).", a: "Undefined — since cos30° = sin60°, denominator = 0", hint: "cos30° = sin60° = √3/2" },
  { chapter: "Trigonometry", q: "If sec θ = 2, find cos θ and hence θ.", a: "cos θ = 1/2, θ = 60°", hint: "sec θ = 1/cos θ" },
  { chapter: "Trigonometry", q: "Evaluate: sin60°·cos30° + sin30°·cos60°.", a: "1", hint: "This equals sin(60°+30°) = sin90° = 1" },
  { chapter: "Trigonometry", q: "Prove: cot θ + tan θ = sec θ · cosec θ (state the key steps).", a: "cotθ+tanθ = cosθ/sinθ + sinθ/cosθ = (cos²θ+sin²θ)/(sinθcosθ) = 1/(sinθcosθ) = secθ·cscθ", hint: "Combine over a common denominator, then use sin²θ+cos²θ=1" },
  { chapter: "Trigonometry", q: "Find the value of cot 30° and its full form.", a: "cot 30° = √3; cot = Cotangent", hint: "cot θ = 1/tan θ" },
  { chapter: "Trigonometry", q: "A pole casts a shadow of length 20m when the sun's angle of elevation is 45°. Find the height of the pole.", a: "20 m", hint: "tan45° = height/shadow = 1" },

  // Circles
  { chapter: "Circles", q: "From an external point, two tangents are drawn to a circle. What can you say about their lengths?", a: "They are equal", hint: "Tangents from an external point theorem" },
  { chapter: "Circles", q: "A tangent to a circle is perpendicular to what line at the point of contact?", a: "The radius through that point", hint: "Tangent-radius property" },
  { chapter: "Circles", q: "The length of a tangent from a point 10cm from the centre of a circle of radius 6cm is?", a: "8cm", hint: "Use Pythagoras: tangent² + radius² = distance²" },

  // Areas Related to Circles
  { chapter: "Areas Related to Circles", q: "Find the area of a circle of radius 7cm. (use π=22/7)", a: "154 cm²", hint: "Area = πr²" },
  { chapter: "Areas Related to Circles", q: "Find the area of a sector of angle 60° in a circle of radius 21cm.", a: "231 cm²", hint: "Area = (θ/360)×πr²" },
  { chapter: "Areas Related to Circles", q: "Find the circumference of a circle of diameter 21cm. (use π=22/7)", a: "66 cm", hint: "Circumference = πd" },

  // Surface Areas and Volumes
  { chapter: "Surface Areas and Volumes", q: "Find the volume of a cone of radius 7cm and height 24cm. (use π=22/7)", a: "1232 cm³", hint: "V = (1/3)πr²h" },
  { chapter: "Surface Areas and Volumes", q: "Find the total surface area of a cube of side 5cm.", a: "150 cm²", hint: "TSA = 6a²" },
  { chapter: "Surface Areas and Volumes", q: "A sphere has radius 3cm. Find its volume. (use π=22/7)", a: "≈ 113.14 cm³", hint: "V = (4/3)πr³" },

  // Statistics
  { chapter: "Statistics", q: "Find the mean of data: 4, 8, 15, 16, 23, 42.", a: "18", hint: "Mean = sum/count" },
  { chapter: "Statistics", q: "What is the mode of: 2,3,3,5,7,3,8?", a: "3", hint: "Most frequently occurring value" },
  { chapter: "Statistics", q: "Find the median of: 12, 15, 18, 20, 22.", a: "18", hint: "Middle value when sorted" },

  // Probability
  { chapter: "Probability", q: "A die is thrown once. Find P(getting a prime number).", a: "1/2 (primes: 2,3,5)", hint: "Favourable/Total outcomes" },
  { chapter: "Probability", q: "A card is drawn from a well-shuffled deck of 52 cards. Find P(getting a king).", a: "1/13", hint: "4 kings out of 52 cards" },
  { chapter: "Probability", q: "Two coins are tossed together. Find P(getting at least one head).", a: "3/4", hint: "Sample space: HH, HT, TH, TT" },
];

// ---------- FLASHCARDS (formulae) ----------
const FLASHCARDS = [
  { chapter: "Real Numbers", front: "Euclid's Division Lemma", back: "a = bq + r, 0 ≤ r < b" },
  { chapter: "Real Numbers", front: "HCF × LCM relation", back: "HCF(a,b) × LCM(a,b) = a × b" },
  { chapter: "Polynomials", front: "Sum & product of zeroes (quadratic ax²+bx+c)", back: "Sum = -b/a, Product = c/a" },
  { chapter: "Polynomials", front: "Cubic polynomial zero relations (ax³+bx²+cx+d)", back: "α+β+γ=-b/a, αβ+βγ+γα=c/a, αβγ=-d/a" },
  { chapter: "Quadratic Equations", front: "Quadratic formula", back: "x = [-b ± √(b²-4ac)] / 2a" },
  { chapter: "Quadratic Equations", front: "Discriminant", back: "D = b² - 4ac  (D>0: real distinct, D=0: real equal, D<0: no real roots)" },
  { chapter: "Arithmetic Progressions", front: "nth term of AP", back: "an = a + (n-1)d" },
  { chapter: "Arithmetic Progressions", front: "Sum of n terms of AP", back: "Sn = n/2 [2a + (n-1)d]  = n/2 [a + l]" },
  { chapter: "Triangles", front: "Basic Proportionality Theorem", back: "If DE || BC, then AD/DB = AE/EC" },
  { chapter: "Triangles", front: "Pythagoras theorem", back: "(Hypotenuse)² = (Base)² + (Height)²" },
  { chapter: "Triangles", front: "Areas of similar triangles", back: "Ratio of areas = (ratio of corresponding sides)²" },
  { chapter: "Coordinate Geometry", front: "Distance formula", back: "d = √[(x2-x1)² + (y2-y1)²]" },
  { chapter: "Coordinate Geometry", front: "Section formula", back: "P = [(m1x2+m2x1)/(m1+m2), (m1y2+m2y1)/(m1+m2)]" },
  { chapter: "Coordinate Geometry", front: "Midpoint formula", back: "M = [(x1+x2)/2, (y1+y2)/2]" },
  { chapter: "Coordinate Geometry", front: "Area of triangle (coordinates)", back: "Area = ½|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|" },
  // --- Trigonometry: full forms of the 6 ratios ---
  { chapter: "Trigonometry", front: "sin — full form", back: "Sine" },
  { chapter: "Trigonometry", front: "cos — full form", back: "Cosine" },
  { chapter: "Trigonometry", front: "tan — full form", back: "Tangent" },
  { chapter: "Trigonometry", front: "cot — full form", back: "Cotangent" },
  { chapter: "Trigonometry", front: "sec — full form", back: "Secant" },
  { chapter: "Trigonometry", front: "cosec (or csc) — full form", back: "Cosecant" },

  // --- Trigonometry: basic definitions (one ratio per card) ---
  { chapter: "Trigonometry", front: "sin θ = ?", back: "sin θ = Opposite / Hypotenuse" },
  { chapter: "Trigonometry", front: "cos θ = ?", back: "cos θ = Adjacent / Hypotenuse" },
  { chapter: "Trigonometry", front: "tan θ = ?", back: "tan θ = Opposite / Adjacent" },
  { chapter: "Trigonometry", front: "cot θ = ?", back: "cot θ = Adjacent / Opposite" },
  { chapter: "Trigonometry", front: "sec θ = ?", back: "sec θ = Hypotenuse / Adjacent" },
  { chapter: "Trigonometry", front: "cosec θ = ?", back: "cosec θ = Hypotenuse / Opposite" },

  // --- Trigonometry: reciprocal relationships (one per card) ---
  { chapter: "Trigonometry", front: "sin θ and cosec θ — reciprocal relation", back: "sin θ = 1 / cosec θ" },
  { chapter: "Trigonometry", front: "cosec θ and sin θ — reciprocal relation", back: "cosec θ = 1 / sin θ" },
  { chapter: "Trigonometry", front: "cos θ and sec θ — reciprocal relation", back: "cos θ = 1 / sec θ" },
  { chapter: "Trigonometry", front: "sec θ and cos θ — reciprocal relation", back: "sec θ = 1 / cos θ" },
  { chapter: "Trigonometry", front: "tan θ and cot θ — reciprocal relation", back: "tan θ = 1 / cot θ" },
  { chapter: "Trigonometry", front: "cot θ and tan θ — reciprocal relation", back: "cot θ = 1 / tan θ" },
  { chapter: "Trigonometry", front: "tan θ in terms of sin θ, cos θ", back: "tan θ = sin θ / cos θ" },
  { chapter: "Trigonometry", front: "cot θ in terms of sin θ, cos θ", back: "cot θ = cos θ / sin θ" },

  // --- Trigonometry: Pythagorean identities ---
  { chapter: "Trigonometry", front: "Pythagorean identity 1", back: "sin²θ + cos²θ = 1" },
  { chapter: "Trigonometry", front: "Pythagorean identity 2", back: "1 + tan²θ = sec²θ" },
  { chapter: "Trigonometry", front: "Pythagorean identity 3", back: "1 + cot²θ = cosec²θ" },

  // --- Trigonometry: standard angle values, 0° to 90° — one card per ratio ---
  { chapter: "Trigonometry", front: "sin θ for 0°, 30°, 45°, 60°, 90°", back: "0,  1/2,  1/√2,  √3/2,  1" },
  { chapter: "Trigonometry", front: "cos θ for 0°, 30°, 45°, 60°, 90°", back: "1,  √3/2,  1/√2,  1/2,  0" },
  { chapter: "Trigonometry", front: "tan θ for 0°, 30°, 45°, 60°, 90°", back: "0,  1/√3,  1,  √3,  not defined" },
  { chapter: "Trigonometry", front: "cot θ for 0°, 30°, 45°, 60°, 90°", back: "not defined,  √3,  1,  1/√3,  0" },
  { chapter: "Trigonometry", front: "sec θ for 0°, 30°, 45°, 60°, 90°", back: "1,  2/√3,  √2,  2,  not defined" },
  { chapter: "Trigonometry", front: "cosec θ for 0°, 30°, 45°, 60°, 90°", back: "not defined,  2,  √2,  2/√3,  1" },
  { chapter: "Circles", front: "Tangent length from external point", back: "L = √(d² - r²), d = distance from centre" },
  { chapter: "Circles", front: "Tangent property", back: "Tangent ⟂ radius at point of contact" },
  { chapter: "Areas Related to Circles", front: "Area of circle", back: "A = πr²" },
  { chapter: "Areas Related to Circles", front: "Circumference of circle", back: "C = 2πr = πd" },
  { chapter: "Areas Related to Circles", front: "Area of sector", back: "A = (θ/360°) × πr²" },
  { chapter: "Areas Related to Circles", front: "Length of arc", back: "l = (θ/360°) × 2πr" },
  { chapter: "Surface Areas and Volumes", front: "Volume of cylinder", back: "V = πr²h" },
  { chapter: "Surface Areas and Volumes", front: "Volume of cone", back: "V = (1/3)πr²h" },
  { chapter: "Surface Areas and Volumes", front: "Volume of sphere", back: "V = (4/3)πr³" },
  { chapter: "Surface Areas and Volumes", front: "Curved surface area of cone", back: "CSA = πrl, where l=√(r²+h²)" },
  { chapter: "Surface Areas and Volumes", front: "Total surface area of cylinder", back: "TSA = 2πr(r+h)" },
  { chapter: "Statistics", front: "Mean (direct method)", back: "Mean = Σfx / Σf" },
  { chapter: "Statistics", front: "Mode formula (grouped data)", back: "Mode = l + [(f1-f0)/(2f1-f0-f2)] × h" },
  { chapter: "Statistics", front: "Median formula (grouped data)", back: "Median = l + [(n/2 - cf)/f] × h" },
  { chapter: "Probability", front: "Probability of an event", back: "P(E) = (favourable outcomes) / (total outcomes)" },
  { chapter: "Probability", front: "Probability range & complement", back: "0 ≤ P(E) ≤ 1;  P(E) + P(not E) = 1" },
];

// ---------- MCQ QUIZ ----------
// Each: { chapter, q, options: [4], answerIndex }
const MCQS = [
  { chapter: "Real Numbers", q: "HCF(a,b) × LCM(a,b) = ?", options: ["a + b", "a - b", "a × b", "a / b"], answerIndex: 2 },
  { chapter: "Real Numbers", q: "Which of these has a terminating decimal expansion?", options: ["1/7", "1/6", "1/8", "1/12"], answerIndex: 2 },
  { chapter: "Polynomials", q: "For ax²+bx+c, sum of zeroes equals:", options: ["c/a", "-b/a", "b/a", "-c/a"], answerIndex: 1 },
  { chapter: "Polynomials", q: "For ax²+bx+c, product of zeroes equals:", options: ["c/a", "-b/a", "b/a", "-c/a"], answerIndex: 0 },
  { chapter: "Quadratic Equations", q: "If discriminant D = 0, the roots are:", options: ["Real and unequal", "Real and equal", "Not real", "Cannot say"], answerIndex: 1 },
  { chapter: "Quadratic Equations", q: "Discriminant of ax²+bx+c = 0 is:", options: ["b²-4ac", "b²+4ac", "4ac-b²", "a²-4bc"], answerIndex: 0 },
  { chapter: "Arithmetic Progressions", q: "nth term of an AP with first term a, common difference d is:", options: ["a + nd", "a + (n-1)d", "a - (n-1)d", "an + d"], answerIndex: 1 },
  { chapter: "Arithmetic Progressions", q: "Sum of first n terms of an AP is:", options: ["n[2a+(n-1)d]", "n/2[2a+(n-1)d]", "n/2[a+(n-1)d]", "n[a+d]"], answerIndex: 1 },
  { chapter: "Triangles", q: "In right triangle, (Hyp)² equals:", options: ["Base + Height", "Base² - Height²", "Base² + Height²", "2×Base×Height"], answerIndex: 2 },
  { chapter: "Triangles", q: "Ratio of areas of similar triangles equals ratio of sides raised to power:", options: ["1", "2", "3", "1/2"], answerIndex: 1 },
  { chapter: "Coordinate Geometry", q: "Distance between (x1,y1) and (x2,y2) is:", options: ["(x2-x1)+(y2-y1)", "√[(x2-x1)²+(y2-y1)²]", "(x2-x1)²+(y2-y1)²", "√(x2-x1)+√(y2-y1)"], answerIndex: 1 },
  { chapter: "Coordinate Geometry", q: "Midpoint of (x1,y1) and (x2,y2) is:", options: ["(x1+x2, y1+y2)", "((x1+x2)/2, (y1+y2)/2)", "(x1-x2, y1-y2)", "(x1x2, y1y2)"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "sin²θ + cos²θ = ?", options: ["0", "1", "2", "θ"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "1 + tan²θ = ?", options: ["sec²θ", "csc²θ", "cot²θ", "sin²θ"], answerIndex: 0 },
  { chapter: "Trigonometry", q: "1 + cot²θ = ?", options: ["sec²θ", "cosec²θ", "tan²θ", "cos²θ"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "Value of sin 30° is:", options: ["1", "1/2", "√3/2", "0"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "Value of tan 45° is:", options: ["0", "1", "√3", "1/√3"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "Value of cos 0° is:", options: ["0", "1/2", "1", "√3/2"], answerIndex: 2 },
  { chapter: "Trigonometry", q: "Value of sin 90° is:", options: ["0", "1/2", "√3/2", "1"], answerIndex: 3 },
  { chapter: "Trigonometry", q: "Value of tan 0° is:", options: ["0", "1", "Not defined", "√3"], answerIndex: 0 },
  { chapter: "Trigonometry", q: "Value of tan 90° is:", options: ["0", "1", "Not defined", "√3"], answerIndex: 2 },
  { chapter: "Trigonometry", q: "Value of cot 0° is:", options: ["0", "1", "Not defined", "√3"], answerIndex: 2 },
  { chapter: "Trigonometry", q: "Value of cos 60° is:", options: ["1/2", "√3/2", "1/√2", "1"], answerIndex: 0 },
  { chapter: "Trigonometry", q: "Value of sin 45° is:", options: ["1/2", "1/√2", "√3/2", "1"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "Value of cot 45° is:", options: ["0", "1", "√3", "1/√3"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "Value of sec 60° is:", options: ["1", "√2", "2", "2/√3"], answerIndex: 2 },
  { chapter: "Trigonometry", q: "Value of cosec 30° is:", options: ["1", "√2", "2", "2/√3"], answerIndex: 2 },
  { chapter: "Trigonometry", q: "The full form of 'tan' is:", options: ["Tangram", "Tangent", "Tandem", "Tangible"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "The full form of 'cosec' is:", options: ["Cosine", "Cotangent", "Cosecant", "Cosurvive"], answerIndex: 2 },
  { chapter: "Trigonometry", q: "The full form of 'sec' is:", options: ["Secant", "Section", "Secondary", "Sequence"], answerIndex: 0 },
  { chapter: "Trigonometry", q: "The full form of 'cot' is:", options: ["Cosine", "Cotangent", "Constant", "Coefficient"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "cosec θ is the reciprocal of:", options: ["cos θ", "sin θ", "tan θ", "cot θ"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "sec θ is the reciprocal of:", options: ["cos θ", "sin θ", "tan θ", "cot θ"], answerIndex: 0 },
  { chapter: "Trigonometry", q: "cot θ is the reciprocal of:", options: ["cos θ", "sin θ", "tan θ", "sec θ"], answerIndex: 2 },
  { chapter: "Trigonometry", q: "tan θ equals:", options: ["cos θ / sin θ", "sin θ / cos θ", "1 / sin θ", "1 / cos θ"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "cot θ equals:", options: ["cos θ / sin θ", "sin θ / cos θ", "1 / sin θ", "1 / cos θ"], answerIndex: 0 },
  { chapter: "Trigonometry", q: "As θ increases from 0° to 90°, sin θ:", options: ["Decreases", "Increases", "Stays the same", "First increases then decreases"], answerIndex: 1 },
  { chapter: "Trigonometry", q: "As θ increases from 0° to 90°, cos θ:", options: ["Decreases", "Increases", "Stays the same", "First increases then decreases"], answerIndex: 0 },
  { chapter: "Circles", q: "Tangent to a circle is ______ to the radius at the point of contact.", options: ["Parallel", "Perpendicular", "Equal", "Coincident"], answerIndex: 1 },
  { chapter: "Circles", q: "Lengths of two tangents from an external point are:", options: ["Equal", "Unequal", "Zero", "Double each other"], answerIndex: 0 },
  { chapter: "Areas Related to Circles", q: "Area of a circle of radius r is:", options: ["2πr", "πr", "πr²", "2πr²"], answerIndex: 2 },
  { chapter: "Areas Related to Circles", q: "Area of a sector with angle θ is:", options: ["(θ/360)πr", "(θ/360)πr²", "(θ/180)πr²", "θπr²"], answerIndex: 1 },
  { chapter: "Surface Areas and Volumes", q: "Volume of a cone is:", options: ["πr²h", "(1/3)πr²h", "(4/3)πr³", "2πrh"], answerIndex: 1 },
  { chapter: "Surface Areas and Volumes", q: "Volume of a sphere is:", options: ["(4/3)πr³", "(1/3)πr²h", "πr²h", "4πr²"], answerIndex: 0 },
  { chapter: "Statistics", q: "Mean = ?", options: ["Σfx / Σf", "Σf / Σfx", "Σx / n²", "n / Σx"], answerIndex: 0 },
  { chapter: "Statistics", q: "The most frequently occurring value in data is called:", options: ["Mean", "Median", "Mode", "Range"], answerIndex: 2 },
  { chapter: "Probability", q: "P(E) always lies between:", options: ["-1 and 1", "0 and 1", "0 and 100", "1 and 10"], answerIndex: 1 },
  { chapter: "Probability", q: "P(E) + P(not E) = ?", options: ["0", "1", "2", "0.5"], answerIndex: 1 },
];
