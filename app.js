let screen = document.querySelector('.screen');

const MAX_DISPLAY_LENGTH = 14;
let firstArgument = 0;
let secondArgument;
let operator;
let screenValue = 0;

// Utilisation d'un seul event listener qui tire profit de la propagation des évènements
document.querySelector('.buttons').addEventListener('click', handleButtonClick);

function handleButtonClick(e) {
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

        render();
    }
}

function reset() {
    firstArgument = 0;
    secondArgument = operator = undefined;

    updateScreenValue();
}

function deleteLastDigit() {
    if (operator == undefined) {
        firstArgument = Number(String(firstArgument).slice(0, -1));
    } else {
        secondArgument = Number(String(secondArgument).slice(0, -1));
    }

    // Réinitialisation de l'opérateur si le second argument = undefined
    // et que le nombre affiché à l'écran est modifié
    if (secondArgument == undefined) {
        operator = undefined;
    }

    updateScreenValue();
}

function updateState(operatorText) {
    calculateResult();
    operator = operatorText;
}

function addDigit(digitText) {
    if (operator == undefined) {
        firstArgument = Number(firstArgument + digitText);
    } else {
        secondArgument = Number(secondArgument == undefined ? digitText : secondArgument + digitText);
    }

    updateScreenValue();
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
            firstArgument = add(firstArgument, secondArgument);
            break;

        case '−':
            firstArgument = substract(firstArgument, secondArgument);
            break;

        case '×':
            firstArgument = multiply(firstArgument, secondArgument);
            break;

        case '÷':
            firstArgument = divide(firstArgument, secondArgument);
            if (!Number.isInteger(firstArgument)) {
                firstArgument = formatDecimalNumber(firstArgument);
            }
            break;
    }

    secondArgument = operator = undefined;
    updateScreenValue();
}

function formatDecimalNumber(decimalNumber) {
    const decimalNumberPartsArr = String(decimalNumber).split('.'); // [integerPart, decimalPart]
    let availableLength = MAX_DISPLAY_LENGTH - decimalNumberPartsArr[0].length;

    if (decimalNumberPartsArr[1].length <= availableLength) {
        return decimalNumber;
    }

    return decimalNumber.toFixed(availableLength);
}

function updateScreenValue() {
    if (secondArgument == undefined) {
        screenValue = firstArgument;
    } else {
        screenValue = secondArgument;
    }
}

function render() {
    screen.innerText = screenValue;
}