let questionsArray = [];
let questionIndex = 0;
let score = 0;
let currentQuizType = "";

let questionField = document.getElementById("question");
let questionNumText = document.getElementById("questionNumText");
let answerBoxes = document.getElementById("answer-boxes");
let nextQuestionBtn = document.getElementById("next-question");
let questionNum = document.getElementById("questionNum");
let quizOptions = document.getElementById("quiz-options");

let examBtn = document.getElementById("examBtn");
let firstTermBtn = document.getElementById("firstTermBtn");
let secondTermBtn = document.getElementById("secondTermBtn");

questionNumText.style.visibility = "hidden";
nextQuestionBtn.style.visibility = "hidden";

// new version: only one json file, with added "type", to minimize number of files and get better load times :D
examBtn.addEventListener("click", () => startQuiz("questions.json", "exam"));
firstTermBtn.addEventListener("click", () => startQuiz("questions.json", "firstTerm"));
secondTermBtn.addEventListener("click", () => startQuiz("questions.json", "secondTerm"));
nextQuestionBtn.addEventListener("click", () => {
    questionIndex+=1;
    questionNum.innerHTML = questionIndex+1;
    showQuestion();
});

function startQuiz(json, type) {
    currentQuizType = type;

    fetch(json)
        .then((response) => response.json())
        .then((data) => {
            questionsArray = data.filter(question => question.type === type);
            shuffleQuestions(questionsArray);
            questionIndex = 0;
            score = 0;
            document.getElementById("introText").style.display="none";
            questionNum.style.visibility = "visible";
            questionNumText.style.visibility = "visible";
            questionNumText.innerHTML = `<p>Прашање број <span id="questionNum">1</span></p>`;
            questionNum = document.getElementById("questionNum");
            quizOptions.style.display = "none";

            showQuestion();
        });
}

function showQuestion() {
    if (questionIndex >= 20) {
        questionField.innerHTML = "";
        answerBoxes.innerHTML = "";
        nextQuestionBtn.style.visibility = "hidden";
        questionNum.style.visibility = "hidden";

        questionNumText.style.visibility = "visible";
        questionNumText.innerHTML = `
            <div class="fade-in">
                <h3>Квизот е завршен!</h3>
                <p>Вашиот резултат: <span id="scoreCounter">0</span> од 20</p>
                <button id="retryBtn" class="btnStyles">Обиди се повторно</button>
            </div>
        `;

        document.getElementById("retryBtn").onclick = resetQuiz;
        animateCounter(score);

        if (score >= 17) {
            const confetti = new JSConfetti();
            confetti.addConfetti({
                emojis: ['🎉', '🎊', '👏', '🍆'],
                confettiNumber: 100,
                confettiRadius: 7,
                emojiSize: 30,
            });
        }

        // answerBoxes.innerHTML = '<button id="retryBtn" class="animate__animated animate__bounceIn btnStyles">Обиди се повторно</button>';
        return;
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

    if (correctAnswers !== 0) {
        const animation = setInterval(() => {
            currentCounter++;

            const progress = easeOutQuad(currentCounter / totalFrames);
            const animatedCount = Math.round(progress * correctAnswers);

            scoreCounter.innerText = animatedCount;

            if (currentCounter >= totalFrames) {
                clearInterval(animation);
                scoreCounter.innerText = correctAnswers;
            }
        }, frameDuration);
    }
}

function resetQuiz() {
    questionIndex = 0;
    score = 0;
    currentQuizType = "";
    questionsArray = [];

    questionField.innerHTML = "";
    answerBoxes.innerHTML = "";
    questionNumText.innerHTML="";

    questionNum.style.visibility = "hidden";
    questionNumText.style.visibility = "hidden";
    quizOptions.style.display = "flex";
}