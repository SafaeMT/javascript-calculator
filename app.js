let screen = document.querySelector('.screen');

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function (e) {
        if (Number.isInteger(parseInt(e.target.innerText))) {
            if (parseInt(screen.innerText) != 0) {
                screen.innerText = screen.innerText + e.target.innerText;
            } else {
                screen.innerText = e.target.innerText;
            }
        } else {
            switch (e.target.innerText) {
                case 'C':
                    reset();
                    break;
                case '←':
                    deleteLastDigit();
                    break;
            }
        }
    });
});

function reset() {
    screen.innerText = '0';
}

function deleteLastDigit() {
    if (screen.innerText.length == 1) {
        screen.innerText = 0;
    } else {
        screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1);
    }
}