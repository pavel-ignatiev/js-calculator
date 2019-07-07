// use session storage if supported, an usual JS object otherwise
let storage = (sessionStorage) ? sessionStorage : {};

// reduce digits nuber after decimal point and append currency symbol
const formatValue = (value) => {
    return `${value.toFixed(2)} €`;
};

// calculate future investment value based on user input
const calculateFutureValue = function () {
    // load values from storage
    const investmentDuration = Number(storage.investmentDuration) || 0;
    const interestRate = Number(storage.interestRate) || 0;
    const inflation = Number(storage.inflation) || 0;
    const additionalContribution = Number(storage.additionalContribution) || 0;

    let futureValue = Number(storage.initialValue);

    // the loop representation is more readable for a layperson
    // the usual future value formula can be used here too of course
    // futureValue = initialValue * Math.pow(1 + interestRate, investmentDuration) + 
    //               + additionalContribution * (1 + interestRate) * (Math.pow(1 + interestRate, investmentDuration) - 1) / interestRate
    for (let i = 1; i <= investmentDuration; i++) {
        // calculate interest
        futureValue += futureValue * interestRate / 100.0;
        // take inflation into account
        futureValue -= futureValue * inflation / 100.0;
        // additional contribution is made at the end of the year
        futureValue += additionalContribution;
    }

    storage.futureValue = futureValue;

    return futureValue;
};

const getFormattedFutureValue = () => formatValue(calculateFutureValue());

const toggleErrorMsg = (msgContainer, currentInput, fields) => {
    // this is a hack to ensure that the error message is shown
    // even if the invalid input has lost focus
    // of course there are better ways to handle this problem
    let allFieldsValid = true;
    for (let key in fields) {
        if (!fields[key].checkValidity()) {
            allFieldsValid = false;
        }
    }
    if (!currentInput.checkValidity()) {
        msgContainer.classList.remove('invisible');
        msgContainer.innerHTML = currentInput.validationMessage;
    } else {
        if (allFieldsValid) {
            msgContainer.classList.add('invisible');
            msgContainer.innerHTML = '';
        }
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    // form field representation
    const fields = {
        initialValue: document.getElementById('initial-value'),
        investmentDuration: document.getElementById('investment-duration'),
        interestRate: document.getElementById('interest-rate'),
        additionalContribution: document.getElementById('additional-contribution'),
        inflation: document.getElementById('inflation'),
    };

    const futureValue = document.getElementById('future-value');
    const errorMsg = document.getElementById('error-msg');

    for (let inputName in fields) {
        const currentInput = fields[inputName];

        if (storage[inputName]) {
            // show existing values from session storage
            currentInput.value = storage[inputName];
        } else {
            // form contains default values, save them into storage
            storage[inputName] = currentInput.value;
        }

        // listen to user input (manual or up/down button clicks)
        currentInput.oninput = function () {
            // store the new input
            storage[inputName] = currentInput.value;
            // show recalculated output
            futureValue.innerHTML = getFormattedFutureValue();
            // show error message on invalid input
            toggleErrorMsg(errorMsg, currentInput, fields);
        };
    }

    // calculate future value from default input values 
    futureValue.innerHTML = getFormattedFutureValue();
});