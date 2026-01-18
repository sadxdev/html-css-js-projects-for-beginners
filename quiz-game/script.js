//DOM elements
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');

//event-listener
startScreen.addEventListener('click', startQuiz);

function startQuiz() {
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
}
