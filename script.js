document.addEventListener("DOMContentLoaded", () => {

    // ========== Scroll Reveal ==========
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== Smooth Scroll for Anchors ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });

    // ========== Mobile Menu Toggle ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ========== Navbar Background on Scroll ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.background = 'rgba(10, 10, 15, 0.92)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.7)';
        }
    });

    // ========== Parallax Background Orbs ==========
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const orb1 = document.querySelector('.orb-1');
                const orb2 = document.querySelector('.orb-2');
                const orb3 = document.querySelector('.orb-3');

                if (orb1) orb1.style.transform = `translateY(${scrolled * 0.08}px)`;
                if (orb2) orb2.style.transform = `translateY(${scrolled * -0.12}px)`;
                if (orb3) orb3.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.04}px))`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========== Active Nav Highlight ==========
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => a.classList.remove('nav-active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('nav-active');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => highlightObserver.observe(section));
});
