const questions = [
    { question: "🌅 What color is the sky on a clear morning?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Blue" },
    { question: "🪥 What do you use to brush your teeth?", options: ["Soap", "Shampoo", "Toothbrush", "Spoon"], answer: "Toothbrush" },
    { question: "📱 Which device is used to make a phone call?", options: ["Laptop", "Tablet", "Phone", "Television"], answer: "Phone" }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timer;
const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const scoreElement = document.getElementById("score");
const correctAnswersElement = document.getElementById("correctAnswers");

function startTimer() {
    let timeLeft = 30;
    timerElement.textContent = `⏳ Time left: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `⏳ Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            wrongAnswers++;
            moveToNextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionElement.classList.add("slide-in");
    setTimeout(() => questionElement.classList.remove("slide-in"), 500);
    optionsElement.innerHTML = "";
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(button, option, currentQuestion.answer);
        optionsElement.appendChild(button);
    });

    startTimer();
}

function checkAnswer(button, selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        button.classList.add("correct");
        correctAnswers++;
    } else {
        button.classList.add("wrong");
        wrongAnswers++;
    }
    setTimeout(() => moveToNextQuestion(), 1000);
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = `🎯 Correct: ${correctAnswers} | ❌ Wrong: ${wrongAnswers}`;

    correctAnswersElement.innerHTML = "";
    questions.forEach(q => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-answer");

        const questionText = document.createElement("div");
        questionText.textContent = `❓ ${q.question}`;
        questionText.classList.add("question");

        const answerText = document.createElement("div");
        answerText.textContent = `✅ ${q.answer}`;
        answerText.classList.add("answer");

        questionBlock.appendChild(questionText);
        questionBlock.appendChild(answerText);
        correctAnswersElement.appendChild(questionBlock);
    });
}

loadQuestion();
