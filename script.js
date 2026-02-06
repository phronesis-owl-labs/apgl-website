// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// ===== Animated Counter =====
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Parallax Effect for Hero =====
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Add animation styles dynamically =====
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .commodity-card,
    .region,
    .feature {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in .service-card,
    .animate-in .commodity-card,
    .animate-in .region,
    .animate-in .feature {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-in .service-card:nth-child(1),
    .animate-in .commodity-card:nth-child(1),
    .animate-in .region:nth-child(1),
    .animate-in .feature:nth-child(1) { transition-delay: 0.1s; }
    
    .animate-in .service-card:nth-child(2),
    .animate-in .commodity-card:nth-child(2),
    .animate-in .region:nth-child(2),
    .animate-in .feature:nth-child(2) { transition-delay: 0.2s; }
    
    .animate-in .service-card:nth-child(3),
    .animate-in .commodity-card:nth-child(3),
    .animate-in .region:nth-child(3) { transition-delay: 0.3s; }
    
    .animate-in .service-card:nth-child(4),
    .animate-in .commodity-card:nth-child(4),
    .animate-in .region:nth-child(4) { transition-delay: 0.4s; }
    
    .animate-in .commodity-card:nth-child(5) { transition-delay: 0.5s; }
    .animate-in .commodity-card:nth-child(6) { transition-delay: 0.6s; }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 320px;
            height: 100vh;
            background: rgba(10, 15, 26, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
            transition: right 0.4s ease;
            border-left: 1px solid var(--color-border);
        }
        
        .nav-links.active {
            display: flex;
            right: 0;
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }
`;
document.head.appendChild(style);

// ===== Console Easter Egg =====
console.log('%c APGL Group ', 'background: linear-gradient(135deg, #d4a853, #b87333); color: #0a0f1a; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
console.log('%c Critical Minerals Trading ', 'color: #d4a853; font-size: 14px;');
