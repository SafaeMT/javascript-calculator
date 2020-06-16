let screen = document.querySelector('.screen');

let firstArgument, secondArgument;
let operator;

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function (e) {
        if (Number.isInteger(parseInt(e.target.innerText))) {
            switch (operator) {
                case undefined:
                    if (firstArgument == undefined) {
                        screen.innerText = e.target.innerText;
                    } else {
                        screen.innerText = screen.innerText + e.target.innerText;
                    }

                    firstArgument = parseInt(screen.innerText);
                    break;

                default:
                    if (secondArgument == undefined) {
                        screen.innerText = e.target.innerText;
                    } else {
                        screen.innerText = screen.innerText + e.target.innerText;
                    }

                    secondArgument = parseInt(screen.innerText);
                    break;
            }
        } else {
            switch (e.target.innerText) {
                case 'C':
                    reset();
                    break;

                case '←':
                    deleteLastDigit();
                    break;

                case '=':
                    if (firstArgument != undefined && secondArgument != undefined && operator != undefined) {
                        calculateResult();
                        firstArgument = secondArgument = operator = undefined;
                    }
                    break;

                default:
                    if (firstArgument != undefined && secondArgument != undefined && operator != undefined) {
                        firstArgument = calculateResult();
                        secondArgument = undefined;
                        operator = e.target.innerText;
                    } else if (firstArgument != undefined) {
                        operator = e.target.innerText;
                    }
                    break;
            }
        }
    });
});

function reset() {
    screen.innerText = '0';
    firstArgument = secondArgument = operator = undefined;
}

function deleteLastDigit() {
    if (screen.innerText.length == 1) {
        screen.innerText = 0;
    } else {
        screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1);
    }

    // Réinitialisation de l'opérateur si le second argument = undefined
    // et que le nombre affiché à l'écran est modifié
    if (operator != undefined && secondArgument == undefined) {
        operator = undefined;
    }

    if (operator == undefined) {
        firstArgument = parseInt(screen.innerText);
    } else {
        secondArgument = parseInt(screen.innerText);
    }
}

function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function calculateResult() {
    switch (operator) {
        case '+':
            screen.innerText = add(firstArgument, secondArgument);
            break;

        case '−':
            screen.innerText = substract(firstArgument, secondArgument);
            break;
                
        case '×':
            screen.innerText = multiply(firstArgument, secondArgument);
            break;

        case '÷':
            screen.innerText = (divide(firstArgument, secondArgument)).toFixed(3);
            break;
    }

    return parseInt(screen.innerText);
}
