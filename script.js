// Professional Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const loaderParticles = document.getElementById('loaderParticles');
    const loaderText = document.getElementById('loaderText');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const loaderLogoImg = document.getElementById('loaderLogoImg');
    
    // Particles removed for cleaner look
    
    // Loading messages
    const loadingMessages = [
        'Loading...',
        'Preparing...',
        'Almost ready...',
        'Welcome...'
    ];
    
    let messageIndex = 0;
    let progress = 0;
    
    // Update loading text
    function updateLoadingText() {
        loaderText.style.opacity = '0';
        setTimeout(() => {
            loaderText.textContent = loadingMessages[messageIndex];
            loaderText.style.opacity = '1';
            messageIndex = (messageIndex + 1) % loadingMessages.length;
        }, 300);
    }
    
    // Update progress
    function updateProgress() {
        if (progress < 100) {
            progress += Math.random() * 8; // Smaller increments for smoother progress
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
        }
    }
    
    // Animate logo
    function animateLogo() {
        if (loaderLogoImg) {
            loaderLogoImg.style.transform = 'scale(1.1)';
            setTimeout(() => {
                loaderLogoImg.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Start animations
    updateLoadingText();
    setInterval(updateLoadingText, 2000);
    setInterval(updateProgress, 150); // Slower updates for smoother progress
    setInterval(animateLogo, 3000);
    
    // Hide loader after 3 seconds
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 3000);
});

const canvas = document.createElement('canvas');
document.querySelector('.home').appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = document.querySelector('.home').offsetWidth;
    canvas.height = document.querySelector('.home').offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const points = [];
for (let i = 0; i < 70; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                ctx.stroke();
            }
        }
    }
}

function update() {
    points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
    });
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}

loop();

// Enhanced Header Scroll Effect
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Modern Menu Toggle with Enhanced Animation
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let isMenuOpen = false;
let menuBackdrop = null;

// Initialize menu backdrop
document.addEventListener("DOMContentLoaded", function() {
    menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    document.body.appendChild(menuBackdrop);
    
    // Add click event to backdrop to close menu
    menuBackdrop.addEventListener('click', function() {
        closeMenu();
    });
});

// Function to close menu
function closeMenu() {
    isMenuOpen = false;
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
    if (menuBackdrop) {
        menuBackdrop.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
}

// Function to open menu
function openMenu() {
    isMenuOpen = true;
    menuIcon.classList.add("bx-x");
    navbar.classList.add("active");
    if (menuBackdrop) {
        menuBackdrop.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

menuIcon.onclick = () => {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Close menu when clicking on a link
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                closeMenu();
            }
        });
    });
});

// Add active state to navigation based on scroll position
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

// Enhanced Logo Animation
document.addEventListener("DOMContentLoaded", function() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// Modern Navbar Link Hover Effects
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add ripple effect to menu icon
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('#menu-icon');
    
    menuIcon.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(224, 224, 224, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add smooth reveal animation for header elements
document.addEventListener("DOMContentLoaded", function() {
    const headerElements = document.querySelectorAll('.logo, .navbar a, #menu-icon');
    
    headerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        closeMenu();
    }
});

// Improved touch gesture support for mobile menu
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // Only handle horizontal swipes (ignore vertical swipes)
    if (Math.abs(diffX) > swipeThreshold && diffY < 100) {
        if (diffX > 0 && navbar.classList.contains('active')) {
            // Swipe left - close menu
            closeMenu();
        } else if (diffX < 0 && !navbar.classList.contains('active')) {
            // Swipe right - open menu
            openMenu();
        }
    }
}

// Prevent touch events from interfering with scroll
document.addEventListener('touchmove', function(e) {
    if (navbar.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener("DOMContentLoaded", function() {
    const link = document.querySelector('.footer-iconTop a');

    link.addEventListener('click', function(event) {
        event.preventDefault();
        document.body.classList.add('fade-out');

        setTimeout(function() {
            window.location.href = link.href;
        }, 100);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .highlight, .zoom-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
});

// تحديد العناصر التي تريد تطبيق التأثير عليها
const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');

// إعداد الـ IntersectionObserver
const observerOptions = {
  threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// مراقبة العناصر
elements.forEach(element => {
  observer.observe(element);
});

// إضافة وظيفة لمسح بيانات النموذج بعد إرساله
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                formMessage.style.display = 'block';
                formMessage.textContent = 'Message sent successfully!';
            } else {
                formMessage.style.display = 'block';
                formMessage.textContent = 'Failed to send message. Please try again later.';
            }
        })
        .catch(error => {
            formMessage.style.display = 'block';
            formMessage.textContent = 'Failed to send message. Please try again later.';
        });
    });
});

// Add smooth scrolling for navigation links and buttons
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    const btnLinks = document.querySelectorAll('.btn[href^="#"]');
    
    // Debug: Log the number of links found
    console.log('Navigation links found:', navLinks.length);
    console.log('Button links found:', btnLinks.length);
    
    // Combine both selectors
    const allLinks = [...navLinks, ...btnLinks];
    console.log('Total links to handle:', allLinks.length);
    
    allLinks.forEach(link => {
        console.log('Setting up smooth scroll for:', link.textContent, 'with href:', link.getAttribute('href'));
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked:', this.textContent, 'targeting:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                console.log('Scrolling to section:', targetId);
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.log('Target section not found:', targetId);
            }
            
            // Close mobile menu if open
            if (navbar.classList.contains('active')) {
                closeMenu();
            }
        });
    });
});

// Add enhanced typing effect for the main heading
document.addEventListener("DOMContentLoaded", function() {
    const heading = document.querySelector('.home-content h1');
    if (heading) {
        const text = heading.textContent;
        heading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// SMOOTH Project Cards Animation System - Unified and Clean
document.addEventListener("DOMContentLoaded", function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Performance optimization: Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Performance optimization: Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Smooth unified animation for project cards
    function animateProjectCard(card, delay = 0) {
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.filter = 'blur(0px)';
        }, delay);
    }
    
    // Single optimized Intersection Observer for Project Cards
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Smooth staggered animation
                animateProjectCard(entry.target, index * 150);
                
                // Stop observing after animation
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Slightly higher threshold for better timing
        rootMargin: '0px 0px -50px 0px' // Better margin for smooth triggering
    });
    
    // Observe all project cards
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // Optimized Hover Effects - Reduced complexity
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelector('.project-links');
        const title = card.querySelector('.project-title');
        const category = card.querySelector('.project-category');
        
        let isHovered = false;
        
        // Debounced mouse enter effect
        const debouncedMouseEnter = debounce(function() {
            if (isHovered) return;
            isHovered = true;
            
            // Simplified hover effects
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.filter = 'brightness(1.1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '1';
            }
            
            if (links) {
                links.style.transform = 'translateY(0)';
                links.style.opacity = '1';
            }
            
            if (title) {
                title.style.color = 'var(--main-color)';
            }
            
            if (category) {
                category.style.transform = 'translateY(-2px)';
            }
        }, 50);
        
        // Debounced mouse leave effect
        const debouncedMouseLeave = debounce(function() {
            isHovered = false;
            
            // Reset hover effects
            if (image) {
                image.style.transform = 'scale(1)';
                image.style.filter = 'brightness(0.9)';
            }
            
            if (overlay) {
                overlay.style.opacity = '0';
            }
            
            if (links) {
                links.style.transform = 'translateY(30px)';
                links.style.opacity = '0';
            }
            
            if (title) {
                title.style.color = 'var(--text-color)';
            }
            
            if (category) {
                category.style.transform = 'translateY(0)';
            }
        }, 50);
        
        card.addEventListener('mouseenter', debouncedMouseEnter);
        card.addEventListener('mouseleave', debouncedMouseLeave);
        
        // Removed click effect from entire card - only View Live link should be clickable
    });
    
    // Optimized Project Links Interaction
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(4px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
        
        link.addEventListener('click', function(e) {
            // Prevent event bubbling to avoid triggering card click
            e.stopPropagation();
            
            // Simple click feedback
            this.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px)';
            }, 100);
        });
    });
    
    // Removed parallax effect for better performance
    
    // Removed loading effect for cleaner smooth animation
    
    // Simplified keyboard navigation
    projectCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Project ${index + 1}`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.project-link');
                if (link) {
                    link.click();
                }
            }
        });
        
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--main-color)';
            this.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Add floating animation to social icons
document.addEventListener("DOMContentLoaded", function() {
    const socialIcons = document.querySelectorAll('.home-sci a');
    
    socialIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
});

// Add CSS animation for floating effect
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-8px);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
    
    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
`;
document.head.appendChild(style);

// Add pulse animation to logo
document.addEventListener("DOMContentLoaded", function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'pulse 2s ease-in-out infinite';
    }
});

// Shimmer effect removed from buttons to prevent color changes

// Add counter animation for skills
document.addEventListener("DOMContentLoaded", function() {
    const skillBars = document.querySelectorAll('.skills-content .progress .bar');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const before = bar.querySelector('::before') || bar;
            const width = before.style.transform.match(/scaleX\(([^)]+)\)/);
            if (width) {
                const percentage = parseFloat(width[1]);
                before.style.transform = 'scaleX(0)';
                setTimeout(() => {
                    before.style.transform = `scaleX(${percentage})`;
                }, 100);
            }
        });
    };
    
    // Trigger animation when skills section is visible
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
});

// Add smooth reveal animation for education items
document.addEventListener("DOMContentLoaded", function() {
    const educationItems = document.querySelectorAll('.education-content .content');
    
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Interactive cursor effect removed for cleaner experience