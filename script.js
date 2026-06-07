/**
 * Tip Calculator - Vanilla JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // PHASE 1 – Event Handling & Element Selection

    // Select DOM elements
    const tipForm = document.getElementById('tip-form');
    const billAmountInput = document.getElementById('bill-amount');
    const tipPercentageSelect = document.getElementById('tip-percentage');
    const numberOfPeopleInput = document.getElementById('number-of-people');
    const resultContainer = document.getElementById('result');

    // Attach submit event listener to the form (handles button click as well as 'Enter' key press)
    tipForm.addEventListener('submit', (event) => {
        // Prevent default form submission behavior
        event.preventDefault();

        // PHASE 2 & 3 – DOM Extraction, Validation and Calculations

        // 1. Read raw values
        const rawBillAmount = billAmountInput.value;
        const rawTipPercentage = tipPercentageSelect.value;
        const rawNumberOfPeople = numberOfPeopleInput.value;

        // 2. Validation
        // Check if values are blank
        if (rawBillAmount.trim() === '' || rawNumberOfPeople.trim() === '') {
            showError('Please fill out all fields.');
            return; // Stop calculation
        }

        // Convert values to proper numeric types
        const billAmount = parseFloat(rawBillAmount);
        const tipPercentage = parseFloat(rawTipPercentage);
        const numberOfPeople = parseInt(rawNumberOfPeople, 10);

        // Check for invalid numbers (zero or negative where not allowed)
        if (isNaN(billAmount) || billAmount <= 0) {
            showError('Bill Amount must be greater than zero.');
            return;
        }

        if (isNaN(numberOfPeople) || numberOfPeople <= 0) {
            showError('Number of People must be at least 1.');
            return;
        }

        // 3. Calculations
        // Calculate the tip amount
        const tipAmount = billAmount * (tipPercentage / 100);

        // Calculate the grand total
        const grandTotal = billAmount + tipAmount;

        // Calculate amount per person
        const amountPerPerson = grandTotal / numberOfPeople;

        // 4. DOM Updates
        // Render successful results
        showResults(tipAmount, grandTotal, amountPerPerson);
    });

    /**
     * Helper function to display error messages
     * @param {string} message - The error message to display
     */
    function showError(message) {
        resultContainer.innerHTML = `
            <div class="error-message">
                ${message}
            </div>
        `;
    }

    /**
     * Helper function to display calculation results
     * @param {number} tip - Total tip amount
     * @param {number} total - Grand total
     * @param {number} perPerson - Amount per person
     */
    function showResults(tip, total, perPerson) {
        // Use template literals to construct HTML with formatted numbers (.toFixed(2))
        resultContainer.innerHTML = `
            <div class="success-result">
                <div class="result-row">
                    <span class="label">Total Tip:</span>
                    <span class="value">$${tip.toFixed(2)}</span>
                </div>
                <div class="result-row">
                    <span class="label">Grand Total:</span>
                    <span class="value">$${total.toFixed(2)}</span>
                </div>
                <div class="result-row">
                    <span class="label">Per Person:</span>
                    <span class="value">$${perPerson.toFixed(2)}</span>
                </div>
            </div>
        `;
    }
});
