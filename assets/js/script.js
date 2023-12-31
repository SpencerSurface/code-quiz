// Create and store element objects that will be used later
const headerEl = document.querySelector("header");
const mainEl = document.querySelector("main");
const startButton = document.querySelector("#start-button");
const timeSpan = document.querySelector("#time-count");
const startSection = document.querySelector("#start-section");
const questionSection = buildQuestionSection();
const gameOverSection = buildGameOverSection();

// Track whether the quiz is in progress
let quizRunning = false;

// Track how much time remains
let timeLeft;

// Track which question is current
let questionNum;

// Track how many blurbs are attempting to be displayed
let blurbCount = 0;

// Note the max number of high scores to store
const maxScoreCount = 5;

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
        // (Note: the number is sliced from the answer to get correct format)
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
    // If the user input is blank, reprompt
    if (!userInput || userInput === "") {
        alert("If you want to submit a score, you must include your initials.");
    // Else store the user's score and navigate to the highscore page
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
    // Display a blurb state whether the answer was correct
    if (questions[questionNum].checkAnswer(answer)) {
        displayBlurb("Correct!");
    } else {
        displayBlurb("Wrong!");
        // If the answer was incorrect, decrement the timer, but keep the time >= 0
        timeLeft -= 10;
        timeLeft = (timeLeft >= 0) ? timeLeft : 0;
    }
}

// Render the current question to the page
function renderQuestion() {
    // Set the question text
    questionSection.firstChild.textContent = questions[questionNum].qText;
    // For each answer button, set the answer text
    let answerButtons = document.querySelectorAll(".answer-button");
    for (let i = 0; i < answerButtons.length; i++) {
        // (Note: the number is added in front of the answer to make the list look correct)
        answerButtons[i].textContent = (i + 1) + ". " + questions[questionNum].aTextArr[i];
    }
}

// Display a blurb at the bottom of the questions section for one second
function displayBlurb(blurbText) {
    // Style the horizontal ruling and blurb elements to be visible
    let lineEl = document.querySelector("hr");
    lineEl.style = "display:auto"
    let blurbEl = document.querySelector("#blurb");
    blurbEl.textContent = blurbText;
    // Add one to the blurb count
    blurbCount++;
    // After one second, decrement blurb count, hide line and blurb if blurb count is zero
    setTimeout(function() {
        blurbCount--;
        if (blurbCount === 0) {
            lineEl.style = "display:none";
            blurbEl.textContent = "";
        }
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
        // If scores contains more elements than the maxScoreCount, remove the lowest scores
        while (scores.length > maxScoreCount) {
            scores.pop();
        }
    }
    // Finally, save the scores array to the storage
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Build and return the question section. Contains a heading and four answer buttons.
function buildQuestionSection() {
    // Create the question section element
    let questionSection = document.createElement("section");
    questionSection.setAttribute("id", "question-section");

    // Create and append the heading element
    let headingEl = document.createElement("h1");
    questionSection.appendChild(headingEl);

    // Create and append each of four button elements
    let buttonEls = [];
    for (let i = 0; i < 4; i++) {
        buttonEls.push(document.createElement("button"));
        buttonEls[i].classList.add("answer-button")
        questionSection.appendChild(buttonEls[i]);
    }

    // Create and append an initially hidden horizontal ruling element
    let lineEl = document.createElement("hr");
    lineEl.style = "display:none";
    questionSection.append(lineEl);

    // Create and append an initially empty aside element
    let blurbEl = document.createElement("aside");
    blurbEl.id = "blurb";
    questionSection.appendChild(blurbEl);

    // Return the completed question section element
    return questionSection
}

// Build and return the game over section. Contains a heading, text about the score, and an area to submit the score.
function buildGameOverSection() {
    // Create the game over section element
    let gameOverSection = document.createElement("section");
    gameOverSection.setAttribute("id", "game-over-section");

    // Create and append the heading element
    let headingEl = document.createElement("h1");
    headingEl.textContent = "Game Over"
    gameOverSection.appendChild(headingEl);

    // Create and append the paragraph element announcing the score
    let scoreEl = document.createElement("p");
    scoreEl.innerHTML = "Your score is <span id='score-span'></span>";
    gameOverSection.appendChild(scoreEl);

    // Create and append the form element, with its nested elements
    let highScoreInput = document.createElement("form");
    let highScoreLabel = document.createElement("label");
    highScoreLabel.textContent = "Enter your initials: "
    highScoreLabel.setAttribute("for", "initials-input");
    highScoreInput.appendChild(highScoreLabel);
    let highScoreText = document.createElement("input");
    highScoreText.setAttribute("type", "text");
    highScoreText.id = "initials-input";
    highScoreInput.appendChild(highScoreText);
    let highScoreSubmit = document.createElement("input");
    highScoreSubmit.setAttribute("type", "submit");
    highScoreInput.appendChild(highScoreSubmit);
    gameOverSection.appendChild(highScoreInput);

    // Return the completed game over section element
    return gameOverSection
}