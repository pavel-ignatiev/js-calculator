const storage = sessionStorage;

const calculate = () => {
    let totalAmount = Number(storage.getItem('initialAmount'));
    for (let i = 1; i <= Number(storage.getItem('investmentDuration')); i++) {
        totalAmount += totalAmount * Number(storage.getItem('returnRate')) / 100.0;
        totalAmount -= totalAmount * Number(storage.getItem('inflation')) / 100.0;
    }
    console.log(totalAmount);
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
        currentInput.keyup((event) => {
            storage.setItem(inputName, currentInput.val());
            $('total-value').innerHTML = calculate();
        });
    };

    $("input[name='contribution-frequency']").change((event) => {
        storage.setItem('contributionFrequency', $("input[name='contribution-frequency']:checked").val());
        $('total-value').innerHTML = calculate();
    });

});