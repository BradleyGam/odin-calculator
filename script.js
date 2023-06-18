const firstNumber = document.querySelector(".first-number");
const secondNumber = document.querySelector(".second-number");
const operationText = document.querySelector(".operator");
const numberButtons = document.querySelectorAll(".number-buttons button");
const operationButtons = document.querySelectorAll(".operation-buttons button");
const equalButton = document.querySelector("#equal");
let operator;



numberButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const number = index.toString();
        updateDisplay(number);
    });
});

function updateDisplay(input) {
    if (firstNumber.textContent === "0") {
        firstNumber.textContent = input;
    } else {
        firstNumber.textContent += input;
    }
}

operationButtons.forEach(button => button.addEventListener("click", moveOperand));
equalButton.addEventListener("click", () => performOperation(operator));

function moveOperand() {
    secondNumber.textContent = firstNumber.textContent;
    firstNumber.textContent = "0";
    operator = this.id;
    operationText.textContent = this.textContent;
}

const operationMap = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,

}

function performOperation(operator) {
    const a = parseFloat(firstNumber.textContent);
    const b = parseFloat(secondNumber.textContent);
    const result = operationMap[operator](a, b);
    firstNumber.textContent = result.toString();
    secondNumber.textContent = "-";
}



