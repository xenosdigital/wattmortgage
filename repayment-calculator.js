document.addEventListener("DOMContentLoaded", function () {
    const propertyValueInput = document.getElementById("property-value");
    const depositInput = document.getElementById("deposit");
    const interestRateInput = document.getElementById("interest-rate");
    const termInput = document.getElementById("term");
    const repaymentTypeRadios = document.getElementsByName("repayment-type");

    const monthlyPaymentOutput = document.getElementById("monthly-payment");
    const yearlyPaymentOutput = document.getElementById("yearly-payment");
    const totalCostOutput = document.getElementById("total-cost");

    let updateTimeout;

    // Format currency for property value and deposit inputs
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

    // Format interest rate to include % symbol
    interestRateInput.addEventListener("focus", function() {
        interestRateInput.value = interestRateInput.value.replace("%", "");
    });

    interestRateInput.addEventListener("blur", function() {
        if (interestRateInput.value && !interestRateInput.value.includes("%")) {
            interestRateInput.value = interestRateInput.value + "%";
        }
    });

    // Restrict interest input to numeric values only
    interestRateInput.addEventListener("input", function(e) {
        interestRateInput.value = interestRateInput.value.replace(/[^\d.]/g, "");
    });

    // Format term to include "years"
    function formatYears(input) {
        let value = input.value.replace(/[^\d]/g, "");
        if (value) {
            value = `${parseInt(value)} years`;
        }
        input.value = value;
    }

    // Update calculation values
    function updateCalculations() {
        clearTimeout(updateTimeout);

        updateTimeout = setTimeout(() => {
            const propertyValue = parseFloat(propertyValueInput.value.replace(/[^0-9.-]+/g,"")) || 0;
            const deposit = parseFloat(depositInput.value.replace(/[^0-9.-]+/g,"")) || 0;
            const rate = parseFloat(interestRateInput.value.replace(/[^0-9.-]+/g,"")) || 0;
            const term = parseInt(termInput.value.replace(/[^\d]/g, "")) || 0;
            const repaymentType = Array.from(repaymentTypeRadios).find(radio => radio.checked)?.value;

            if (!propertyValue || !deposit || !rate || !term || deposit >= propertyValue) {
                displayResults("-", "-", "-");
                return;
            }

            const principal = propertyValue - deposit;
            const monthlyRate = (rate / 100) / 12;
            const numPayments = term * 12;

            let monthlyPayment, yearlyPayment, totalCost;

            if (repaymentType === "repayment") {
                // Repayment mortgage calculation
                monthlyPayment = principal * (monthlyRate * (1 + monthlyRate) ** numPayments) / ((1 + monthlyRate) ** numPayments - 1);
                yearlyPayment = monthlyPayment * 12;
                totalCost = monthlyPayment * numPayments;
            } else if (repaymentType === "interest-only") {
                // Interest-only mortgage calculation
                monthlyPayment = principal * monthlyRate;
                yearlyPayment = monthlyPayment * 12;
                const totalInterestPaid = monthlyPayment * numPayments;
                totalCost = totalInterestPaid + principal; // Add unpaid principal to total
            }

            displayResults(
                formatCurrencyValue(monthlyPayment),
                formatCurrencyValue(yearlyPayment),
                formatCurrencyValue(totalCost)
            );
        }, 300);
    }

    // Display results with fade effect
    function displayResults(monthly, yearly, total) {
        [monthlyPaymentOutput, yearlyPaymentOutput, totalCostOutput].forEach(el => {
            el.classList.add("fade-text");
            el.style.opacity = 0;
        });

        setTimeout(() => {
            monthlyPaymentOutput.textContent = monthly;
            yearlyPaymentOutput.textContent = yearly;
            totalCostOutput.textContent = total;

            [monthlyPaymentOutput, yearlyPaymentOutput, totalCostOutput].forEach(el => {
                el.style.opacity = 1;
                el.classList.remove("fade-text");
            });
        }, 200);
    }

    // Format output currency values
    function formatCurrencyValue(value) {
        return `£${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    // Add event listeners
    propertyValueInput.addEventListener("input", function () { formatCurrency(propertyValueInput); updateCalculations(); });
    depositInput.addEventListener("input", function () { formatCurrency(depositInput); updateCalculations(); });
    interestRateInput.addEventListener("input", updateCalculations);
    termInput.addEventListener("input", function () { formatYears(termInput); updateCalculations(); });
    repaymentTypeRadios.forEach(radio => radio.addEventListener("change", updateCalculations));
});
