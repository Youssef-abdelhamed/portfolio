// ==========================================================
// 1. Theme Toggle + حفظ التفضيل + أيقونة متغيّرة
// ==========================================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateNavbarOnScroll();
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ==========================================================
// 2. Navbar خلفية ديناميكية حسب الثيم + Scroll
// ==========================================================
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const isDark = body.getAttribute('data-theme') === 'dark';
    const scrollY = window.scrollY;

    navbar.style.background = scrollY > 50
        ? (isDark ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)')
        : (isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)');
}

window.addEventListener('scroll', updateNavbarOnScroll);
window.addEventListener('load', updateNavbarOnScroll);

// ==========================================================
// 3. Mobile Menu (فتح/غلق + أيقونة)
// ==========================================================
const mobileBtn = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        const icon = mobileBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            const icon = mobileBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ==========================================================
// 4. Skill Bars Animation على الـ Scroll
// ==========================================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.transition = 'width 1s ease';
            bar.style.width = width + '%';
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
});

// ==========================================================
// 5. Fade-in + Slide-up لأي عنصر
// ==========================================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.new-content, .timeline-item, .certification-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    fadeObserver.observe(el);
});

// ==========================================================
// 6. Smooth Scrolling للروابط الداخلية
// ==========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ==========================================================
// 7. Back-to-Top Button
// ==========================================================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================================
// 8 & 9. Animate All Stats Counter (+ و %) لكل العناصر
// ==========================================================
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(stat);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    observer.observe(stat);
});

function animateStat(stat) {
    let target = stat.getAttribute('data-count') || stat.textContent;
    target = parseInt(target.replace('%','').replace('+','')) || 0;

    const type = stat.getAttribute('data-type') || '';
    const isPercent = type === 'percent';
    const isPlus = type === 'plus';

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    stat.textContent = (isPlus ? '+' : '') + '0' + (isPercent ? '%' : '');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            stat.textContent =
                (isPlus ? '+' : '') +
                target +
                (isPercent ? '%' : '');
        } else {
            stat.textContent =
                (isPlus ? '+' : '') +
                Math.ceil(current) +
                (isPercent ? '%' : '');
        }
    }, 16);
}

// ==========================================================
// 10. Timeline Animation for About Page
// ==========================================================
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initTimelineAnimation();
});