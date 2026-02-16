document.addEventListener('DOMContentLoaded', function() {
    console.log('ТОО "ОВЕРКОМ" — Визуальное обновление активировано');

    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initScrollReveal();
    initFormValidation();
    initNavHighlight();
});

/**
 * 1. Мобильное меню (Бургер)
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        // Меняем иконку с баров на крестик
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Закрываем меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const icon = toggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

/**
 * 2. Эффекты шапки при скролле
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(26, 42, 58, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(26, 42, 58, 0.95)';
        }
    });
}

/**
 * 3. Плавный скролл к секциям
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 4. Анимация появления блоков при скролле (Scroll Reveal)
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем к карточкам и секциям
    const animatedElements = document.querySelectorAll('.service-card, .section-header, .about-grid, .stat-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

/**
 * 5. Валидация формы
 */
function initFormValidation() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isFormValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (isFormValid) {
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.textContent = 'Отправка...';

            setTimeout(() => {
                alert('Благодарим за обращение! Наши специалисты свяжутся с вами в ближайшее время.');
                form.reset();
                btn.disabled = false;
                btn.textContent = originalText;
            }, 1500);
        }
    });
}

/**
 * 6. Подсветка активного пункта меню
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}