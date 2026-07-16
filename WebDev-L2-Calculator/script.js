// Display
const display = document.getElementById("display");

// Select all buttons
const buttons = document.querySelectorAll("input[type='button']");

// Variables
let currentInput = "";
let previousInput = "";
let operator = "";

// Function for calculation
function calculate(num1, num2, operator) {

    switch (operator) {

        case "+":
            return num1 + num2;

        case "-":
            return num1 - num2;

        case "*":
            return num1 * num2;

        case "/":

            if (num2 === 0) {
                return "Error";
            }

            return num1 / num2;

        case "%":
            return num1 % num2;

        default:
            return num2;
    }
}

// Event Listener
buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        let value = button.value;

        // Clear
        if (value === "AC") {

            display.value = "";

            currentInput = "";
            previousInput = "";
            operator = "";
        }

        // Delete
        else if (value === "DE") {

            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }

        // Operators
        else if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/" ||
            value === "%"
        ) {

            if (currentInput === "") {
                return;
            }

            // Operator Chaining
            if (previousInput !== "") {

                let result = calculate(
                    Number(previousInput),
                    Number(currentInput),
                    operator
                );

                if (result === "Error") {

                    display.value = "Error";

                    currentInput = "";
                    previousInput = "";
                    operator = "";

                    return;
                }

                previousInput = result.toString();
                display.value = previousInput + " " + value;
            }
            else {

                previousInput = currentInput;
                display.value = previousInput + " " + value;
            }

            operator = value;
            currentInput = "";
        }

        // Equals
        else if (value === "=") {

            if (
                previousInput === "" ||
                currentInput === "" ||
                operator === ""
            ) {
                return;
            }

            let result = calculate(
                Number(previousInput),
                Number(currentInput),
                operator
            );

            if (result === "Error") {

                display.value = "Error";

                currentInput = "";
                previousInput = "";
                operator = "";

                return;
            }

            display.value = result;

            currentInput = result.toString();
            previousInput = "";
            operator = "";
        }

        // Numbers & Decimal
        else {

            // Prevent multiple decimal points in a single number
            if (value === ".") {
                if (currentInput.includes(".")) {
                    return;
                }
                if (currentInput === "") {
                    currentInput = "0";
                }
            }

            currentInput += value;
            
            // Show complete expression: previousInput operator currentInput
            if (operator !== "") {
                display.value = previousInput + " " + operator + " " + currentInput;
            } else {
                display.value = currentInput;
            }
        }

    });

});