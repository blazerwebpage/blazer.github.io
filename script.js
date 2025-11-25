document.addEventListener('DOMContentLoaded', () => {
    // NAV toggle (mobile)
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            siteNav.setAttribute('aria-hidden', String(expanded));
            siteNav.style.display = expanded ? 'none' : 'flex';
        });
        // ensure nav hidden by default on small screens
        if (window.innerWidth < 900) siteNav.style.display = 'none';
    }

    // Pastes list toggle
    const pasteToggle = document.getElementById('paste-toggle');
    const pastesList = document.querySelector('.pastes-list');
    if (pasteToggle && pastesList) {
        pasteToggle.addEventListener('click', () => {
            const expanded = pasteToggle.getAttribute('aria-expanded') === 'true';
            pasteToggle.setAttribute('aria-expanded', String(!expanded));
            pastesList.style.display = expanded ? 'none' : 'flex';
        });
    }

    // Cards: preserve flip logic and add touch-friendly support
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const cardInner = card.querySelector('.card-inner');
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');

        const viewBtn = cardFront && cardFront.querySelector('.view-btn');
        const backBtn = cardBack && cardBack.querySelector('.back-btn');

        // show button on hover (desktop). On touch devices buttons are always visible via CSS rules.
        if (cardFront && viewBtn) {
            cardFront.addEventListener('mouseenter', () => {
                viewBtn.style.opacity = '1';
                viewBtn.style.transition = 'opacity 0.3s ease';
            });
            cardFront.addEventListener('mouseleave', () => {
                viewBtn.style.opacity = '';
            });
        }

        // Flip handlers
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.add('flipped');
            });
        }
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('flipped');
            });
        }

        // On small screens allow tapping the whole card front to flip
        cardFront && cardFront.addEventListener('click', (e) => {
            // don't flip when clicking the button (handled above)
            if (e.target && e.target.classList && e.target.classList.contains('view-btn')) return;
            if (window.innerWidth <= 900) {
                card.classList.toggle('flipped');
            }
        });
    });
});
