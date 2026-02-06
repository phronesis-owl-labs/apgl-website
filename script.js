// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
} else {
    cursorGlow.style.display = 'none';
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Intersection Observer Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes
const style = document.createElement('style');
style.textContent = `
    .fade-up {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .fade-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stagger > * {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .stagger.visible > *:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
    .stagger.visible > *:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
    .stagger.visible > *:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
    .stagger.visible > *:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
    .stagger.visible > *:nth-child(5) { transition-delay: 0.5s; opacity: 1; transform: translateY(0); }
    .stagger.visible > *:nth-child(6) { transition-delay: 0.6s; opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// Apply to elements
document.querySelectorAll('.section-header, .about-header, .about-main, .about-stats, .reach-content').forEach(el => {
    el.classList.add('fade-up');
    animateOnScroll.observe(el);
});

document.querySelectorAll('.expertise-grid, .commodities-table, .regions-grid').forEach(el => {
    el.classList.add('stagger');
    animateOnScroll.observe(el);
});

// ===== Parallax Effect =====
const heroGlow = document.querySelector('.hero-glow');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroGlow && scrolled < window.innerHeight) {
        heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
    }
});

// ===== Console =====
console.log('%c◆ APGL Group', 'color: #c9a962; font-size: 20px; font-weight: bold;');
console.log('%c  Critical Minerals Trading', 'color: #888; font-size: 12px;');
