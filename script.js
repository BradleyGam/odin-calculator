const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers button");

for (let i = 0; i <= 9; i++) {
    numbers[i].addEventListener("click", () => {
        if (display.textContent == "0") {
            display.textContent = `${i}`
        } else {
            display.textContent = display.textContent + `${i}`;
        }
    });
}


let firstNumber = 0;
let secondNumber = 0;

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

function operate(operator, a, b) {
    return operator(a, b);
}