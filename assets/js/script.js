// Header (all screens, hidden on high score screen): high score link, timer

// Start screen: start button

// Question screen: answer buttons, question result

// Game over screen: high score submission

// High score screen: high score clear button, back button

/* Concept: Create section elements corresponding to each screen. Switch between screens by removing and adding their 
respective sections as children of mainEl. (Minus for high score screen, which is a separate page). */

const headerEl = document.querySelector("header");
const mainEl = document.querySelector("main");
let startSection = document.querySelector("#start-section");
let questionSection = buildQuestionSection();
let gameOverSection = buildGameOverSection();
let highScoreSection = buildHighScoreSection();



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

// Build and return the high score section. Contains a heading, the score list, a back button, and a clear button.
function buildHighScoreSection() {
    let highScoreSection = document.createElement("section");
    highScoreSection.setAttribute("id", "high-score-section");

    let headingEl = document.createElement("h1");
    headingEl.textContent = "High Scores";
    highScoreSection.appendChild(headingEl);

    let highScoreList = document.createElement("ol");
    // TODO: replace with actual scores
    let listItem = document.createElement("li");
    listItem.textContent = "Example score";
    highScoreList.appendChild(listItem);
    highScoreSection.appendChild(highScoreList);

    let backButton = document.createElement("button");
    backButton.setAttribute("id", "back-button");
    backButton.textContent = "Go Back";
    highScoreSection.appendChild(backButton);

    let clearButton = document.createElement("button");
    clearButton.setAttribute("id", "clear-button");
    clearButton.textContent = "Clear Scores";
    highScoreSection.appendChild(clearButton);

    return highScoreSection
}