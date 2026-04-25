/* =========================================================================
   LA CASA DEL CORREDOR — JAVASCRIPT GLOBAL
   Interacciones mínimas: menú móvil, ocultación de nav al scroll,
   duplicación automática de marquesina para loop infinito
   ========================================================================= */

(function () {
    'use strict';

    /* ---------------------------------------------------------------------
       1. Toggle del menú móvil
       --------------------------------------------------------------------- */
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('is-open');
            const isOpen = navMenu.classList.contains('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar el menú al hacer click en un enlace
        navMenu.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 968) {
                    navMenu.classList.remove('is-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    /* ---------------------------------------------------------------------
       2. Ocultar/mostrar nav al hacer scroll (comportamiento premium)
       --------------------------------------------------------------------- */
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            // Scroll hacia abajo: ocultar
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba: mostrar
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    if (nav) {
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ---------------------------------------------------------------------
       3. Duplicar contenido de la marquesina para loop continuo
       --------------------------------------------------------------------- */
    const marqueeTracks = document.querySelectorAll('.marquee__track');
    marqueeTracks.forEach(function (track) {
        const clone = track.innerHTML;
        track.innerHTML += clone;
    });

    /* ---------------------------------------------------------------------
       4. Reveal on scroll — aparición sutil de elementos al entrar en viewport
       --------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores antiguos
        revealElements.forEach(function (el) {
            el.classList.add('is-revealed');
        });
    }

    /* ---------------------------------------------------------------------
       5. Año dinámico en footer
       --------------------------------------------------------------------- */
    const yearElements = document.querySelectorAll('[data-year]');
    yearElements.forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

})();
