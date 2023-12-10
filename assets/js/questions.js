// Class for the question objects
class Question {
    constructor(qText, aTextArr, aCorrect) {
        this.qText = qText;
        this.aTextArr = aTextArr;
        this.aCorrect = aCorrect;
    }

    // Check whether the answer provided is the correct answer for the question
    checkAnswer(answer) {
        if (answer === this.aCorrect) {
            return true
        } else {
            return false
        }
    }
}

// Store the questions in an array
let questions = [
    new Question("Which Web Storage API mechanism allows values to be stored across browser sessions?", ["browserStorage", "localStorage", "diskStorage", "sessionStorage"], "localStorage"),
    new Question("What is the syntax of the ternary operator?", ["condition ? valIfTrue : valIfFalse", "expression : val1 ? val2", "function ! valIfFalse ~ valIfTrue", "operator @ val1 # val2"], "condition ? valIfTrue : valIfFalse"),
    new Question("Which array method does NOT mutate the array?", ["sort()", "pop()", "toSorted()", "push()"], "toSorted()"),
    new Question("Which of the following are JavaScript objects?", ["numbers", "functions", "strings", "all of the above"], "all of the above"),
    new Question("Which shape best describes the DOM?", ["a ring", "a tree", "a pinwheel", "a tangle"], "a tree")
];