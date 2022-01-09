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

/**
 * update displayValue to be an empty string
 * and call updateDisplay();
 */
btnClear.addEventListener('click', clearDisplay);
function clearDisplay(){
    displayValue = ''
    updateDisplay()
}

/**
 * When a digit is clicked update value of displayValue variable
 * and call updateDisplay()
 */
for (let btn of btnDigit) {
    btn.addEventListener('click', e =>{
        currentNumber += btn.textContent;
        displayValue += btn.textContent;
        updateDisplay();
    });
}
console.log([].length);
for (let btn of btnOps){
    btn.addEventListener('click',operation)
}
function operation(e){
    addNumber(currentNumber);
    currentNumber = '';
    if(e.target.textContent !== operators.equals){
        addOperation(e.target.textContent);
        displayValue += e.target.textContent;
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
    console.table(selectedNumbers);
    console.table(selectedOperations);
    let result = 0;
    let indexOfOperation = '';
    while (selectedNumbers.length > 1){
        indexOfOperation = selectedOperations.findIndex(e => {return e === operators.div || e === operators.mult})
        if (indexOfOperation === -1){
            indexOfOperation = 0;
        }
        result = operate(selectedOperations[indexOfOperation], selectedNumbers[indexOfOperation], selectedNumbers[indexOfOperation + 1]);
        selectedOperations.splice(indexOfOperation,1);
        selectedNumbers.splice(indexOfOperation,2,result);
        console.table(selectedNumbers);
        console.table(selectedOperations);
    }
    selectedOperations = [];
    selectedNumbers = [];
    displayValue = result;
    updateDisplay();
}
