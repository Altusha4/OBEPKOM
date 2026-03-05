document.addEventListener('DOMContentLoaded', function() {
    console.log('%c ТОО "ОВЕРКОМ" %c Система инициализирована ', 'background: #e63946; color: #fff; padding: 5px;', 'background: #0f1113; color: #fff; padding: 5px;');

    hideLoader();
    initTheme();
    initModal();
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initScrollReveal();
    initStatsCounter();
    initFormValidation();
    initNavHighlight();
    initHeroParallax();
});

function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const isLoaded = sessionStorage.getItem('firstLoadDone');

    if (isLoaded) {
        loader.style.display = 'none';
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                sessionStorage.setItem('firstLoadDone', 'true');
            }, 1000);
        });
    }
}

function initTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', theme);
    });
}

function initModal() {
    const modal = document.getElementById('callbackModal');
    const triggers = document.querySelectorAll('.phone-modal-trigger');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal) return;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    window.onclick = (e) => { if (e.target == modal) closeModal(); };
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

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
    if (!header) return;
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
            if (targetId === '#' || this.classList.contains('phone-modal-trigger')) return;

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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.service-card, .section-header, .about-grid, .eq-card, .gallery-item, .legal-info-box, .service-detail-card');
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
        if (sectionPos < window.innerHeight && !started) {
            startCounter();
            started = true;
        }
    });
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ОТПРАВКА...';

            setTimeout(() => {
                const oldBg = btn.style.backgroundColor;
                btn.style.backgroundColor = '#27ae60';
                btn.innerHTML = '<i class="fas fa-check"></i> УСПЕШНО';

                setTimeout(() => {
                    form.reset();
                    btn.disabled = false;
                    btn.style.backgroundColor = oldBg;
                    btn.innerHTML = originalText;
                    const modal = document.getElementById('callbackModal');
                    if (modal && modal.style.display === 'block') {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                }, 2500);
            }, 1500);
        });
    });
}

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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