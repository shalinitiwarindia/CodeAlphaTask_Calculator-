let display = document.getElementById('display');
let historyList = [];

function appendNumber(number) {
    if (display.innerText === '0' || display.innerText === 'Error') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

function calculateResult() {
    try {
        let result = display.innerText;
        result = result.replace('^', '**'); // Power operator
        result = result.replace('sqrt(', 'Math.sqrt('); // Square root
        result = result.replace('Math.sin', 'Math.sin'); // Sine function
        result = result.replace('Math.cos', 'Math.cos'); // Cosine function
        result = result.replace('Math.tan', 'Math.tan'); // Tangent function
        display.innerText = eval(result).toString();
        addToHistory(display.innerText); // Save result to history
    } catch (error) {
        display.innerText = 'Error';
    }
}

function clearDisplay() {
    display.innerText = '0';
}

function addToHistory(result) {
    if (historyList.length >= 5) {
        historyList.shift(); // Keep only the last 5 calculations
    }
    historyList.push(result);
    displayHistory();
}

function displayHistory() {
    const historyListElement = document.getElementById('history-list');
    historyListElement.innerHTML = '';
    historyList.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        listItem.onclick = () => {
            display.innerText = entry;
        };
        historyListElement.appendChild(listItem);
    });
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= 0 && key <= 9) {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+') {
        appendNumber('+');
    } else if (key === '-') {
        appendNumber('-');
    } else if (key === '*') {
        appendNumber('*');
    } else if (key === '/') {
        appendNumber('/');
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        clearDisplay();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
