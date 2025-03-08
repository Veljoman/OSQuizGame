let questionsArray = [];
let questionElement = document.getElementById("question");
let questionIndex = 0;
let score = 0;

let startButton = document.getElementById("start-game");
let questionField = document.getElementById("question");
let questionNumText = document.getElementById("questionNumText");
let answerBoxes = document.getElementById("answer-boxes");
// let questionBox = document.getElementById("questionBox");
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
        return;
    }

    if (startButton.style.display != "none") {
        startButton.style.display = "none";
    }

    questionData = questionsArray[questionIndex];

    questionField.innerHTML = questionData.question;

    answerBoxes.innerHTML = "";

    questionData.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.innerHTML = option;
        div.onclick = () => checkAnswer(index);
        answerBoxes.appendChild(div);
    });

    nextQuestionBtn.style.visibility = "hidden";
}

function checkAnswer(index) {
    const correctIndex = questionsArray[questionIndex].answer - 1;
    const divs = answerBoxes.querySelectorAll("div");

    for (let i = 0; i < 4; i++) {
        if (i === correctIndex) {
            divs[i].style.backgroundColor = "lightgreen";
        } else {
            divs[i].style.backgroundColor = "red";
        }
    }

    if (index === correctIndex) {
        score++;
    }

    nextQuestionBtn.style.visibility = "visible";
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}