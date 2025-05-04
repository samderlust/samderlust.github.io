// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Navigation scroll behavior
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add floating animation to certain elements
document.querySelectorAll('.skill-card').forEach(card => {
    card.classList.add('floating');
});

// Parallax effect for header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    header.style.backgroundPosition = `center ${scroll * 0.5}px`;
});

// Typing animation for the subtitle
const subtitle = document.querySelector('.subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
menuToggle.setAttribute('aria-label', 'Toggle menu');

// Only add mobile menu if we're on a small screen
if (window.innerWidth <= 768) {
    nav.insertBefore(menuToggle, navLinks);
    navLinks.style.display = 'none';

    menuToggle.addEventListener('click', () => {
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';
        menuToggle.innerHTML = isVisible ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        if (menuToggle.parentNode === nav) {
            nav.removeChild(menuToggle);
        }
    } else if (!menuToggle.parentNode) {
        nav.insertBefore(menuToggle, navLinks);
        navLinks.style.display = 'none';
    }
}); 