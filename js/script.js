const questions = [
  {
    prompt: "Ahh...it is the weekend! What is the first thing you do?",
    subtitle: "Picture the start of your ideal weekend.",
    choices: [
      ["A", "Have breakfast with the family"],
      ["B", "Whatever the family is thinking to do, as long as it is with people I love"],
      ["C", "Explore the new cafe you have been wanting to try"],
      ["D", "9 a.m. gym/pilates before a cup of high-protein shake"],
    ],
  },
  {
    prompt: "What type of bag do you bring when meeting your buddies outside?",
    subtitle: "Pick the bag that feels most like you.",
    choices: [
      ["A", "A big white cushy slingbag with ling-ling long-longs/photostrips representing our friendships."],
      ["B", "A cute leather handbag with some of my favourite franchises/quirky charms."],
      ["C", "A small haversack, ready to seize the day!"],
      ["D", "A minimal Uniqlo black sling bag with all necessities needed."],
    ],
  },
  {
    prompt: "When you and your friends are deciding what to eat but are indecisive, you...",
    subtitle: "How do you help the group choose?",
    choices: [
      ["A", "Try to gather consensus and go with the majority"],
      ["B", "Alright with whatever everyone chooses"],
      ["C", "Suggest new spots to try"],
      ["D", "Actually search up the spots to see the feasibility"],
    ],
  },
  {
    prompt: "You and your friends somehow end up singing Karaoke together, what is your song pick?",
    subtitle: "Choose your go-to karaoke moment.",
    choices: [
      ["A", "The classics like Taylor Swift, Justin Bieber and Bruno Mars"],
      ["B", "My Chinese/Korean ballads and emo songs"],
      ["C", "K/J-pop songs (I can't speak those languages)"],
      ["D", "I don't sing, I just laugh and film them singing."],
    ],
  },
  {
    prompt: "Where are you all wandering after that 2 hour karaoke session?",
    subtitle: "The night is still young. Where to next?",
    choices: [
      ["A", "Picnic time!"],
      ["B", "A chill cafe to rest and talk about life"],
      ["C", "A \"hidden\" trinket store you saw on TikTok that you have been wanting to go to"],
      ["D", "Let us just walk around the mall to save money."],
    ],
  },
  {
    prompt: "It is the end of the day. Time to say goodbye... How are you going back?",
    subtitle: "How does everyone head home?",
    choices: [
      ["A", "Transport Buddies! (we live nearby)"],
      ["B", "Take the same train together (even if it may be longer for you)"],
      ["C", "Bye I have still have some solo shopping to do"],
      ["D", "I am taking the bus on my own (as it is faster)"],
    ],
  },
];

const outcomes = {
  A: {
    name: "Curry Sauce",
    description: "Warm, lively, and full of character, you bring people together and make ordinary moments feel like a feast. There is always a little more color and comfort wherever you show up.",
    trait: "Warmth · Flavor · Togetherness",
  },
  B: {
    name: "Ketchup Sauce",
    description: "Familiar, dependable, and welcome at just about any table, you make the good things even better. People know they can count on your easygoing nature and steady support.",
    trait: "Comfort · Reliability · Ease",
  },
  C: {
    name: "Chilli Crab Sauce",
    description: "Bold, tangy, and full of surprises, you are always up for trying something new. You balance sweet heat with curiosity, leaving people eager to see where your next idea takes them.",
    trait: "Curiosity · Boldness · Adventure",
  },
  D: {
    name: "Garlic Chilli Sauce",
    description: "Distinctive and purposeful, you know how to add a sharp spark where it counts. You bring focus, confidence, and a little heat to every plan, helping good ideas stand out.",
    trait: "Focus · Confidence · Kick",
  },
};

const bottlePixels = [
  "...CCC...",
  "...CHC...",
  "...OOO...",
  "..OO.OO..",
  ".OO...OO.",
  ".OHMMMDO.",
  ".OMMMDDO.",
  ".OMMMHDO.",
  ".ODMMHHO.",
  ".OMMMDDO.",
  ".OHMMMDO.",
  "..OOOOO..",
];

const quizContent = document.querySelector("#quiz-content");
const questionCount = document.querySelector("#question-count");
const progress = document.querySelector("#progress");
const timeNote = document.querySelector("#time-note");
const answers = Array(questions.length).fill(null);
let currentIndex = 0;
const daylightStages = ["morning", "late-morning", "midday", "afternoon", "golden-hour", "evening"];

function getResult() {
  const totals = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((answer) => {
    totals[answer] += 1;
  });

  const highestScore = Math.max(...Object.values(totals));
  const tiedOutcomes = Object.keys(totals).filter((letter) => totals[letter] === highestScore);
  const winner = tiedOutcomes.length === 1
    ? tiedOutcomes[0]
    : answers.find((answer) => tiedOutcomes.includes(answer));

  return { letter: winner, score: totals[winner] };
}

function renderQuestion() {
  const question = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  document.body.dataset.timeOfDay = daylightStages[currentIndex];
  questionCount.textContent = `QUESTION ${currentIndex + 1} OF ${questions.length}`;
  progress.value = currentIndex + 1;
  timeNote.textContent = "ABOUT 2 MINUTES";

  quizContent.innerHTML = `
    <h1 class="question-heading" id="question-heading">${question.prompt}</h1>
    <p class="question-subtitle">${question.subtitle}</p>
    <div class="choice-list" role="group" aria-labelledby="question-heading">
      ${question.choices.map(([letter, text]) => `
        <button class="choice" type="button" data-answer="${letter}" aria-pressed="${selectedAnswer === letter}">
          <span class="choice-letter" aria-hidden="true">${letter}</span>
          <span class="choice-text">${text}</span>
          <span class="choice-check" aria-hidden="true">✓</span>
        </button>
      `).join("")}
    </div>
    <div class="quiz-actions">
      <button class="button button-secondary" type="button" data-action="back" ${currentIndex === 0 ? "disabled" : ""}>
        <span aria-hidden="true">←</span> Back
      </button>
      <button class="button button-primary" type="button" data-action="next" ${selectedAnswer ? "" : "disabled"}>
        ${currentIndex === questions.length - 1 ? "See my result" : "Continue"} <span aria-hidden="true">→</span>
      </button>
    </div>
  `;
}

function renderResult() {
  const result = getResult();
  const outcome = outcomes[result.letter];
  document.body.dataset.timeOfDay = "evening";
  questionCount.textContent = "YOUR RESULT";
  progress.value = questions.length;
  timeNote.textContent = "A SNAPSHOT, NOT A BOX";

  quizContent.innerHTML = `
    <div class="result-layout">
      <figure class="sauce-art sauce-art--${result.letter}" role="img" aria-label="Pixel-art bottle of ${outcome.name}">
        <span class="art-stamp">CITY MARKET</span>
        <span class="bottle-grid" aria-hidden="true">${bottlePixels.map((row) => [...row].map((pixel) => `<span class="pixel pixel-${pixel}"></span>`).join("")).join("")}</span>
        <figcaption class="art-caption">${outcome.name}</figcaption>
      </figure>
      <div class="result-copy">
        <p class="result-kicker">YOU LEAN TOWARD</p>
        <h1 class="result-title">${outcome.name}</h1>
        <p class="result-description">${outcome.description}</p>
        <p class="result-trait">${outcome.trait}</p>
      </div>
    </div>
    <div class="result-footer">
      <span class="score-note">${result.score} of ${questions.length} answers pointed this way</span>
      <button class="button button-primary" type="button" data-action="restart">
        <span aria-hidden="true">↻</span> Retake the quiz
      </button>
    </div>
  `;
}

function render() {
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    renderResult();
  }
}

quizContent.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.answer) {
    answers[currentIndex] = button.dataset.answer;
    renderQuestion();
  } else if (button.dataset.action === "back") {
    currentIndex = Math.max(0, currentIndex - 1);
    render();
  } else if (button.dataset.action === "next" && answers[currentIndex]) {
    currentIndex += 1;
    render();
  } else if (button.dataset.action === "restart") {
    answers.fill(null);
    currentIndex = 0;
    render();
  }
});

render();