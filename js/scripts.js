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