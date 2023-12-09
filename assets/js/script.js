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
});

// Handle answer upon answer button click
questionSection.addEventListener("click", function(event) {
    if(event.target.classList.contains("answer-button")) {
        // Check answer and handle result
        checkAnswer(event.target.textContent.slice(3));
        // If there's more questions, render the next question, else end the quiz
        questionNum++;
        if (questionNum < questions.length) {
            renderQuestion();
        } else {
            endQuiz();
        }
    }
});

// Handle score submission upon submit button click
gameOverSection.addEventListener("submit", function(event) {
    event.preventDefault();
    let inputEl = event.target.querySelector("input[type='text']");
    let userInput = inputEl.value;
    if (!userInput || userInput === "") {
        alert("If you want to submit a score, you must include your initials.");
    } else {
        storeScore(userInput, timeLeft);
        document.location = "highscore.html";
    }
});



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
        // Stop the timer if the quiz is no longer in progress
        if (!quizRunning) {
            renderTime();
            clearInterval(timerInterval);
            return
        }
        // Otherwise, decrement the timer if there's time left, else end the quiz
        if (timeLeft > 0) {
            timeLeft--;
            renderTime();
        } else {
            renderTime();
            endQuiz();
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Render the time to the page
function renderTime() {
    timeSpan.textContent = timeLeft;
}

// Check whether the provided answer is correct, and handle the result
function checkAnswer(answer) {
    if (questions[questionNum].checkAnswer(answer)) {
        displayBlurb("Correct!");
    } else {
        displayBlurb("Wrong!");
        timeLeft -= 10;
        timeLeft = (timeLeft >= 0) ? timeLeft : 0;
    }
}

// Render the current question to the page
function renderQuestion() {
    questionSection.firstChild.textContent = questions[questionNum].qText;
    let answerButtons = document.querySelectorAll(".answer-button");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = (i + 1) + ". " + questions[questionNum].aTextArr[i];
    }
}

// Display a blurb at the bottom of the questions section for one second
function displayBlurb(blurbText) {
    // Create the horizontal ruling and blurb elements to display
    let lineEl = document.createElement("hr");
    questionSection.appendChild(lineEl);
    let blurbEl = document.createElement("aside");
    blurbEl.id = "blurb";
    blurbEl.textContent = blurbText;
    // Add them to the question section element
    questionSection.appendChild(blurbEl);
    // After one second, remove them
    setTimeout(function() {
        questionSection.removeChild(lineEl);
        questionSection.removeChild(blurbEl);
    }, 1000);
}

// End the quiz
function endQuiz() {
    quizRunning = false;
    // Switch from the question screen to the game over screen
    mainEl.replaceChildren();
    mainEl.append(gameOverSection);
    // Render the player's score to the screen
    document.querySelector("#score-span").textContent = timeLeft;
}

// Store the user's score and initials in localStorage
function storeScore(initials, score) {
    // Get the scores array from storage
    let scores = localStorage.getItem("scores");
    // If it's not in the storage, create it with the current score
    if (!scores) {
        scores = [{initials, score}];
    // Else, add the current score and sort the array
    } else {
        scores = JSON.parse(scores);
        scores.push({initials: initials, score: score});
        // Sort the scores - higher scores first, then alphabetically in case of a tie
        scores.sort(function(a, b) {
            let sortOrder = 0;
            if (a.score > b.score) {
                sortOrder = -1;
            } else if (a.score < b.score) {
                sortOrder = 1;
            } else {
                if (a.initials > b.initials) {
                    sortOrder = 1;
                } else if (a.initials < b.initials) {
                    sortOrder = -1;
                } else {
                    sortOrder = 0;
                }
            }
            return sortOrder;
        });
    }
    // Finally, save the scores array to the storage
    localStorage.setItem("scores", JSON.stringify(scores));
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
    scoreEl.innerHTML = "Your score is <span id='score-span'></span>";
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