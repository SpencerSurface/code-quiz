// Header (all screens, hidden on high score screen): high score link, timer

// Start screen: start button

// Question screen: answer buttons, question result

// Game over screen: high score submission

// High score screen: high score clear button, back button

/* Concept: Create section elements corresponding to each screen. Switch between screens by removing and adding their 
respective sections as children of mainEl. (Minus for high score screen, which is a separate page). */

const headerEl = document.querySelector("header");
const mainEl = document.querySelector("main");
const startButton = document.querySelector("#start-button");
const timeSpan = document.querySelector("#time-count");
let startSection = document.querySelector("#start-section");
let questionSection = buildQuestionSection();
let gameOverSection = buildGameOverSection();

// Track whether the quiz is in progress
let quizRunning = false;

// Track how much time remains
let timeLeft;

// Track which question is current
let questionNum;

// Switch to the questions screen and start the quiz upon start button click
startButton.addEventListener("click", function() {
    // Remove the start screen
    mainEl.replaceChildren();
    // Add the questions screen
    mainEl.append(questionSection);
    // Start quiz
    startQuiz();
})

// Handle answer upon answer button click
questionSection.addEventListener("click", function(event) {
    if(event.target.classList.contains("answer-button")) {
        // TODO: check answer (check, announce result, if wrong: decrement timer)
        // If there's more questions, render the next question, else end the quiz
        questionNum++;
        if (questionNum < questions.length) {
            renderQuestion();
        } else {
            endQuiz();
        }
    }
})



// Start the quiz
function startQuiz() {
    quizRunning = true;
    startTimer();
    // Render the first question
    questionNum = 0;
    renderQuestion();
}

// Start the timer
function startTimer() {
    timeLeft = 75;
    renderTime();
    let timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            renderTime();
        } else {
            endQuiz();
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Render the time to the page
function renderTime() {
    timeSpan.textContent = timeLeft;
}

// Render the current question to the page
function renderQuestion() {
    questionSection.firstChild.textContent = questions[questionNum].qText;
    let answerButtons = document.querySelectorAll(".answer-button");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = (i + 1) + ". " + questions[questionNum].aTextArr[i];
    }
}

// End the quiz
function endQuiz() {

}

// Build and return the question section. Contains a heading and four answer buttons.
function buildQuestionSection() {
    let questionSection = document.createElement("section");
    questionSection.setAttribute("id", "question-section");

    let headingEl = document.createElement("h1");
    headingEl.textContent = "What are frogs?";
    questionSection.appendChild(headingEl);

    let buttonEls = [];
    for (let i = 0; i < 4; i++) {
        buttonEls.push(document.createElement("button"));
        buttonEls[i].textContent = i + 1 + "."
        buttonEls[i].classList.add("answer-button")
        console.log(buttonEls[i].classList);
        questionSection.appendChild(buttonEls[i]);
    }

    return questionSection
}

// Build and return the game over section. Contains a heading, text about the score, and an area to submit the score.
function buildGameOverSection() {
    let gameOverSection = document.createElement("section");
    gameOverSection.setAttribute("id", "game-over-section");

    let headingEl = document.createElement("h1");
    headingEl.textContent = "Game Over"
    gameOverSection.appendChild(headingEl);

    let scoreEl = document.createElement("p");
    scoreEl.textContent = "Your score is 10";
    gameOverSection.appendChild(scoreEl);

    let highScoreInput = document.createElement("form");
    let highScoreLabel = document.createElement("label");
    highScoreLabel.textContent = "Enter your initials: "
    highScoreInput.appendChild(highScoreLabel);
    let highScoreText = document.createElement("input");
    highScoreText.setAttribute("type", "text");
    highScoreInput.appendChild(highScoreText);
    let highScoreSubmit = document.createElement("input");
    highScoreSubmit.setAttribute("type", "submit");
    highScoreInput.appendChild(highScoreSubmit);
    gameOverSection.appendChild(highScoreInput);

    return gameOverSection
}