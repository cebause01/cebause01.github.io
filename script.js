// ===================================
// Navigation Scroll Effect
// ===================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');
const scrollOffset = 100;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    sections.forEach((section, index) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - scrollOffset;
        const sectionId = section.getAttribute('id');
        const isLastSection = index === sections.length - 1;

        if (isLastSection) {
            // For the last section (contact), check if we're near the bottom of the page
            const distanceFromBottom = documentHeight - (scrollY + windowHeight);
            if (distanceFromBottom < 150 || scrollY > sectionTop) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        } else if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===================================
// Cursor Effect (Optional Enhancement)
// ===================================
const createCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #64ffda;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.querySelectorAll('a, button, .gallery-item, .adventure-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
};

// Uncomment to enable custom cursor
// createCursor();

// ===================================
// Typing Animation
// ===================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = 'Zarif Haikal';
    let i = 0;
    const cursor = document.querySelector('.cursor');
    
    function type() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Ensure cursor keeps blinking after typing completes
            if (cursor) {
                cursor.style.animation = 'none';
                // Force reflow to restart animation
                cursor.offsetHeight;
                cursor.style.animation = 'blink 1s infinite';
            }
        }
    }
    
    // Start typing animation when page loads
    setTimeout(() => {
        type();
    }, 300);
}

// ===================================
// Update Current Year
// ===================================
const updateCurrentYear = () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};
updateCurrentYear();

// ===================================
// Theme Toggle
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load theme preference from localStorage
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===================================
// Scroll Progress Indicator
// ===================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton?.classList.add('visible');
    } else {
        backToTopButton?.classList.remove('visible');
    }
});

backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Project Filters
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
            } else {
                const categories = item.getAttribute('data-category');
                if (categories && categories.includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// ===================================
// Console Easter Egg
// ===================================
console.log(
    '%cHi there! 👋',
    'color: #64ffda; font-size: 20px; font-weight: bold; font-family: monospace;'
);
console.log(
    '%cWelcome to my portfolio!',
    'color: #8892b0; font-size: 14px; font-family: monospace;'
);
console.log(
    '%cThanks for checking out my code 🚀',
    'color: #ffd700; font-size: 14px; font-family: monospace;'
);
console.log(
    '%cConnect with me:\nGitHub: github.com/cebause01\nLinkedIn: linkedin.com/in/zarifhaikalz',
    'color: #64ffda; font-size: 12px; font-family: monospace;'
);
