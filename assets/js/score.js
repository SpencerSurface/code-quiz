const listEl = document.querySelector("#scores-list");

renderScores();

// Render the high scores to the page upon loading
function renderScores() {
    let scores = localStorage.getItem("scores");

    // If scores is null, there's nothing to render
    if (!scores) {
        return
    }

    scores = JSON.parse(scores);

    let tempListItem;

    for (let i = 0; i < scores.length; i++) {
        tempListItem = document.createElement("li");
        tempListItem.textContent = scores[i];
        listEl.appendChild(tempListItem);
    }
}