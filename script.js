/* Initialize variables that store reference to elements in index.html */
const firstNumber = document.querySelector(".first-number");
const secondNumber = document.querySelector(".second-number");
const operationText = document.querySelector(".operator");
const numericButtons = document.querySelectorAll(".number-buttons button");
const operationButtons = document.querySelectorAll(".operation-buttons button");
const equalButton = document.querySelector("#equal");

let operator = undefined;



/* Add event listeners to each button */
numericButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const number = index.toString();
        updateDisplay(number);
    });
});

operationButtons.forEach(button => button.addEventListener("click", setOperation));
equalButton.addEventListener("click", () => performOperation(operator));



/* Functions for updating UI and performing calculation */
function updateDisplay(number) {
    if (operator === undefined) {
        // If no operator is set, update the first number in the display
        if (firstNumber.textContent === "0") {
            firstNumber.textContent = number;
        } else {
            firstNumber.textContent += number;
        }
    } else {
        // If an operator is set, update the second number in the display
        if (secondNumber.textContent === "0") {
            secondNumber.textContent = number;
        } else {
            secondNumber.textContent += number;
        }
    }
}


function setOperation() {
    if (secondNumber.textContent !== "") {
        performOperation(operator);
    }
    operationText.textContent = this.textContent;
    operator = this.id;
}


function performOperation(operator) {
    if (operator === undefined) {
        operator = "add";
    }
    let a = parseFloat(firstNumber.textContent);
    if (isNaN(a)) {
        a = 0;
    }
    let b = parseFloat(secondNumber.textContent);
    if (isNaN(b)) {
        b = 0;
    }
    const result = operationMap[operator](a, b);
    firstNumber.textContent = result.toString();
    resetUI();
}


function resetUI() {
    operator = undefined;
    secondNumber.textContent = "";
    operationText.textContent = "";
}


/* Object containing all operation functions */
const operationMap = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    remainder: (a, b) => a % b,
    power: (a, b) => a ** b,
}