let questionsArray = [];
let questionElement = document.getElementById("question");
let questionIndex = 0;
let score = 0;

let startButton = document.getElementById("start-game");
let questionField = document.getElementById("question");
let questionNumText = document.getElementById("questionNumText");
let answerBoxes = document.getElementById("answer-boxes");
let questionBox = document.getElementById("questionBox");
let nextQuestionBtn = document.getElementById("next-question");
let questionNum = document.getElementById("questionNum");

questionNumText.style.visibility = "hidden";
nextQuestionBtn.style.visibility = "hidden";

fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questionsArray = data;

    shuffleQuestions(questionsArray);

    console.log(questionsArray);

    startButton.addEventListener("click", () => {
      questionNumText.style.visibility = "visible";
      showQuestion();
    });

    nextQuestionBtn.addEventListener("click", () => {
      questionIndex++;
      questionNum.innerHTML = questionIndex + 1;
      showQuestion();
    });
  });

function showQuestion() {
  if (questionIndex >= questionsArray.length) {
    questionNumText.innerHTML = "Успешно го завршивте квизот!";
    questionField.innerHTML = "";
    answerBoxes.innerHTML = `<h1>Имате ${score}/20 точни прашања.</h1>`;
    nextQuestionBtn.style.visibility = "hidden";
    return;
  }

  if (startButton.style.display != "none") {
    startButton.style.display = "none";
  }

  questionData = questionsArray[questionIndex];

  questionField.innerHTML = questionData.question;

  answerBoxes.innerHTML = "";

  let hasClicked = false;

  questionData.options.forEach((option, index) => {
    const div = document.createElement("div");

    div.style.border = "2px solid black";
    div.style.fontSize = "1.5em";
    div.style.color = "white";
    div.style.backgroundColor = "#457B9D";
    div.style.animationDelay = `${index * 0.3}s`;

    div.classList.add("answer-box");

    function onMouseEnter() {
      if (!hasClicked) {
        div.style.cursor = "pointer";
        div.style.backgroundColor = "#1D3557";
      }
    }

    function onMouseLeave() {
      if (!hasClicked) {
        div.style.backgroundColor = "#457B9D";
      }
    }

    div.addEventListener("mouseenter", onMouseEnter);
    div.addEventListener("mouseleave", onMouseLeave);

    div.innerHTML = option;

    div.onclick = () => {
      hasClicked = true;
      checkAnswer(index);
    };

    answerBoxes.appendChild(div);
  });

  nextQuestionBtn.style.visibility = "hidden";
  nextQuestionBtn.classList.remove("slide-in");
}

function checkAnswer(index) {
  const correctIndex = questionsArray[questionIndex].answer - 1;
  const divs = answerBoxes.querySelectorAll("div");

  for (let i = 0; i < 4; i++) {
    divs[i].classList.remove("answer-box");
    divs[i].style.animationDelay = '0s';
    if (i === correctIndex) {
      divs[i].style.backgroundColor = "#38b000";
      divs[i].classList.add("correct");
    } else {
      divs[i].style.backgroundColor = "#E63946";
    }
  }

  if (index === correctIndex) {
    score++;
  } else {
    divs[index].classList.add("buzz");
  }

  nextQuestionBtn.style.visibility = "visible";
  nextQuestionBtn.classList.add("slide-in");
}

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
