const digitButtons = document.querySelectorAll(".digit");
const functionButtons = document.querySelectorAll(".function");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalButton = document.getElementById("equal");
const pointButton = document.getElementById("point");
const screenTop = document.querySelector(".screen-top");
const screenBottom = document.querySelector(".screen-bottom");

let windowSize = 0;
let operandA = "";
let operandB = "";
let operation = null;
let resetScreen = false;

function appendNumber(number) {
  if (screenBottom.textContent === "0" || resetScreen) {
    screenReset();
  }
  if (screenBottom.textContent.length > 12) {
    return;
  }
  screenBottom.textContent += number;
}

function screenReset() {
  screenBottom.textContent = "";
  resetScreen = false;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function evaluate() {
  if (operation === null || resetScreen) return;
  if (operation === "÷" && screenBottom.textContent === "0") {
    alert("Division by 0 is forbidden!");
    return;
  }
  operandB = screenBottom.textContent;
  screenBottom.textContent = result(operate(operation, operandA, operandB));
  screenTop.textContent = `${operandA} ${operation} ${operandB} =`;
  operation = null;

  function result(number) {
    return Math.round(number * 1000) / 1000;
  }
}

function setOperation(operator) {
  if (operation !== null) evaluate();
  operandA = screenBottom.textContent;
  operation = operator;
  screenTop.textContent = `${operandA} ${operation}`;
  resetScreen = true;
}

function addPoint() {
  if (resetScreen) screenReset();
  if (screenBottom.textContent === "") screenBottom.textContent = "0";
  if (screenBottom.textContent.includes(".")) return;
  screenBottom.textContent += ".";
}

function operate(operator, num1, num2) {
  num1 = +num1;
  num2 = +num2;
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      if (num2 === 0) return null;
      else return divide(num1, num2);
    default:
      return null;
  }
}

digitButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

clearButton.addEventListener("click", () => {
  screenBottom.textContent = "0";
  screenTop.textContent = "";
  operandA = "";
  operandB = "";
  operation = null;
});

deleteButton.addEventListener("click", () => {
  const str = screenBottom.textContent.slice(0, -1);
  screenBottom.textContent = str;
});

functionButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

equalButton.addEventListener("click", evaluate);

pointButton.addEventListener("click", addPoint);
