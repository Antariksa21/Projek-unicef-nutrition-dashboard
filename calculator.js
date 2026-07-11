// Calculator state
let currentInput = '0';
let previousInput = '';
let selectedOperator = null;
let isCalculated = false;

// DOM Elements
const inputDisplay = document.getElementById('input-display');
const historyDisplay = document.getElementById('history-display');
const buttons = document.querySelectorAll('.btn');

// Operator display mappings
const OPERATOR_SYMBOLS = {
    'add': '+',
    'subtract': '−',
    'multiply': '×',
    'divide': '÷'
};

// Safe calculation function
function performMath(a, b, op) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return '0';
    
    switch (op) {
        case 'add':
            return String(numA + numB);
        case 'subtract':
            return String(numA - numB);
        case 'multiply':
            return String(numA * numB);
        case 'divide':
            if (numB === 0) return 'Error';
            return String(numA / numB);
        default:
            return b;
    }
}

// Format numbers for display (fixes float precision and handles scientific notation)
function formatDisplayNumber(numStr) {
    if (numStr === 'Error') return 'Error';
    const num = parseFloat(numStr);
    if (isNaN(num)) return numStr;

    // Fix float precision anomalies (e.g. 0.1 + 0.2 = 0.3)
    const rounded = Number(num.toFixed(10));
    
    // Use scientific notation for extremely large or small numbers
    if (Math.abs(rounded) > 999999999999 || (Math.abs(rounded) < 0.000001 && rounded !== 0)) {
        return rounded.toExponential(5);
    }
    
    // Add commas to separate thousands (only for the integer part)
    const parts = String(rounded).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// Update the displays
function updateDisplay() {
    inputDisplay.textContent = formatDisplayNumber(currentInput);
    
    if (selectedOperator) {
        historyDisplay.textContent = `${formatDisplayNumber(previousInput)} ${OPERATOR_SYMBOLS[selectedOperator]}`;
    } else {
        historyDisplay.textContent = '';
    }
}

// Clear all calculator states
function clearAll() {
    currentInput = '0';
    previousInput = '';
    selectedOperator = null;
    isCalculated = false;
    updateDisplay();
}

// Handle action buttons
function handleAction(action) {
    switch (action) {
        case 'clear':
            clearAll();
            break;
            
        case 'backspace':
            if (isCalculated) {
                clearAll();
            } else if (currentInput !== '0') {
                if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
                    currentInput = '0';
                } else {
                    currentInput = currentInput.slice(0, -1);
                }
                updateDisplay();
            }
            break;
            
        case 'percentage':
            if (currentInput !== 'Error') {
                currentInput = String(parseFloat(currentInput) / 100);
                updateDisplay();
            }
            break;
            
        case 'toggle-sign':
            if (currentInput !== '0' && currentInput !== 'Error') {
                if (currentInput.startsWith('-')) {
                    currentInput = currentInput.slice(1);
                } else {
                    currentInput = '-' + currentInput;
                }
                updateDisplay();
            }
            break;
            
        case 'decimal':
            if (isCalculated) {
                currentInput = '0.';
                isCalculated = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            updateDisplay();
            break;
    }
}

// Handle number keys
function handleNumber(num) {
    if (isCalculated) {
        currentInput = num;
        isCalculated = false;
    } else {
        if (currentInput === '0') {
            currentInput = num;
        } else {
            // Cap character length to avoid display breaks
            if (currentInput.replace(/[.,-]/g, '').length < 12) {
                currentInput += num;
            }
        }
    }
    updateDisplay();
}

// Handle operators
function handleOperator(op) {
    if (currentInput === 'Error') return;

    if (selectedOperator && currentInput !== '') {
        // If an operator was already selected, calculate first
        const result = performMath(previousInput, currentInput, selectedOperator);
        previousInput = result;
        currentInput = '0';
        selectedOperator = op;
        isCalculated = false;
    } else {
        previousInput = currentInput;
        currentInput = '0';
        selectedOperator = op;
    }
    updateDisplay();
}

// Perform equal evaluation
function handleEquals() {
    if (!selectedOperator || currentInput === 'Error') return;
    
    // Save history expression
    const exprHistory = `${formatDisplayNumber(previousInput)} ${OPERATOR_SYMBOLS[selectedOperator]} ${formatDisplayNumber(currentInput)} =`;
    
    const result = performMath(previousInput, currentInput, selectedOperator);
    
    currentInput = result;
    previousInput = '';
    selectedOperator = null;
    isCalculated = true;
    
    updateDisplay();
    // Overwrite history display to show full evaluated expression
    historyDisplay.textContent = exprHistory;
}

// Handle button presses
function processInput(keyType, value) {
    if (keyType === 'num-btn' || !isNaN(value)) {
        handleNumber(value);
    } else if (keyType === 'operator-btn') {
        handleOperator(value);
    } else if (value === 'equals') {
        handleEquals();
    } else {
        handleAction(value);
    }
}

// Add Event Listeners for click on UI buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        let keyType = 'num-btn';
        if (button.classList.contains('operator-btn')) keyType = 'operator-btn';
        if (button.classList.contains('action-btn') || button.classList.contains('equals-btn')) keyType = 'action-btn';
        
        processInput(keyType, key);
    });
});

// Keyboard Mapping
const KEYBOARD_MAP = {
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
    '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    '.': 'decimal', ',': 'decimal',
    '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide',
    'Enter': 'equals', '=': 'equals',
    'Backspace': 'backspace',
    'Escape': 'clear', 'c': 'clear', 'C': 'clear',
    '%': 'percentage'
};

// Listen to physical keyboard events
window.addEventListener('keydown', (e) => {
    const mappedKey = KEYBOARD_MAP[e.key];
    if (!mappedKey) return;
    
    e.preventDefault();
    
    // Trigger visual hover/active feedback on matching button
    const targetButton = document.querySelector(`.btn[data-key="${mappedKey}"]`);
    if (targetButton) {
        targetButton.classList.add('keyboard-active');
        setTimeout(() => {
            targetButton.classList.remove('keyboard-active');
        }, 100);
        
        // Trigger click event dynamically
        targetButton.click();
    }
});
