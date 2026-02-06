document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursorGlow.style.left = x + 'px';
        cursorGlow.style.top = y + 'px';
    });

    // Add CSS for cursor glow dynamically if not in CSS
    if (!document.getElementById('cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.innerHTML = `
            .cursor-glow {
                position: fixed;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, rgba(93, 93, 255, 0.15) 0%, transparent 70%);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                border-radius: 50%;
                mix-blend-mode: screen;
                transition: opacity 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            if (isActive) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '2rem';
                navLinks.style.background = '#15151A';
                navLinks.style.padding = '2rem';
                navLinks.style.borderRadius = '12px';
                navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
                navLinks.classList.add('active');
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Fade-in animation CSS
    const animStyle = document.createElement('style');
    animStyle.innerHTML = `
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animStyle);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Theme Toggle Logic (Simple version)
    const themeToggle = document.querySelector('.theme-toggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        const icon = themeToggle.querySelector('i');

        if (!isDark) {
            document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
            document.documentElement.style.setProperty('--text-primary', '#1a1a1a');
            document.documentElement.style.setProperty('--text-secondary', '#4a4a4a');
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
            document.documentElement.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.8)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            // Revert variables (hardcoded for simplicity, ideally use classes)
            document.documentElement.style.removeProperty('--bg-color');
            document.documentElement.style.removeProperty('--text-primary');
            document.documentElement.style.removeProperty('--text-secondary');
            document.documentElement.style.removeProperty('--card-bg');
            document.documentElement.style.removeProperty('--nav-bg');
            document.documentElement.style.removeProperty('--glass-border');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Lightbox Logic for Certifications
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const certImages = document.querySelectorAll('.cert-image');

    if (lightbox && lightboxImg && lightboxClose) {
        certImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                // Small timeout to allow display:flex to apply before adding active class for opacity transition
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                lightboxImg.src = img.src;
                // Disable body scroll when lightbox is open
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
                lightboxImg.src = ''; // Clear source
            }, 300); // Match transition duration
            document.body.style.overflow = 'auto';
        };

        lightboxClose.addEventListener('click', closeLightbox);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
