const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
    },
    {
        question: "What is the largest mammal on Earth?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale",
    },
];

const questionDiplay = document.getElementById("question");
const answers = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("commit-btn");
const replayBtn = document.getElementById("replay-btn");

let quizIndex = 0;
let currentScore = 0;
let score = 0;

nextBtn.addEventListener("click", () => nextQuestion());
replayBtn.addEventListener("click", function () {
    location.reload();
});

initialyzeGame();

function initialyzeGame() {
    quizIndex = 0;
    displayQuestion();
}

function displayQuestion() {
    questionDiplay.textContent = quizData[quizIndex].question;
    let i = 0;
    answers.forEach((answer) => {
        let answerID = "a" + i;
        answer.textContent = quizData[quizIndex].answers[i];
        answer.addEventListener("click", () => checkAnswer(answer.textContent, answerID));
        i++;
    });
}

function checkAnswer(selectedAnswer, answerID) {
    score = 0;
    const correctAnswer = quizData[quizIndex].correctAnswer;
    updateSelected();
    document.getElementById(answerID).classList.add("selected");
    if (selectedAnswer === correctAnswer) {
        score++;
    }
}

function nextQuestion() {
    const selected = document.getElementsByClassName("selected");
    if (typeof selected[0] === "undefined") {
        alert("You must select an anwser!!");
    } else {
        updateSelected();
        quizIndex++;
        currentScore += score;
        if (quizIndex < quizData.length) {
            displayQuestion();
        } else {
            diplayFinalScore();
        }
    }
}

function updateSelected() {
    const selected = document.getElementsByClassName("selected");
    if (typeof selected[0] !== "undefined") {
        selected[0].classList.remove("selected");
    }
}

function diplayFinalScore() {
    const toHide = document.getElementsByClassName("quiz");
    for (let i = 0; i < toHide.length; i++) {
        toHide[i].classList.add("hidden");
    }

    const quizResults = document.createElement("p");
    quizResults.textContent = `Your final score : ${currentScore}/${quizData.length}`;

    const scoreDisplay = document.getElementById("score-display");
    scoreDisplay.insertBefore(quizResults, scoreDisplay.firstChild);
    scoreDisplay.classList.remove("hidden");
}
