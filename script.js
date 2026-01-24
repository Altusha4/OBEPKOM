document.addEventListener('DOMContentLoaded', function() {
    console.log('ТОО "ОВЕРКОМ" website loaded successfully');

    initSmoothScroll();
});

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initFormValidation() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (!feedbackForm) return;

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');

        let isValid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else {
            clearError(nameInput);
        }

    });
}
function showError(inputElement, message) {
    clearError(inputElement);

    inputElement.classList.add('error');

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';

    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
}
function clearError(inputElement) {
    // Remove error class
    inputElement.classList.remove('error');

    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.className === 'error-message') {
        errorElement.remove();
    }
}