const calculatorDisplay = document.querySelector(".display");
const hoverDisplay = document.querySelector(".hover-display");
const numberButtons = document.querySelectorAll(".number-buttons button");
const operationButtons = document.querySelectorAll(".operation-buttons button");
const equalButton = document.querySelector("#equal");
const operationPrefix = document.querySelector(".prefix");
let operator;



numberButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const number = index.toString();
        updateDisplay(number);
    });
});

function updateDisplay(input) {
    if (calculatorDisplay.textContent === "0") {
        calculatorDisplay.textContent = input;
    } else {
        calculatorDisplay.textContent += input;
    }
}

operationButtons.forEach(button => button.addEventListener("click", moveOperand));
equalButton.addEventListener("click", () => performOperation(operator));

function moveOperand() {
    hoverDisplay.textContent = calculatorDisplay.textContent;
    calculatorDisplay.textContent = "0";
    operator = this.id;
}

const operationMap = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
}

function performOperation(operator) {
    const firstNumber = parseFloat(hoverDisplay.textContent);
    const secondNumber = parseFloat(calculatorDisplay.textContent);
    const result = operationMap[operator](firstNumber, secondNumber);
    calculatorDisplay.textContent = result.toString();
    hoverDisplay.textContent = "-";
}