// Optimized JavaScript for Performance
'use strict';

// Performance optimization: Use requestAnimationFrame for smooth animations
const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { setTimeout(callback, 16); };

// Professional Loader with optimized performance
(function() {
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loaderText');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const loaderLogoImg = document.getElementById('loaderLogoImg');
    
    if (!loader) return;
    
    const loadingMessages = ['Loading...', 'Preparing...', 'Almost ready...', 'Welcome...'];
    let messageIndex = 0;
    let progress = 0;
    
    function updateLoadingText() {
        if (loaderText) {
            loaderText.style.opacity = '0';
            setTimeout(() => {
                loaderText.textContent = loadingMessages[messageIndex];
                loaderText.style.opacity = '1';
                messageIndex = (messageIndex + 1) % loadingMessages.length;
            }, 300);
        }
    }
    
    function updateProgress() {
        if (progress < 100) {
            progress += Math.random() * 8;
            if (progress > 100) progress = 100;
            
            if (progressFill) progressFill.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.round(progress) + '%';
        }
    }
    
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
    const textInterval = setInterval(updateLoadingText, 2000);
    const progressInterval = setInterval(updateProgress, 150);
    const logoInterval = setInterval(animateLogo, 3000);
    
    // Hide loader after 3 seconds
    setTimeout(() => {
        loader.classList.add('fade-out');
        clearInterval(textInterval);
        clearInterval(progressInterval);
        clearInterval(logoInterval);
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 3000);
})();

// Optimized Canvas Animation
(function() {
    const homeSection = document.querySelector('.home');
    if (!homeSection) return;
    
    const canvas = document.createElement('canvas');
    homeSection.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = homeSection.offsetWidth;
        canvas.height = homeSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const points = [];
    for (let i = 0; i < 50; i++) { // Reduced from 70 to 50 for better performance
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3, // Reduced speed
            vy: (Math.random() - 0.5) * 0.3
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2); // Reduced size
            ctx.fill();
        });
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
        update();
        draw();
        raf(loop);
    }
    
    loop();
})();

// Optimized Navigation
(function() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelectorAll('.navbar a');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
        
        navbarLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();

// Optimized Scroll Effects
(function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttled scroll event for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            raf(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
})();

// Optimized Animations
(function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .highlight, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Skills animation
    const skillBars = document.querySelectorAll('.skills-content .progress .bar span');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressText = entry.target.parentElement.previousElementSibling.querySelector('span');
                const percentage = parseInt(progressText.textContent);
                entry.target.style.setProperty('--progress-width', percentage + '%');
                entry.target.style.width = percentage + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillsObserver.observe(bar));
})();

// Optimized Project Cards Animation
(function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => projectObserver.observe(card));
})();

// Optimized Form Handling
(function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
})();

// Optimized Touch/Swipe Support
(function() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
    
    function handleTouchEnd(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    }
    
    function handleSwipe() {
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - could be used for navigation
                console.log('Swipe left');
            } else {
                // Swipe right - could be used for navigation
                console.log('Swipe right');
            }
        }
    }
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
})();

// Performance optimization: Lazy loading for images
(function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
})();

// Optimized Scroll to Top
(function() {
    const scrollToTopBtn = document.querySelector('.footer-iconTop a');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();

// Performance monitoring
(function() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            }, 0);
        });
    }
})(); 