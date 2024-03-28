let questions = [
  {
    question: "Wer hat HTML erfunden",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Wie erstellen Sie in JavaScript eine Variable mit lokalem Gültigkeitsbereich innerhalb einer Funktion?",
    answer_1: "var",
    answer_2: "let",
    answer_3: "const",
    answer_4: "local",
    right_answer: 2
  },
  {
    question: "Was ist der Operator für eine Gleichheitsprüfung in JavaScript?",
    answer_1: "==",
    answer_2: "===",
    answer_3: "!=",
    answer_4: "!==",
    right_answer: 2,
  },
  {
    question: "Welche der folgenden Farben ist keine gültige CSS-Farbe?",
    answer_1: "Rot",
    answer_2: "Lila",
    answer_3: "Kobaltblau",
    answer_4: "Schmerzhaft Grün",
    right_answer: 4,
  },
  {
    question: "Welche Methode wird verwendet, um den Inhalt eines HTML-Elements in JavaScript zu ändern?",
    answer_1: "setTextContent()",
    answer_2: "innerHTML()",
    answer_3: "changeContent()",
    answer_4: "replaceText()",
    right_answer: 2
  },
  {
    question:
      "Welche Methode wird verwendet, um einen String in JavaScript in eine Ganzzahl umzuwandeln?",
    answer_1: "parseInt()",
    answer_2: "parseFloat()",
    answer_3: "toInteger()",
    answer_4: "toNumber()",
    right_answer: 1,
  },
];

let rightQuestion = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');

function init() {
  document.getElementById("all-questions").innerHTML = questions.length;

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
} 

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (rightAnswerSelected(selectedQuestionNumber, question)) {
    successfulChoice(selection);
  } else {
    wrongChoice(idOfRightAnswer, selection);
  }
  document.getElementById("next-button").disabled = false;
}

function successfulChoice(selection) {
  document.getElementById(selection).parentNode.classList.add("bg-success");
    AUDIO_SUCCESS.play();
    rightQuestion++;
}

function wrongChoice(idOfRightAnswer, selection) {
  document.getElementById(selection).parentNode.classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
    AUDIO_WRONG.play();
}

function rightAnswerSelected(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question["right_answer"];
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById('header-img').src = "img/pencil.jpg"
  document.getElementById("end-screen").style.display = "none";
    document.getElementById("question-body").style.display = "block";
  rightQuestion = 0;
  currentQuestion = 0;
  init();
}

function showEndScreen() {
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("question-body").style.display = "none";

  document.getElementById('amount-of-questions').innerHTML = questions.length;
  document.getElementById('amount-right-questions').innerHTML = rightQuestion;
  document.getElementById('header-img').src = "img/trophy.png"
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);

  document.getElementById('progress-bar').innerHTML = `${percent} %`;
  document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function updateNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById("next-question").innerHTML = currentQuestion + 1;
  document.getElementById("questiontext").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}