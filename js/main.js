// ======================================
// NIRAV POLARA - CREATIVE PORTFOLIO JS
// Interactive Features & Animations
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initTypingAnimation();
    initScrollReveal();
    initCursorGlow();
    initMagneticButtons();
    initStatsCounter();
    initParticles();
    initSmoothScroll();
    initMobileMenu();
    initSkillTabs();
    initSkillProgress();
    initResumeModal();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active link based on scroll position
        updateActiveLink();
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typedText = document.getElementById('typed-text');
    if (!typedText) return;

    const roles = [
        'AI Engineer',
        'Full-Stack Developer',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => observer.observe(reveal));
}

// ===== CURSOR GLOW =====
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow || window.innerWidth < 1024) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            elem.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateNumber(target, count);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    function animateNumber(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current + '+';

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
}

// ===== PARTICLES =====
function initParticles() {
    const particlesBg = document.getElementById('particles-bg');
    if (!particlesBg) return;

    // Create floating particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesBg.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            50% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                document.getElementById('nav-menu')?.classList.remove('active');
                document.getElementById('mobile-toggle')?.classList.remove('active');
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle?.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// ===== TILT EFFECT FOR CARDS =====
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', initTiltEffect);

// ===== PRELOADER (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for hero section
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
    }

    // Parallax for floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const speed = 0.05 + (index * 0.02);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('🚀 Portfolio loaded successfully!');

// ===== SKILL TABS =====
function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const skillItems = document.querySelectorAll('.skill-item');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            // Filter skill items
            skillItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ===== SKILL PROGRESS BARS =====
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.skill-progress');

    if (!progressBars.length) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');

                // Set CSS variable for width
                bar.style.setProperty('--progress-width', progress + '%');
                bar.classList.add('animated');

                // Animate width directly
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);

                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => observer.observe(bar));
}

// ===== RESUME MODAL =====
function initResumeModal() {
    const resumeBtn = document.querySelector('.download-btn');
    const modal = document.getElementById('resume-modal');

    if (!resumeBtn || !modal) return;

    const overlay = modal.querySelector('.resume-overlay');
    const closeBtn = modal.querySelector('.resume-close');

    // Open modal on resume button click
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

