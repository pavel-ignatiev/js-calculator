// use session storage if supported, usual JS object otherwise
let storage = (sessionStorage) ? sessionStorage : {};

const calculate = () => {
    let totalAmount = Number(storage['initialAmount']);
    const investmentDuration = Number(storage['investmentDuration']);
    const returnRate = Number(storage['returnRate']);
    const inflation = Number(storage['inflation']);
    const additionalContribution = Number(storage['additionalContribution']);

    for (let i = 1; i <= investmentDuration; i++) {
        // assume doing an additional contribution before yielding yearly return and calculating inflation
        totalAmount += additionalContribution;
        totalAmount += totalAmount * returnRate / 100.0;
        totalAmount -= totalAmount * inflation / 100.0;
    }

    return totalAmount;
};

$(document).ready(() => {
    const fields = {
        targetAmount: $('#target-amount'),
        initialAmount: $('#initial-amount'),
        investmentDuration: $('#investment-duration'),
        returnRate: $('#return-rate'),
        additionalContribution: $('#additional-contribution'),
        inflation: $('#inflation'),
    };

    for (let inputName in fields) {
        const currentInput = fields[inputName];
        currentInput.keyup(() => {
            storage[inputName] = currentInput.val();
            $('#total-value').text(calculate());
        });
    };
});