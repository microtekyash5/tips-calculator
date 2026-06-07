/**
 * QuickTip - Offline Tip Calculator
 * Core Logic & DOM Manipulation (Vanilla JavaScript ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // PHASE 1: DOM Elements Selection
    // ==========================================
    const billAmountInput = document.getElementById('bill-amount');
    const tipPercentageSelect = document.getElementById('tip-percentage');
    const peopleCountInput = document.getElementById('people-count');
    const calculateButton = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result');

    // ==========================================
    // PHASE 2: Event Handling
    // ==========================================
    calculateButton.addEventListener('click', (event) => {
        // Prevent form submission behavior
        event.preventDefault();
        
        // Execute calculation flow
        calculateTip();
    });

    // ==========================================
    // Core Logic & Validation Function
    // ==========================================
    function calculateTip() {
        // 1. Get raw string values from inputs
        const billAmountRaw = billAmountInput.value.trim();
        const tipPercentageRaw = tipPercentageSelect.value;
        const peopleCountRaw = peopleCountInput.value.trim();

        // 2. Perform Validation (PHASE 3 checks)
        
        // Check if Bill Amount is blank
        if (billAmountRaw === '') {
            displayError('Invalid Bill Amount', 'Bill amount cannot be left blank. Please enter a valid number.');
            return;
        }

        // Parse numerical values
        const billAmount = parseFloat(billAmountRaw);
        const tipPercentage = parseFloat(tipPercentageRaw);
        const numberOfPeople = parseInt(peopleCountRaw, 10);

        // Check if Bill Amount is less than or equal to zero
        if (isNaN(billAmount) || billAmount <= 0) {
            displayError('Invalid Bill Amount', 'Bill amount must be a positive number greater than zero.');
            return;
        }

        // Check if Number of People is blank
        if (peopleCountRaw === '') {
            displayError('Invalid Number of People', 'Number of people cannot be left blank. Please enter at least 1 person.');
            return;
        }

        // Check if Number of People is zero or negative
        if (numberOfPeople === 0) {
            displayError('Division by Zero', 'Number of people cannot be zero. Bill must be split between at least 1 person.');
            return;
        }

        if (isNaN(numberOfPeople) || numberOfPeople < 1) {
            displayError('Invalid Number of People', 'Number of people must be a positive integer starting from 1.');
            return;
        }

        // ==========================================
        // PHASE 3: Extraction & Calculation 
        // ==========================================
        
        // Math Calculations
        const tipAmount = billAmount * (tipPercentage / 100);
        const grandTotal = billAmount + tipAmount;
        const amountPerPerson = grandTotal / numberOfPeople;

        // Display results dynamically
        displayResults(tipAmount, grandTotal, amountPerPerson);
    }

    /**
     * Renders a clear validation error inside the results container
     */
    function displayError(title, message) {
        resultContainer.innerHTML = `
            <div class="error-alert">
                <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div class="error-content">
                    <h3>${title}</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }

    /**
     * Formats and renders the successful calculations inside the result container
     */
    function displayResults(tipAmount, grandTotal, amountPerPerson) {
        // Format values to exactly 2 decimal places
        const formattedTip = tipAmount.toFixed(2);
        const formattedTotal = grandTotal.toFixed(2);
        const formattedPerPerson = amountPerPerson.toFixed(2);

        // Replace previous results dynamically using template literals
        resultContainer.innerHTML = `
            <div class="results-card">
                <!-- Highlight Hero Split per Person -->
                <div class="per-person-hero">
                    <span class="hero-label">Amount Per Person</span>
                    <span class="hero-value">$${formattedPerPerson}</span>
                </div>
                
                <!-- Breakdown Details -->
                <div class="results-details">
                    <div class="detail-row">
                        <span class="detail-label">Total Tip (${tipPercentageSelect.value}%)</span>
                        <span class="detail-value" id="res-tip-amount">$${formattedTip}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Grand Total</span>
                        <span class="detail-value" id="res-grand-total">$${formattedTotal}</span>
                    </div>
                </div>
            </div>
        `;
    }
});
