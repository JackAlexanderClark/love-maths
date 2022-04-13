// Wait for DOM to to stop loading before running the game.
// Get the button elements and add event listeners to them.

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                alert(`You clicked ${gameType}`);
                runGame(gameType);
            }
        });
    }
    // If keydown is entered then run checkAnswer function.
    document.getElementById("answer.box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    }) 
    
    // Outside the for loop, run addition game.
    runGame("addition");

});

/** 
 * Docstring - The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 * pass through the gameType argument into the runGame() function.
 */
function runGame(gameType) {
    
    /**
     * Will set answer-box to reset to an empty string eachtime, so you don't have to reset the answer box each time.
     * Each time runGame() function is called the focus() method will make the cursor start in the answer box.
    */
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();


    // Creating a whole number integer random number 1 - 25.
    let num1 = Math.floor(Math.random() * 25 + 1);
    let num2 = Math.floor(Math.random() * 25 + 1);

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType ==="subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        // Displaying error message.
        alert(`Unknown game type: ${gametype}`)
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * The checkAnswer() function will check the answer against the first element in the returned array 
 * from the calculateCorrectAnswer() function. Array has the "addition" gametype in its second element to keep the addition game running.
 */
function checkAnswer() {
    
    let userAnswer = parseInt(document.getElementById("answer-box").value); 
    let calculatedAnswer = calculatedCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Absolutely Incredible Work. Congratulations on getting this correct :')")
        incrementScore();
    } else {
        alert(`You answered ${userAnswer}. Unfortunately, you have got this incorrect >:(. The correct answer is ${calculatedAnswer[0]}.`)
        incrementWrongAnswer();
    }
    
    // Runs another game from array second element which was "addition".
    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operand (numbers) and the operator (+, -, *, %)
 * directly from the DOM, and returns the correct answer. We use parseInt() to make sure we treat values as whole numbers (integers), rather than a string.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1, operand2, "addition"];
    } else if (operator === "x") {
        return [operand1, operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1, operand2, "subtract"];
    } else {
        // Will throw an alert message if cannot detect the operator.
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!!!`;
    }

}
/**
 * This function will get the current score from the DOM and increases it by 1.
 */
function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    // Using ++ incrementer to add plus 1 to the score stored in the DOM.
    document.getElementById("score").innerText = ++oldScore;

}
/**
 * This function will get the current tally score of incorrect answers from the DOM and increments it by 1.
 */
function incrementWrongAnswer() {
    
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

// Function accepts three arguments; operand 1, operand 2 and the operator.
function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {

    /**
     * Using ternary statement to write the condition. Which is bigger? If operand1 is > operand2 return that. 
     * If operand2 is bigger than operand1 return that.
     * condition ? true part: false part;
    */
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";



// Uses the x symbol for user familiarity rather than * as used in computing.
function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

/**
 * We need 3 things when creating a new question; 1) add the gameType check to runGame(). 2) Create the display question function.
 * 3) Modify the calculateCorrectAnswer function.
 */

