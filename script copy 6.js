document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const keys = document.querySelectorAll('.keys button');

    keys.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'C') {
                display.value = '';
            } else if (button.textContent === '=') {
                try {
                    display.value = eval(display.value);
                } catch (e) {
                    display.value = 'Error';
                    setTimeout(() => { display.value = ''; }, 2000);
                }
            } else {
                display.value += button.textContent;
            }
        });
    });
});
