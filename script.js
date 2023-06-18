const calculatorDisplay = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number-buttons button");

numberButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const number = index.toString();
        updateDisplay(number);
    });
});

function updateDisplay(number) {
    if (calculatorDisplay.textContent === "0") {
        calculatorDisplay.textContent = number;
    } else {
        calculatorDisplay.textContent += number;
    }
}



// Basic arithmetic operations
function add (a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


// Perform the specified operation on two numbers
function operate(operator, a, b) {
    return operator(a, b);
}