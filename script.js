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
    if (questionIndex >= 1) {
        questionField.innerHTML = "";
        nextQuestionBtn.style.visibility = "hidden";
        questionNumText.innerHTML = `
    <h2>Успешно го завршивте квизот!
    <br>Имате <span id="scoreCounter" class="animate__animated animate__pulse   "></span>/20 точни одговори.</h2>`;
        // answerBoxes.innerHTML = `<h1 class="animate__animated animate__heartBeat">Имате ${score}/20 точни прашања.</h1>`;
        animateCounter(score);

        // if (score >= 17) {
            const confetti = new JSConfetti();
            confetti.addConfetti({
                emojis: ['🎉', '🎊', '👏', '🍆'],
                confettiNumber: 100,
                confettiRadius: 7,
                emojiSize: 30,
            });
        // }

        answerBoxes.innerHTML = "";
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

function animateCounter(correctAnswers) {
    const scoreCounter = document.getElementById("scoreCounter");
    let currentCounter = 0;
    let animationDuration = 0;

    if (correctAnswers <= 5) {
        animationDuration = 1000;
    } else if (correctAnswers <= 10) {
        animationDuration = 1500;
    } else if (correctAnswers <= 20) {
        animationDuration = 2750;
    }

    const frameDuration = 16.7;
    const totalFrames = Math.round(animationDuration / frameDuration);
    const easeOutQuad = t => t * (2 - t);

    const animation = setInterval(() => {
        currentCounter++;

        const progress = easeOutQuad(currentCounter / totalFrames);
        const animatedCount = Math.round(progress * correctAnswers);

        scoreCounter.textContent = animatedCount;

        if (currentCounter >= totalFrames) {
            clearInterval(animation);
            scoreCounter.textContent = correctAnswers;
        }
    }, frameDuration);
}
