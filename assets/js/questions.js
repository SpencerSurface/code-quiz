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
    new Question("Which of the following is NOT a built-in data type?", ["string", "boolean", "alert", "number"], "alert"),
    new Question("The condition in an if statement is enclosed with what?", ["quotes", "curly braces", "parentheses", "square brackets"], "parentheses"),
    new Question("What can Javascript arrays store?", ["numbers and strings", "other arrays", "booleans", "all of the above"], "all of the above"),
    new Question("String literals must be enclosed with what when assigning to variables?", ["commas", "curly braces", "quotes", "parentheses"], "quotes"),
    new Question("Which tool can print content to the debugger?", ["JavaScript", "bash", "for loops", "console.log"], "console.log")
];