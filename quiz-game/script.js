//DOM elements
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressBar = document.getElementById('progress');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const restartButton = document.getElementById('restart-btn');

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'Marseille', correct: false },
      { text: 'Toulouse', correct: false },
      { text: 'Strasbourg', correct: false },
    ],
  },
  {
    question: 'What is the capital of Australia?',
    answers: [
      { text: 'Perth', correct: false },
      { text: 'Melbourne', correct: false },
      { text: 'Sydney', correct: false },
      { text: 'Canberra', correct: true },
    ],
  },
  {
    question: 'What is the capital of England?',
    answers: [
      { text: 'Birmingham', correct: false },
      { text: 'Manchester', correct: false },
      { text: 'London', correct: true },
      { text: 'Liverpool', correct: false },
    ],
  },
  {
    question: 'What is the capital of New Zealand?',
    answers: [
      { text: 'Wellington', correct: true },
      { text: 'Auckland', correct: false },
      { text: 'Christchurch', correct: false },
      { text: 'Hamilton', correct: false },
    ],
  },
  {
    question: 'What is the capital of India?',
    answers: [
      { text: 'Mumbai', correct: false },
      { text: 'New Delhi', correct: true },
      { text: 'Bangalore', correct: false },
      { text: 'Chennai', correct: false },
    ],
  },
  {
    question: 'What is the capital of Canada?',
    answers: [
      { text: 'Toronto', correct: false },
      { text: 'Vancouver', correct: false },
      { text: 'Ottawa', correct: true },
      { text: 'Montreal', correct: false },
    ],
  },
  {
    question: 'What is the capital of Japan?',
    answers: [
      { text: 'Kyoto', correct: false },
      { text: 'Osaka', correct: false },
      { text: 'Tokyo', correct: true },
      { text: 'Nagoya', correct: false },
    ],
  },
  {
    question: 'What is the capital of Germany?',
    answers: [
      { text: 'Munich', correct: false },
      { text: 'Frankfurt', correct: false },
      { text: 'Berlin', correct: true },
      { text: 'Hamburg', correct: false },
    ],
  },
  {
    question: 'What is the capital of Italy?',
    answers: [
      { text: 'Milan', correct: false },
      { text: 'Venice', correct: false },
      { text: 'Rome', correct: true },
      { text: 'Florence', correct: false },
    ],
  },
  {
    question: 'What is the capital of Brazil?',
    answers: [
      { text: 'Rio de Janeiro', correct: false },
      { text: 'São Paulo', correct: false },
      { text: 'Brasília', correct: true },
      { text: 'Salvador', correct: false },
    ],
  },
];

// QUIZ state vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

//event-listener
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove('active');
  quizScreen.classList.add('active');

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + '%';

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = '';

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else if (button === selectedButton) {
      button.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  const percent = (score / quizQuestions.length) * 100;
  if (percent === 100) {
    resultMessage.textContent = 'Excellent! Perfect score.';
  } else if (percent >= 80) {
    resultMessage.textContent = 'Very good performance.';
  } else if (percent >= 60) {
    resultMessage.textContent = 'Fair attempt. Improvement needed.';
  } else if (percent >= 40) {
    resultMessage.textContent = 'Needs more practice.';
  } else {
    resultMessage.textContent = 'Keep trying.';
  }
}

function restartQuiz() {
  resultScreen.classList.remove('active');

  startQuiz();
}
