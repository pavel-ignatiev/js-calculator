window.addEventListener('DOMContentLoaded', (event) => {
    const alertBox = document.getElementById('container-alert');
    const closeButton = document.getElementById('alert-close-button');

    // this won't work if session storage is not available
    if (sessionStorage) {
        const state = sessionStorage.getItem('alertDismissed');
        // hide alert if shown before
        if (state === 'true') {
            alertBox.classList.add('d-none');
        }

        // add listener for close button
        closeButton.onclick = function () {
            sessionStorage.alertDismissed = true;
        };
    }
});