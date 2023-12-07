// Get element objects for the score list and the clear button
const listEl = document.querySelector("#scores-list");
const backButton = document.querySelector("#back-button");
const clearButton = document.querySelector("#clear-button");

// Render the stored scores upon page load
renderScores();

// Delete stored scores, remove scores from DOM, and render (lack of) scores upon clear button click
clearButton.addEventListener("click", function() {
    localStorage.removeItem("scores");
    listEl.replaceChildren();
    renderScores();
})

// Navigate to index.html upon back button click
backButton.addEventListener("click", function() {
    document.location = "index.html";
})



// Render the stored high scores to the page
function renderScores() {
    let scores = JSON.parse(localStorage.getItem("scores"));

    let tempListItem;

    // If scores is null or empty, there's nothing to render
    if (!scores || scores.length === 0) {
        tempListItem = document.createElement("li");
        tempListItem.textContent = "No scores yet!";
        listEl.appendChild(tempListItem);
        return
    }

    // Else, render each score to the page in the scores list
    for (let i = 0; i < scores.length; i++) {
        tempListItem = document.createElement("li");
        tempListItem.textContent = scores[i];
        listEl.appendChild(tempListItem);
    }
}