document.addEventListener('DOMContentLoaded', function() {
    console.log('%c ТОО "ОВЕРКОМ" %c Модуль инициализирован ', 'background: #e63946; color: #fff; padding: 5px;', 'background: #0f1113; color: #fff; padding: 5px;');

    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initScrollReveal();
    initFormValidation();
    initNavHighlight();
    initStatsCounter();
    initHeroParallax();
});

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const icon = toggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 17, 19, 1)';
            header.style.height = '70px';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.backgroundColor = 'rgba(15, 17, 19, 0.98)';
            header.style.height = '80px';
            header.style.boxShadow = 'none';
        }
    });
}

function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        hero.style.backgroundPositionY = scrollValue * 0.5 + 'px';
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
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

function initScrollReveal() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .section-header, .about-grid, .eq-card, .gallery-item, .legal-info-box');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        observer.observe(el);
    });
}

function initStatsCounter() {
    const statsSection = document.querySelector('.stats-bar');
    if (!statsSection) return;

    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    const startCounter = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.innerText);
            let count = 0;
            const speed = 2000 / target;

            const updateCount = () => {
                if (count < target) {
                    count++;
                    counter.innerText = count + (counter.parentElement.innerText.includes('+') ? '+' : '');
                    setTimeout(updateCount, speed);
                } else {
                    counter.innerText = target + (counter.parentElement.innerText.includes('+') ? '+' : '');
                }
            };
            updateCount();
        });
    };

    window.addEventListener('scroll', () => {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;
        if (sectionPos < screenPos && !started) {
            startCounter();
            started = true;
        }
    });
}

function initFormValidation() {
    const form = document.getElementById('feedbackForm') || document.getElementById('careerForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ОТПРАВКА...';

        setTimeout(() => {
            btn.style.backgroundColor = '#27ae60';
            btn.innerHTML = '<i class="fas fa-check"></i> УСПЕШНО ОТПРАВЛЕНО';

            setTimeout(() => {
                form.reset();
                btn.disabled = false;
                btn.style.backgroundColor = '';
                btn.innerHTML = originalText;
            }, 3000);
        }, 1500);
    });
}

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
}