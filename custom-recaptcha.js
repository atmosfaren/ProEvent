// custom-recaptcha.js

// Function to validate reCAPTCHA before form submission
function validateRecaptcha(form) {
    const recaptchaResponse = form.querySelector('[name="g-recaptcha-response"]').value;

    if (!recaptchaResponse) {
        alert('Please complete the reCAPTCHA verification.');
        return false;
    }

    return true;
}

// Attach the validation function to all forms
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            if (!validateRecaptcha(form)) {
                event.preventDefault();
            }
        });
    });
});
