const divDisplay = document.querySelector('.display');
const btnDigit = document.querySelectorAll('.btns > .btn.digit');
const btnClear = document.querySelector('.btn.clear');
const btnOps = document.querySelectorAll('.btns > .btn.op');
let displayValue = '';
let selectedOperations = [];
let selectedNumbers = [];
let currentNumber = '';
const operators = {
    'plus': '+',
    'div': '÷',
    'minus':'-',
    'mult':'×',
    'equals': '=',
}

function add(n1, n2){
    return n1 + n2;
}

function subtract(n1, n2){
    return n1 - n2;
}

function multiply(n1, n2){
    return n1 * n2;
}

function divide(n1, n2){
    return n1 / n2;
}

function operate(operation, n1, n2){
    let result = 0;
    switch (operation) {
        case operators.plus: 
            result = add(n1, n2);
            break;
        case operators.minus:
            result = subtract(n1, n2);
            break;
        case operators.mult: 
            result = multiply(n1,n2);
            break;
        case operators.div:
            result = divide(n1,n2);
            break;
    }
    return result;
}


/**
 * outputs value of the variable displayValue to the calculators divDisplay.
 */
function updateDisplay(){
    divDisplay.textContent = displayValue;
}


/**
 * Event Listeners
 */

document.addEventListener('keydown', e => {
    console.log(e.code);
    switch(e.code){
        case 'Digit0':
            displayValue += '0';
            updateDisplay();
            break;
        case 'Digit1': 
            displayValue += '1';
            updateDisplay();
            break;
        case 'Digit2':
            displayValue += '2';
            updateDisplay();
            break;
        case 'Digit3':
            displayValue += '3';
            updateDisplay();
            break;
        case 'Digit4':
            displayValue += '4';
            updateDisplay();
            break;
        case 'Digit5':
            displayValue += '5';
            updateDisplay();
            break;
        case 'Digit6':
            displayValue += '6';
            updateDisplay();
            break;
        case 'Digit7':
            displayValue += '7';
            updateDisplay();
            break;
        case 'Digit8':
            displayValue += '8';
            updateDisplay();
            break;
        case 'Digit9':
            displayValue += '9';
            updateDisplay();
            break;
    }
})

/**
 * update displayValue to be an empty string
 * and call updateDisplay();
 */
btnClear.addEventListener('click', clearDisplay);
function clearDisplay(){
    currentNumber = '';
    displayValue = '';
    selectedNumbers = [];
    selectedOperations = [];
    updateDisplay();
}

/**
 * DIGIT CLICK
 * When a digit is clicked update value of displayValue variable
 * and call updateDisplay()
 */
for (let btn of btnDigit) {
    btn.addEventListener('click', e =>{
        currentNumber += btn.textContent;
        displayValue = currentNumber;
        updateDisplay();
    });
}

for (let btn of btnOps){
    btn.addEventListener('click',operation)
}
function operation(e){
    addNumber(currentNumber);
    currentNumber = '';
    if(e.target.textContent !== operators.equals){
        addOperation(e.target.textContent);
        calculate();
        updateDisplay();
    } else {
        calculate();
        updateDisplay();
    }
}

function addNumber(num){
    selectedNumbers.push(parseFloat(num));
}

function addOperation(operation){
    selectedOperations.push(operation);
}

function calculate(){
    if (selectedNumbers.length > 1){
        // perform operation on first and second number store result as first number
        selectedNumbers[0] = operate(selectedOperations[0], selectedNumbers[0], selectedNumbers[1]);
        // display first number
        displayValue = selectedNumbers[0];
        updateDisplay();
        // remove 2nd number that was used in operation
        selectedNumbers.splice(1,1);
        // remove the operator
        selectedOperations.splice(0,1);
    } 
}