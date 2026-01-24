document.addEventListener('DOMContentLoaded', function() {
    console.log('ТОО "ОВЕРКОМ" website loaded successfully');

    initSmoothScroll();
    initFormValidation();
    initNavHighlight();
    initSearchFunctionality();
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
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Пожалуйста, введите ваш email');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            alert('Спасибо! Ваше сообщение отправлено.\n\n(В реальном проекте форма будет подключена к бекенду)');

            this.reset();
        }
    });
}
function showError(inputElement, message) {
    clearError(inputElement);

    inputElement.classList.add('error');

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
}
function clearError(inputElement) {
    inputElement.classList.remove('error');

    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.className === 'error-message') {
        errorElement.remove();
    }
}

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;

            if (scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (!searchInput || !searchButton) return;

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert('Пожалуйста, введите поисковый запрос');
        return;
    }

    const mainContent = document.querySelector('.main-content');
    const sections = mainContent.querySelectorAll('section');
    let foundMatches = false;
    let matchCount = 0;

    sections.forEach(section => {
        const textContent = section.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
            foundMatches = true;
            matchCount++;

            section.style.boxShadow = '0 0 0 2px #3498db';
            setTimeout(() => {
                section.style.boxShadow = '';
            }, 2000);
        }
    });

    if (foundMatches) {
        alert(`Найдено ${matchCount} раздел(ов) содержащих "${searchTerm}"`);
    } else {
        alert(`По запросу "${searchTerm}" ничего не найдено`);
    }
}