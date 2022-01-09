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
    switch (operation) {
        case '+': 
            add(n1, n2);
            break;
        case '-':
            subtract(n1, n2);
            break;
        case '*': 
            multiply(n1,n2);
            break;
        case '/':
            divide(n1,n2);
            break;
    }
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btns > .btn');
const btnClear = document.querySelector('.btn-clear');

let displayValue = '';

btnClear.addEventListener('click', clearDisplay);

function clearDisplay(){
    displayValue = ''
    display.textContent = displayValue;
}

for (let btn of buttons) {
    btn.addEventListener('click',displayInput);
}

function displayInput(e){
    displayValue += e.target.textContent;
    display.textContent = displayValue;
}