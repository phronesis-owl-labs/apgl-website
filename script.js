// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const pos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    });
});

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const current = window.scrollY;
    
    if (current > 10) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = current;
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation class and observe
const animateEls = document.querySelectorAll(
    '.about-content, .about-values, .service-card, .service-small, .commodity, .region, .cta-content, .process-step, .section-header, .global-content'
);

animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Override class to trigger animation
const style = document.createElement('style');
style.textContent = '.in-view { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Stagger grid items
document.querySelectorAll('.commodities-grid, .services-secondary, .regions').forEach(grid => {
    Array.from(grid.children).forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.08}s`;
    });
});

// ===== Counter Animation =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-count]').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 1400;
                const start = performance.now();
                
                function update(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.round(eased * target);
                    if (progress < 1) requestAnimationFrame(update);
                }
                
                requestAnimationFrame(update);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

// ===== Video Fallback =====
const heroVideo = document.querySelector('.hero-video');
const heroFallback = document.querySelector('.hero-fallback');
if (heroVideo && heroFallback) {
    heroVideo.addEventListener('loadeddata', () => {
        heroFallback.style.opacity = '0';
        heroFallback.style.transition = 'opacity 0.5s ease';
    });
}
