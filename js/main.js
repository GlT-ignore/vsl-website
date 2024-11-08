document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page reload
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    // Force scroll to top when page loads
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Loading animation
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('fade-out');
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > scrollThreshold) {
            if (currentScroll < lastScrollTop) {
                navbar.style.transform = 'translateY(0)';
                navbar.style.opacity = '1';
            } else {
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.opacity = '0';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
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
                const target = parseInt(counter.getAttribute('data-target'));
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
}); 