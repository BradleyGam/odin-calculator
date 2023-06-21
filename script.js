/* Initialize variables that store reference to elements in index.html */
const firstNumber = document.querySelector(".first-number");
const secondNumber = document.querySelector(".second-number");
const operationText = document.querySelector(".operator");
const numericButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation-buttons button");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const inverseButton = document.querySelector("#inverse");
const decimalButton = document.querySelector("#decimal");

let operator;
let isFirstFocus = true;


/* Add event listeners to each button */
numericButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const number = button.textContent;
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
    const currentNumber = isFirstFocus ? firstNumber : secondNumber;
    if (currentNumber.textContent.length === 1) {
        currentNumber.textContent = "0";
        return;
    }
    currentNumber.textContent = currentNumber.textContent.slice(0, -1);
});


inverseButton.addEventListener("click", () => {
    const currentNumber = isFirstFocus ? firstNumber : secondNumber;
    currentNumber.textContent *= -1;
});


decimalButton.addEventListener("click", () => {
    const currentNumber = isFirstFocus ? firstNumber : secondNumber;

    if (currentNumber.textContent.includes(".")) {
        return;
    }
    currentNumber.textContent += ".";
});



/* Functions for updating UI and performing calculation */
function updateDisplay(number) {
    const currentNumber = isFirstFocus ? firstNumber : secondNumber;
    if (currentNumber.textContent === "0") {
        currentNumber.textContent = number;
    } else {
        currentNumber.textContent += number;
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
    const a = parseFloat(firstNumber.textContent) || 0;
    const b = parseFloat(secondNumber.textContent) || 0;
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