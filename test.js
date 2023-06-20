/* Initialize variables that store reference to elements in index.html */
const firstNumber = document.querySelector(".first-number");
const secondNumber = document.querySelector(".second-number");
const operationText = document.querySelector(".operator");
const numericButtons = document.querySelectorAll(".number-buttons button");
const operationButtons = document.querySelectorAll(".operation-buttons button");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const inverseButton = document.querySelector("#inverse");
const decimalButton = document.querySelector("#decimal");

let operator;
let isFirstFocus = true;

/* Add event listeners to each button */
numericButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const number = index.toString();
        updateDisplay(number);
    });
});


operationButtons.forEach(button => button.addEventListener("click", setOperation));


equalButton.addEventListener("click", () => performOperation(operator));


clearButton.addEventListener("click", () => {
    firstNumber.textContent = "0";
    resetUI();
});


deleteButton.addEventListener("click", () => {
    if (isFirstFocus) {
        if (firstNumber.textContent.length === 1) {
            firstNumber.textContent = "0";
            return;
        }
        firstNumber.textContent = firstNumber.textContent.slice(0, -1);
    } else {
        if (secondNumber.textContent.length === 1) {
            secondNumber.textContent = "0";
            return;
        }
        secondNumber.textContent = secondNumber.textContent.slice(0, -1);
    }
});


inverseButton.addEventListener("click", () => {
    if (isFirstFocus) {  
        firstNumber.textContent = firstNumber.textContent * -1;
    } else {
        secondNumber.textContent = secondNumber.textContent * -1;
    }
});


decimalButton.addEventListener("click", () => {
    if (isFirstFocus) {
        if (firstNumber.textContent.indexOf(".") === firstNumber.textContent.length - 1) {
            firstNumber.textContent = firstNumber.textContent.slice(0, -1);
            return;
        } else if (firstNumber.textContent.includes(".")) {
            return;
        }
        firstNumber.textContent += ".";
    } else {
        if (secondNumber.textContent.indexOf(".") === secondNumber.textContent.length - 1) {
            secondNumber.textContent = secondNumber.textContent.slice(0, -1);
            return;
        } else if (secondNumber.textContent.includes(".")) {
            return;
        }
        secondNumber.textContent += ".";
    }
});



/* Functions for updating UI and performing calculation */
function updateDisplay(number) {
    if (isFirstFocus) {
        if (firstNumber.textContent === "0") {
            firstNumber.textContent = number;
        } else {
            firstNumber.textContent += number;
        }
    } else {
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
    isFirstFocus = false;
}


function performOperation(operator) {
    operator = operator || "add";
    const a = parseFloat(firstNumberElement.textContent) || 0;
    const b = parseFloat(secondNumberElement.textContent) || 0;
    const result = operationMap[operator](a, b);

    firstNumber.textContent = result.toString();
    resetUI();
}


function resetUI() {
    operator = undefined;
    secondNumber.textContent = "";
    operationText.textContent = "";
    isFirstFocus = true;
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