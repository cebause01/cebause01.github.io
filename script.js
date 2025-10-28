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
// Parallax Scrolling Effect
// ===================================
const parallaxBg = document.querySelector('.parallax-bg');
const parallaxImage = document.querySelector('.parallax-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && scrolled < heroSection.offsetHeight) {
        // Parallax effect for background (slower)
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Parallax effect for image (slightly different speed)
        if (parallaxImage) {
            parallaxImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    }
});

// ===================================
// Project Modal
// ===================================
const modal = document.getElementById('projectModal');
const modalOverlay = modal?.querySelector('.modal-overlay');
const modalClose = modal?.querySelector('.modal-close');
const projectDetailsButtons = document.querySelectorAll('.project-details-btn');

// Project data
const projectData = {
    'sign-language': {
        tag: 'Computer Vision',
        title: 'Real-Time Sign Language Translator',
        description: 'A real-time sign language translator using YOLOv8 for gesture detection via webcam. Features custom-trained models, manual data collection, and Roboflow for dataset processing and augmentation.',
        features: [
            'Real-time gesture recognition using webcam',
            'Custom-trained YOLOv8 model for high accuracy',
            'Manual data collection and annotation process',
            'Roboflow integration for dataset augmentation',
            'OpenCV integration for video processing',
            'User-friendly interface with live feedback'
        ],
        tech: ['YOLOv8', 'OpenCV', 'Python', 'PyTorch', 'Roboflow', 'NumPy', 'Computer Vision'],
        challenges: 'The main challenge was collecting and annotating a diverse dataset of sign language gestures. This was solved by implementing a systematic data collection process and using Roboflow for data augmentation to improve model robustness across different lighting conditions and hand positions.',
        github: 'https://github.com/cebause01/RT-SignLanguage-YOLOv8'
    },
    'hospital-db': {
        tag: 'Database Systems',
        title: 'Hospital Database Management System',
        description: 'A comprehensive database management system for hospitals, built with Oracle, ensuring efficient patient records management and streamlined healthcare operations.',
        features: [
            'Patient records management',
            'Appointment scheduling system',
            'Doctor and staff management',
            'Medical history tracking',
            'Billing and insurance integration',
            'Secure data handling with role-based access'
        ],
        tech: ['Oracle Database', 'SQL', 'PL/SQL', 'Database Design', 'System Architecture', 'Data Security'],
        challenges: 'Designing a scalable database schema that could handle complex relationships between patients, doctors, appointments, and medical records while maintaining data integrity and security. Implemented proper normalization and indexing strategies to optimize query performance.',
        github: null
    },
    'gmaps-scraper': {
        tag: 'Web Scraping',
        title: 'Google Maps Data Scraper',
        description: 'A JavaScript-based web scraping tool for extracting business data from Google Maps. Built for market research and data collection purposes with efficient automation capabilities.',
        features: [
            'Automated business information extraction',
            'Location-based search capabilities',
            'Export data to CSV/JSON formats',
            'Rate limiting to avoid detection',
            'Customizable search parameters',
            'Error handling and retry mechanisms'
        ],
        tech: ['JavaScript', 'Node.js', 'Puppeteer', 'Web Scraping', 'Automation', 'Data Extraction'],
        challenges: 'Handling dynamic content loading and anti-scraping measures. Implemented smart delays, user-agent rotation, and proper DOM waiting mechanisms to ensure reliable data extraction while respecting website policies.',
        github: 'https://github.com/cebause01/GMap_Scrape'
    },
    'telegram-scraper': {
        tag: 'Data Processing',
        title: 'Telegram Data Scraper',
        description: 'A Python-based automation tool for scraping data from Telegram channels and groups. Utilizes API integration and web automation for efficient data collection and analysis.',
        features: [
            'Channel and group message extraction',
            'Media file downloading',
            'User information collection',
            'Message history archiving',
            'Keyword-based filtering',
            'Scheduled automated scraping'
        ],
        tech: ['Python', 'Telethon', 'Telegram API', 'asyncio', 'API Integration', 'Automation'],
        challenges: 'Managing API rate limits and handling large volumes of data efficiently. Implemented asynchronous processing and batch operations to improve performance while staying within Telegram API constraints.',
        github: 'https://github.com/cebause01/Scrape_Tele'
    },
    'pdf-processor': {
        tag: 'PDF Processing',
        title: 'PDF Processor',
        description: 'A Python application for processing and manipulating PDF files. Features include text extraction, page manipulation, merging, and automated processing for document workflow management.',
        features: [
            'Text extraction from PDFs',
            'PDF merging and splitting',
            'Page rotation and reordering',
            'Watermark addition',
            'Batch processing capabilities',
            'OCR support for scanned documents'
        ],
        tech: ['Python', 'PyPDF2', 'PDF Libraries', 'Text Extraction', 'Document Processing', 'OCR'],
        challenges: 'Handling various PDF formats and ensuring text extraction accuracy across different document types. Implemented multiple extraction strategies and fallback mechanisms to handle edge cases and corrupted files.',
        github: 'https://github.com/cebause01/PDFProcessor'
    }
};

// Open modal
projectDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project && modal) {
            // Populate modal with project data
            modal.querySelector('.modal-tag').textContent = project.tag;
            modal.querySelector('.modal-title').textContent = project.title;
            modal.querySelector('.modal-description').textContent = project.description;
            
            // Features list
            const featuresList = modal.querySelector('.modal-features-list');
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            // Tech stack
            const techStack = modal.querySelector('.modal-tech-stack');
            techStack.innerHTML = '';
            project.tech.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techStack.appendChild(span);
            });
            
            // Challenges
            modal.querySelector('.modal-challenges-text').textContent = project.challenges;
            
            // GitHub link
            const githubLink = modal.querySelector('.modal-github-link');
            if (project.github) {
                githubLink.href = project.github;
                githubLink.style.display = 'inline-flex';
            } else {
                githubLink.style.display = 'none';
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
const closeModal = () => {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeModal();
    }
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
