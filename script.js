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
    initCalculator();
    initAdminPanel();
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
        let isDark = document.body.classList.contains('dark-mode');
        icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;

            const name = form.querySelector('input[type="text"]')?.value || 'Аноним';
            const date = new Date().toLocaleString();

            // Проверка типа формы по ID
            if (form.id === 'careerForm') {
                const email = form.querySelector('input[type="email"]')?.value || 'Не указан';
                const vacancy = form.querySelector('select')?.value || 'Не выбрана';

                const careerEntries = JSON.parse(localStorage.getItem('overcom_cv') || '[]');
                careerEntries.push({ date, name, email, vacancy });
                localStorage.setItem('overcom_cv', JSON.stringify(careerEntries));
            } else {
                const phone = form.querySelector('input[type="tel"]')?.value || 'Не указан';
                const leadsEntries = JSON.parse(localStorage.getItem('overcom_leads') || '[]');
                leadsEntries.push({ date, name, phone });
                localStorage.setItem('overcom_leads', JSON.stringify(leadsEntries));
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> СОХРАНЕНИЕ...';

            setTimeout(() => {
                btn.style.backgroundColor = '#27ae60';
                btn.innerHTML = '<i class="fas fa-check"></i> УСПЕШНО';
                setTimeout(() => {
                    form.reset();
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.innerHTML = originalText;
                    const modal = document.getElementById('callbackModal');
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                }, 1500);
            }, 1000);
        });
    });
}

function downloadCSV(type) {
    let data, filename, header;

    if (type === 'leads') {
        data = JSON.parse(localStorage.getItem('overcom_leads') || '[]');
        filename = `Leads_Clients_${new Date().toLocaleDateString()}`;
        header = "Дата;Имя;Телефон\n";
    } else {
        data = JSON.parse(localStorage.getItem('overcom_cv') || '[]');
        filename = `HR_Candidates_${new Date().toLocaleDateString()}`;
        header = "Дата;ФИО Кандидата;Email;Вакансия\n";
    }

    if (data.length === 0) {
        alert('База данных пуста!');
        return;
    }

    let csvContent = "\uFEFF" + header;
    data.forEach(item => {
        csvContent += type === 'leads'
            ? `${item.date};${item.name};${item.phone}\n`
            : `${item.date};${item.name};${item.email};${item.vacancy}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${filename}.csv`);
    link.click();
}

function initAdminPanel() {
    const adminBtn = document.getElementById('admin-login');
    if (!adminBtn) return;

    adminBtn.addEventListener('click', () => {
        const pass = prompt("Введите инженерный ключ доступа:");
        if (pass === "OVERCOM2026") {
            const mode = prompt("Выберите действие:\n1 - Скачать заявки клиентов (Leads)\n2 - Скачать анкеты кандидатов (HR)");
            if (mode === "1") downloadCSV('leads');
            else if (mode === "2") downloadCSV('cv');
        } else if (pass !== null) {
            alert("Ошибка доступа: Неверный ключ.");
        }
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 17, 19, 1)';
            header.style.height = '70px';
        } else {
            header.style.backgroundColor = 'rgba(15, 17, 19, 0.98)';
            header.style.height = '80px';
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const tid = this.getAttribute('href');
            if (tid === '#' || this.classList.contains('phone-modal-trigger')) return;
            e.preventDefault();
            const target = document.querySelector(tid);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
}

function initScrollReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .section-header, .about-grid, .eq-card, .service-detail-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        obs.observe(el);
    });
}

function initStatsCounter() {
    const sec = document.querySelector('.stats-bar');
    if (!sec) return;
    let started = false;

    window.addEventListener('scroll', () => {
        if (sec.getBoundingClientRect().top < window.innerHeight && !started) {
            document.querySelectorAll('.stat-number').forEach(counter => {
                const target = parseInt(counter.innerText);
                let curr = 0;
                const update = () => {
                    if (curr < target) {
                        curr += Math.ceil(target / 100);
                        counter.innerText = (curr > target ? target : curr) + (counter.parentElement.innerText.includes('+') ? '+' : '');
                        setTimeout(update, 20);
                    }
                };
                update();
            });
            started = true;
        }
    });
}

function initNavHighlight() {
    const secs = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-menu a');
    window.addEventListener('scroll', () => {
        let cur = '';
        secs.forEach(s => { if (window.scrollY >= (s.offsetTop - 150)) cur = s.getAttribute('id'); });
        links.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href').includes(cur) && cur !== '') l.classList.add('active');
        });
    });
}

function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (hero) window.addEventListener('scroll', () => { hero.style.backgroundPositionY = window.scrollY * 0.5 + 'px'; });
}

function initCalculator() {
    const r = document.getElementById('rock-type'), d = document.getElementById('depth'), res = document.getElementById('total-price');
    if (!r || !d || !res) return;
    const calc = () => {
        const total = (parseInt(r.value) * (parseInt(d.value) || 0));
        res.innerText = total.toLocaleString('ru-RU');
    };
    r.onchange = calc; d.oninput = calc; calc();
}