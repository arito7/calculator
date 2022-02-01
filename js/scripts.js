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
    dot: '.',
    altDiv: '/',
    altMult: '*',
    enter: 'Enter',
    backspace: 'Backspace',
    delete: 'Delete',
    includes:function(val){
        for (const property in this){
            if (val === this[property]){
                return true;
            }
        }
    },
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

function deleteInput(){
    if(equation.getEquation() !== ''){
        if (equation.number !== ''){
            equation.number = equation.number.slice(0,-1);
        } else if (equation.ops.length !== 0){
            equation.ops.pop();
            equation.number = String(equation.numbers[0]);
            equation.numbers = [];
        }
        updateDisplay();
    }
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
    btn.addEventListener('click', e =>{
        numberInput(e.target.textContent)
    });
}

function numberInput(number){
    if(number === operators.dot){
        if (equation.number.includes(operators.dot)){
            return;
        }
    }
    equation.number += number;
    updateDisplay();
}

/**
 * KEYBOARD INPUT
 */
document.addEventListener('keydown', e =>{
    if (!isNaN(parseInt(e.key)) || e.key === operators.dot){
        numberInput(e.key);
    } else if (operators.includes(e.key)){
        let k = e.key;
        switch (k) {
            case operators.altMult:
                k = operators.mult;
                break;
            case operators.altDiv:
                k = operators.div;
                break;
            case operators.enter:
                k = operators.equals;
                break;
            case operators.delete:
                clearDisplay();
                return;
            case operators.backspace:
                deleteInput();
                return;
        }
        operation(k);
    }
    console.log(e.key)
});

/**
 * OPERATOR CLICK
 */
for (let btn of btnOps){
    btn.addEventListener('click', e => {
        operation(e.target.textContent);
    });
}
function operation(inputOp){
    // prevent equals input on invalid equations
    if (inputOp === operators.equals && equation.numbers.length === 0){
        return;
    }
    // this check is to ignore any operational inputs when the
    // equation is empty
    if (equation.number != ''){
        equation.pushNumber();  
        equation.pushOp(inputOp);
        if (equation.numbers.length > 1){
            calculate();
        }
        updateDisplay();
    }
    if (inputOp === operators.equals){
        equation.reset();
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
        equation.answer = parseFloat(equation.answer.toFixed(13));
        // 14 is the max size that can be displayed
        // equation.answer = String(equation.answer).slice(0,14);
        // display first number
        if (equation.numbers[0] === undefined){
            equation.answer = 'tsk tsk tsk';
            equation.numbers = [];
        }
        updateDisplay();
    } 
}