let questionsArray = [];
let questionElement = document.getElementById("question");
let questionIndex = 0;

let startButton = document.getElementById("start-game");
let questionField = document.getElementById("question");
let questionNumText = document.getElementById("questionNumText");
let answerBoxes = document.getElementById("answer-boxes");
let questionBox = document.getElementById("questionBox");
let nextQuestionBtn = document.getElementById("next-question");

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
  });

function showQuestion() {
  if (questionIndex >= questionsArray.length) {
    questionBox.innerHTML = "Успешно го завршивте квизот!";
    return;
  }

  if (startButton.style.visibility != "hidden") {
    startButton.style.visibility = "hidden";
  }

  questionData = questionsArray[questionIndex];

  questionField.innerHTML = questionData.question;

  questionData.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.innerHTML = option;
    div.onclick = () => checkAnswer(index);
    answerBoxes.appendChild(div);
  });

  nextQuestionBtn.style.visibility = "hidden";
}

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// let questionNum = 1;
// function countIncrement() {
//     let questionHTML = document.getElementById("questionNum");
//     let questionTextHTML = document.getElementById("questionNumText");
//     if(questionNum===20 || questionNum>20){
//         questionTextHTML.innerHTML=`Го завршивте тестот! Погодивте: /20 прашања!`;
//         return;
//     }else{
//         questionNum += 1;
//         questionHTML.innerHTML = questionNum;
//     }
// }
