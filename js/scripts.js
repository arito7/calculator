const btnDigit = document.querySelectorAll('.btns > .btn.digit');
const btnClear = document.querySelector('.btn.clear');
const btnOps = document.querySelectorAll('.btns > .btn.op');
const divAnswer = document.querySelector('.display > .answer');
const divEquation = document.querySelector('.display > .equation');
let currentNumber = '';
const equation = {
    number: '',
    numbers: [],
    ops: [],
    answer: '',
    pushNumber:function(){
        this.numbers.push(parseFloat(this.number));
        this.number = '';
    },
    pushOp:function(op){
        this.ops.push(op);
    },
    reset:function(){
        this.number = '';
        this.numbers = [];
        this.ops = [];
        this.answer = '';
    },
    getEquation:function(){
        if(this.ops.length === 0){
            return this.number;
        } else {
            return this.numbers[0] + this.ops[0] + this.number;
        }
    },
}
const operators = {
    plus: '+',
    div: '÷',
    minus:'-',
    mult:'×',
    equals: '=',
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
    if (n2 != 0){
        return n1 / n2;
    } else {
        return undefined;
    }
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
 * outputs value of the variable equation to the calculators divDisplay.
 */
function updateDisplay(){
    divEquation.textContent = equation.getEquation();
    divAnswer.textContent = equation.answer;
}

/**
 * CLEAR BUTTON
 * update equation to be an empty string
 * and call updateDisplay();
 */
btnClear.addEventListener('click', clearDisplay);
function clearDisplay(){
    equation.reset();
    updateDisplay();
}

/**
 * DIGIT CLICK
 * When a digit is clicked update value of equation variable
 * and call updateDisplay()
 */
for (let btn of btnDigit) {
    btn.addEventListener('click', () => {
        // if selectedNumbers is empty means this is a new calculation so reset previous answer
        if(equation.numbers.length === 0){
            equation.answer = '';
        }
        equation.number += btn.textContent;
        updateDisplay();
    });
}

/**
 * OPERATOR CLICK
 */
for (let btn of btnOps){
    btn.addEventListener('click',operation)
}
function operation(e){
    // this check is to ignore any operational inputs when the
    // equation is empty
    if (equation.number != ''){
        equation.pushNumber();
        equation.pushOp(e.target.textContent);
        if (equation.numbers.length > 1){
            calculate();
        }
        updateDisplay();
    }
}

function calculate(){
    if (equation.numbers.length > 1){
        // perform operation on first and second number store result as first number
        equation.numbers[0] = operate(equation.ops[0], equation.numbers[0], equation.numbers[1]);
        // remove the operation that was just performed
        equation.ops.splice(0,1);
        // remove the 2nd number, the first number is now the result of the operation that was just performed
        equation.numbers.splice(1);
        equation.answer = equation.numbers[0];
        // 14 is the max size that can be displayed
        equation.answer = String(equation.answer).slice(0,14);
        // display first number
        if (equation.numbers[0] === undefined){
            equation.answer = 'tsk tsk tsk';
            equation.numbers = [];
        }
        updateDisplay();
    } 
}