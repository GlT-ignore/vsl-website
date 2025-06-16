document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page reload
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    // Force scroll to top when page loads
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Loading animation
    const loader = document.querySelector('.page-loader');
    const html = document.documentElement;
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        const applyTheme = (isDark) => {
            body.classList.toggle('dark-mode', isDark);
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.classList.add('rotate');
            setTimeout(() => themeToggle.classList.remove('rotate'), 500);
        };

        const stored = localStorage.getItem('theme') === 'dark';
        if (stored) applyTheme(true);

        themeToggle.addEventListener('click', () => {
            applyTheme(!body.classList.contains('dark-mode'));
        });
    }

    const toggleNoScroll = (state) => {
        html.classList.toggle('no-scroll', state);
        body.classList.toggle('no-scroll', state);
    };

    if (loader) {
        const PAGE_LOAD_DELAY = 1000;
        const FADE_OUT_DELAY = 500;

        const hideLoader = () => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                toggleNoScroll(false);
                initCounterObserver();
            }, FADE_OUT_DELAY);
        };

        toggleNoScroll(true);
        window.addEventListener('load', () => setTimeout(hideLoader, PAGE_LOAD_DELAY));
    } else {
        // If no loader is present, start counters immediately
        initCounterObserver();
    }

    // Updated Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > scrollThreshold) {
            if (currentScroll < lastScrollTop) {
                // Scrolling UP - show navbar
                navbar.style.transform = 'translateY(0)';
                navbar.style.opacity = '1';
                navbar.style.position = 'fixed';
                navbar.style.top = '0';
                navbar.style.width = '100%';
                navbar.style.zIndex = '1000';
            } else {
                // Scrolling DOWN - hide navbar
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.opacity = '0';
            }
        } else {
            // At the top - show navbar
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            navbar.style.position = 'relative';
        }

        lastScrollTop = currentScroll;
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.navbar-collapse');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('show');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }

    // Counter Animation with Intersection Observer
    function initCounterObserver() {
        const counters = document.querySelectorAll('.counter');

        const animateCounter = (counter, target) => {
            const speed = 200;
            const increment = target / speed;
            let currentCount = 0;

            const updateCount = () => {
                if (currentCount < target) {
                    currentCount = Math.ceil(currentCount + increment);
                    counter.innerText = currentCount;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.3
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
});
