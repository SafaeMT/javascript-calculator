let screen = document.querySelector('.screen');

const MAX_DISPLAY_LENGTH = 14;
let firstArgument, secondArgument;
let operator;

// Utilisation d'un seul event listener qui tire profit de la propagation des évènements
document.querySelector('.buttons').addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        switch (e.target.innerText) {
            case 'C':
                reset();
                break;

            case '←':
                deleteLastDigit();
                break;

            case '=':
                calculateResult();
                break;

            case '+':
            case '−':
            case '×':
            case '÷':
                updateState(e.target.innerText);
                break;

            default:
                addDigit(e.target.innerText);
                break;
        }
    }
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

function updateState(operatorText) {
    if (firstArgument != undefined && secondArgument != undefined && operator != undefined) {
        firstArgument = calculateResult();
        secondArgument = undefined;
        operator = operatorText;
    } else if (firstArgument != undefined) {
        operator = operatorText;
    }
}

function resetState() {
    firstArgument = secondArgument = operator = undefined;
}

function addDigit(digitText) {
    switch (operator) {
        case undefined:
            if (firstArgument == undefined) {
                screen.innerText = digitText;
            } else {
                screen.innerText = Number(screen.innerText + digitText);
            }

            firstArgument = parseInt(screen.innerText);
            break;

        default:
            if (secondArgument == undefined) {
                screen.innerText = digitText;
            } else {
                screen.innerText = Number(screen.innerText + digitText);
            }

            secondArgument = parseInt(screen.innerText);
            break;
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
    if (secondArgument == undefined) {
        return;
    }

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
            let result = divide(firstArgument, secondArgument);
            if (!Number.isInteger(result)) {
                result = formatDecimalNumber(result);
            }

            screen.innerText = result;
            break;
    }

    resetState();
    return parseInt(screen.innerText);
}

function formatDecimalNumber(decimalNumber) {
    const decimalNumberPartsArr = String(decimalNumber).split('.'); // [integerPart, decimalPart]
    let availableLength = MAX_DISPLAY_LENGTH - decimalNumberPartsArr[0].length;

    if (decimalNumberPartsArr[1].length <= availableLength) {
        return decimalNumber;
    }

    return decimalNumber.toFixed(availableLength);
}