document.addEventListener('DOMContentLoaded', function() {
    // Get all rows and their inputs
    const row1 = document.querySelectorAll('#row1 .digit-input');
    const row2 = document.querySelectorAll('#row2 .digit-input');
    const row3 = document.querySelectorAll('#row3 .digit-input');
    const row4 = document.querySelectorAll('#row4 .digit-input');
    const row5 = document.querySelectorAll('#row5 .digit-input');
    const answerRow = document.querySelectorAll('#answer-row .digit-input');
    
    // Initialize mathematical background animation
    initMathBackground();
    
    // Get buttons
    const resetBtn = document.getElementById('reset-btn');
    const instructionsBtn = document.getElementById('instructions-btn');
    const revealTrickBtn = document.getElementById('reveal-trick-btn');
    
    // Get modals
    const instructionsModal = document.getElementById('instructions-modal');
    const trickModal = document.getElementById('trick-modal');
    
    // Get close buttons
    const closeButtons = document.querySelectorAll('.close');
    
    // Initialize game state
    let currentRow = 1;
    
    // Add event listeners to first row inputs
    row1.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Limit to single digit
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
            
            // Auto-move to next input
            if (this.value !== '' && index < row1.length - 1) {
                row1[index + 1].focus();
            }
            
            // Check if row is complete
            if (isRowComplete(row1)) {
                // Calculate and display the answer immediately
                calculateAnswer();
                
                // Enable second row
                enableRow(row2);
                currentRow = 2;
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                row1[index - 1].focus();
            }
        });
    });
    
    // Add event listeners to second row inputs
    row2.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Limit to single digit
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
            
            // Auto-move to next input
            if (this.value !== '' && index < row2.length - 1) {
                row2[index + 1].focus();
            }
            
            // Check if row is complete
            if (isRowComplete(row2)) {
                // Generate third row (system)
                generateSystemRow(row2, row3);
                
                // Enable fourth row
                enableRow(row4);
                currentRow = 4;
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                row2[index - 1].focus();
            }
        });
    });
    
    // Add event listeners to fourth row inputs
    row4.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Limit to single digit
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
            
            // Auto-move to next input
            if (this.value !== '' && index < row4.length - 1) {
                row4[index + 1].focus();
            }
            
            // Check if row is complete
            if (isRowComplete(row4)) {
                // Generate fifth row (system)
                generateSystemRow(row4, row5);
                
                // Game complete - highlight answer
                highlightAnswer();
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                row4[index - 1].focus();
            }
        });
    });
    
    // Reset button event listener
    resetBtn.addEventListener('click', resetGame);
    
    // Instructions button event listener
    instructionsBtn.addEventListener('click', function() {
        instructionsModal.style.display = 'block';
    });
    
    // Reveal trick button event listener - only add if button exists
    if (revealTrickBtn) {
        revealTrickBtn.addEventListener('click', function() {
            trickModal.style.display = 'block';
        });
    }
    
    // Close button event listeners
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest parent modal and hide it
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === instructionsModal) {
            instructionsModal.style.display = 'none';
        }
        if (event.target === trickModal) {
            trickModal.style.display = 'none';
        }
    });
    
    // Helper Functions
    
    // Check if all inputs in a row are filled
    function isRowComplete(rowInputs) {
        return Array.from(rowInputs).every(input => input.value !== '');
    }
    
    // Enable all inputs in a row
    function enableRow(rowInputs) {
        rowInputs.forEach(input => {
            input.disabled = false;
        });
        rowInputs[0].focus();
    }
    
    // Generate system row based on previous row (sum to 9)
    function generateSystemRow(prevRow, systemRow) {
        for (let i = 0; i < prevRow.length; i++) {
            const prevValue = parseInt(prevRow[i].value);
            systemRow[i].value = 9 - prevValue;
        }
    }
    
    // Calculate the answer based on the first row
    function calculateAnswer() {
        // Get values from first row
        const firstRowValues = Array.from(row1).map(input => parseInt(input.value));
        
        // Create answer: 2 + first row digits with last digit - 2
        answerRow[0].value = 2; // Add 2 at the leftmost position
        
        for (let i = 0; i < firstRowValues.length; i++) {
            if (i === firstRowValues.length - 1) {
                // Subtract 2 from the rightmost digit
                answerRow[i + 1].value = (firstRowValues[i] - 2 + 10) % 10; // Add 10 and mod 10 to handle negative numbers
            } else {
                answerRow[i + 1].value = firstRowValues[i];
            }
        }
    }
    
    // Highlight the answer row
    function highlightAnswer() {
        document.getElementById('answer-row').style.backgroundColor = 'rgba(255, 193, 7, 0.4)';
        document.getElementById('answer-row').style.transform = 'scale(1.03)';
        
        // Add pulse animation to answer digits
        Array.from(answerRow).forEach(input => {
            input.style.animation = 'pulse 1s infinite';
        });
    }
    
    // Reset the game
    function resetGame() {
        // Clear all inputs
        const allInputs = document.querySelectorAll('.digit-input');
        allInputs.forEach(input => {
            input.value = '';
            input.disabled = true;
            input.style.animation = '';
        });
        
        // Enable first row
        enableRow(row1);
        
        // Reset answer row styling
        document.getElementById('answer-row').style.backgroundColor = '';
        document.getElementById('answer-row').style.transform = '';
        
        // Reset current row
        currentRow = 1;
    }
    
    // Initialize game
    resetGame();
    
    // Add pulse animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); box-shadow: 0 0 10px rgba(255, 193, 7, 0.7); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Function to initialize the mathematical background animation
    function initMathBackground() {
        const mathBackground = document.getElementById('math-background');
        const mathSymbols = ['+', '-', '×', '÷', '=', '≠', '≈', '∑', '∏', '√', '∛', 'π', '∞', '∫', '∂', '∇', '%', '±', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const numSymbols = 100; // Number of symbols to create
        
        // Create and position math symbols
        for (let i = 0; i < numSymbols; i++) {
            const symbol = document.createElement('div');
            symbol.className = 'math-symbol';
            symbol.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
            
            // Random positioning
            const left = Math.random() * 100; // Random horizontal position (0-100%)
            const size = Math.random() * 2 + 1; // Random size (1-3rem)
            const delay = Math.random() * 15; // Random delay (0-15s)
            const duration = Math.random() * 10 + 10; // Random duration (10-20s)
            const startingPoint = Math.random() * 100; // Random starting point (0-100%)
            
            // Apply styles
            symbol.style.left = `${left}%`;
            symbol.style.fontSize = `${size}rem`;
            symbol.style.animationDelay = `${delay}s`;
            symbol.style.animationDuration = `${duration}s`;
            symbol.style.bottom = `-${startingPoint}%`;
            
            // Add to background
            mathBackground.appendChild(symbol);
        }
    }
});
