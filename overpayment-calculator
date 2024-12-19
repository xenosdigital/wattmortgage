document.addEventListener("DOMContentLoaded", function () {
    // Inputs
    const mortgageBalanceInput = document.getElementById("mortgage-balance");
    const interestRateInput = document.getElementById("interest-rate");
    const remainingTermInput = document.getElementById("remaining-term");
    const overpaymentInput = document.getElementById("overpayment");

    // Outputs
    const currentMonthlyPaymentOutput = document.getElementById("current-monthly-payment");
    const currentTotalCostOutput = document.getElementById("current-total-cost");
    const currentRemainingTermOutput = document.getElementById("current-remaining-term");
    const newMonthlyPaymentOutput = document.getElementById("new-monthly-payment");
    const newTotalCostOutput = document.getElementById("new-total-cost");
    const newRemainingTermOutput = document.getElementById("new-remaining-term");
    const totalSavingsOutput = document.getElementById("total-savings");
    const totalTimeSavedOutput = document.getElementById("total-time-saved");

    let updateTimeout;

    // Format currency for inputs
    function formatCurrency(input) {
        let value = input.value.replace(/[^\d]/g, "");
        if (value) {
            value = parseFloat(value).toLocaleString("en-GB", {
                style: "currency",
                currency: "GBP",
                minimumFractionDigits: 0
            });
        }
        input.value = value;
    }

    // Format interest rate to include %
    interestRateInput.addEventListener("focus", function () {
        interestRateInput.value = interestRateInput.value.replace("%", "");
    });

    interestRateInput.addEventListener("blur", function () {
        if (interestRateInput.value && !interestRateInput.value.includes("%")) {
            interestRateInput.value = interestRateInput.value + "%";
        }
    });

    // Restrict numeric input
    interestRateInput.addEventListener("input", function () {
        interestRateInput.value = interestRateInput.value.replace(/[^\d.]/g, "");
    });

    // Format remaining term to "years"
    function formatYears(input) {
        let value = input.value.replace(/[^\d]/g, "");
        if (value) {
            value = `${parseInt(value)} years`;
        }
        input.value = value;
    }

    // Update calculations
    function updateCalculations() {
        clearTimeout(updateTimeout);

        updateTimeout = setTimeout(() => {
            const mortgageBalance = parseFloat(mortgageBalanceInput.value.replace(/[^0-9.-]+/g, "")) || 0;
            const interestRate = parseFloat(interestRateInput.value.replace(/[^0-9.-]+/g, "")) || 0;
            const remainingTerm = parseInt(remainingTermInput.value.replace(/[^\d]/g, "")) || 0;
            const overpayment = parseFloat(overpaymentInput.value.replace(/[^0-9.-]+/g, "")) || 0;

            if (!mortgageBalance || !interestRate || !remainingTerm) {
                displayResults("-", "-", "-", "-", "-", "-", "-", "-");
                return;
            }

            const monthlyRate = (interestRate / 100) / 12;
            const numPayments = remainingTerm * 12;

            // Current values
            const currentMonthlyPayment = mortgageBalance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
            const currentTotalCost = currentMonthlyPayment * numPayments;
            const currentRemainingTerm = remainingTerm;

            // Handle no overpayment scenario
            if (overpayment === 0) {
                displayResults(
                    formatCurrencyValue(currentMonthlyPayment),
                    formatCurrencyValue(currentTotalCost),
                    `${currentRemainingTerm} years`,
                    "-",
                    "-",
                    "-",
                    "-",
                    "-"
                );
                return;
            }

            // New values with overpayment
            let newBalance = mortgageBalance;
            let totalPayments = 0;
            let months = 0;

            while (newBalance > 0 && months < numPayments) {
                const interestPayment = newBalance * monthlyRate;
                const principalPayment = (currentMonthlyPayment + overpayment) - interestPayment;
                newBalance -= principalPayment;
                totalPayments += currentMonthlyPayment + overpayment;
                months++;
            }

            const newTotalCost = totalPayments;
            const newRemainingTerm = Math.floor(months / 12) + ((months % 12) > 0 ? 1 : 0);
            const totalSavings = currentTotalCost - newTotalCost;
            const totalTimeSaved = remainingTerm * 12 - months; // Time saved in months

            displayResults(
                formatCurrencyValue(currentMonthlyPayment),
                formatCurrencyValue(currentTotalCost),
                `${currentRemainingTerm} years`,
                formatCurrencyValue(currentMonthlyPayment + overpayment),
                formatCurrencyValue(newTotalCost),
                `${newRemainingTerm} years`,
                formatCurrencyValue(totalSavings),
                totalTimeSaved
            );
        }, 300);
    }

    // Display results with fade effect
    function displayResults(currentMonthly, currentTotal, currentTerm, newMonthly, newTotal, newTerm, savings, timeSaved) {
        const outputs = [
            currentMonthlyPaymentOutput, currentTotalCostOutput, currentRemainingTermOutput,
            newMonthlyPaymentOutput, newTotalCostOutput, newRemainingTermOutput,
            totalSavingsOutput, totalTimeSavedOutput
        ];

        outputs.forEach(el => {
            el.classList.add("fade-text");
            el.style.opacity = 0;
        });

        setTimeout(() => {
            currentMonthlyPaymentOutput.textContent = currentMonthly;
            currentTotalCostOutput.textContent = currentTotal;
            currentRemainingTermOutput.textContent = currentTerm;

            newMonthlyPaymentOutput.textContent = newMonthly;
            newTotalCostOutput.textContent = newTotal;
            newRemainingTermOutput.textContent = newTerm;
            totalSavingsOutput.textContent = savings;
            totalTimeSavedOutput.textContent = timeSaved === "-" ? "-" : `${Math.floor(timeSaved / 12)} years, ${timeSaved % 12} months`;

            outputs.forEach(el => {
                el.style.opacity = 1;
                el.classList.remove("fade-text");
            });
        }, 200);
    }

    // Format currency values for outputs
    function formatCurrencyValue(value) {
        return `£${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    // Add event listeners
    mortgageBalanceInput.addEventListener("input", function () { formatCurrency(mortgageBalanceInput); updateCalculations(); });
    interestRateInput.addEventListener("input", updateCalculations);
    remainingTermInput.addEventListener("input", function () { formatYears(remainingTermInput); updateCalculations(); });
    overpaymentInput.addEventListener("input", function () { formatCurrency(overpaymentInput); updateCalculations(); });
});
