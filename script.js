// Initialize variables that store reference to elements in index.html
const firstNumber = document.querySelector(".first-number");
const secondNumber = document.querySelector(".second-number");
const operationText = document.querySelector(".operator");
const numericButtons = document.querySelectorAll(".numberButton");
const operationButtons = document.querySelectorAll(".operation");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const inverseButton = document.querySelector("#inverse");
const decimalButton = document.querySelector("#decimal");

let operator;
let isFirstFocus = true;


// Event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keydown", events => console.log(events.key));

numericButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const number = button.textContent;
        updateDisplay(number);
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", setOperation)
});

equalButton.addEventListener("click", () => {
    performOperation(operator)
});

clearButton.addEventListener("click", () => {
    firstNumber.textContent = "0";
    resetCalculatorState();
});

deleteButton.addEventListener("click", () => {
    deleteLastDigit();
});

inverseButton.addEventListener("click", () => {
    toggleInverse();
});

decimalButton.addEventListener("click", () => {
    addDecimal();
});





// Functions for event handling
function handleKeyDown(event) {
    const key = event.key;
    const numericButton = Array.from(numericButtons).find(
        (button) => button.textContent === key
    );
    const operationButton = Array.from(operationButtons).find(
        (button) => button.textContent === key
    )
    const isEnterKey = key === "Enter" || key === "=";
    const isEscapeKey = key === "Escape"
    const isDeleteKey = key === "Backspace";
    const isDecimalKey = key === "."

    if (numericButton) {
        numericButton.click();
    } else if (operationButton) {
        operationButton.click();
    } else if (isEnterKey) {
        performOperation(operator);
    } else if (isEscapeKey) {
        firstNumber.textContent = "0";
        resetCalculatorState();
    } else if (isDeleteKey) {
        deleteLastDigit();
    } else if (isDecimalKey) {
        addDecimal();
    }
}

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
    resetCalculatorState();
}

function resetCalculatorState() {
    operator = undefined;
    secondNumber.textContent = "";
    operationText.textContent = "";
    isFirstFocus = true;
}

function deleteLastDigit() {
    const currentNumber = isFirstFocus ? firstNumber : secondNumber;
    if (currentNumber.textContent.length === 1) {
        currentNumber.textContent = "0";
        return;
    }
    currentNumber.textContent = currentNumber.textContent.slice(0, -1);
}

function toggleInverse() {
    const currentNumber = isFirstFocus ? firstNumber : secondNumber;
    currentNumber.textContent *= -1;
}

function addDecimal() {
    const currentNumber = isFirstFocus ? firstNumber : secondNumber;

    if (currentNumber.textContent.includes(".")) {
        return;
    }
    currentNumber.textContent += ".";
}





/* Object containing all operation functions */
const operationMap = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (a == 0 & b == 0) {
            return "0";
        }
        return a / b;
    },
    remainder: (a, b) => a % b,
    power: (a, b) => a ** b,
}