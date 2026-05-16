(() => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const image = lightbox.querySelector('.lightbox__image');
    const counter = lightbox.querySelector('.lightbox__counter');
    const btnClose = lightbox.querySelector('.lightbox__btn--close');
    const btnPrev = lightbox.querySelector('.lightbox__btn--prev');
    const btnNext = lightbox.querySelector('.lightbox__btn--next');

    let photos = [];
    let index = 0;
    let lastTrigger = null;
    const preloaded = new Map(); // url -> Image, keeps refs alive so browser cache holds them

    const preloadNext = () => {
        if (photos.length < 2) return;
        const nextUrl = photos[(index + 1) % photos.length];
        if (preloaded.has(nextUrl)) return;
        const img = new Image();
        img.src = nextUrl;
        preloaded.set(nextUrl, img);
    };

    const render = () => {
        if (!photos.length) return;
        const url = photos[index];
        image.classList.remove('is-loaded');
        lightbox.classList.add('is-loading');
        image.src = url;
        counter.textContent = `${index + 1} / ${photos.length}`;
    };

    image.addEventListener('load', () => {
        image.classList.add('is-loaded');
        lightbox.classList.remove('is-loading');
        preloadNext();
    });

    const open = (list, startIndex, trigger) => {
        photos = list;
        index = startIndex;
        lastTrigger = trigger || null;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
        render();
        btnClose.focus();
    };

    const close = () => {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        image.src = '';
        if (lastTrigger && typeof lastTrigger.focus === 'function') {
            lastTrigger.focus();
        }
    };

    const next = () => {
        if (!photos.length) return;
        index = (index + 1) % photos.length;
        render();
    };

    const prev = () => {
        if (!photos.length) return;
        index = (index - 1 + photos.length) % photos.length;
        render();
    };

    // Wire up gallery thumbnails
    document.querySelectorAll('.archive-gallery').forEach(gallery => {
        let list = [];
        try {
            list = JSON.parse(gallery.getAttribute('data-photos') || '[]');
        } catch (e) {
            return;
        }
        if (!list.length) return;

        gallery.addEventListener('click', (e) => {
            const item = e.target.closest('.archive-gallery__item');
            if (!item || !gallery.contains(item)) return;
            // Allow modifier-clicks / middle-click to fall through to native anchor behavior
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
            e.preventDefault();
            const idx = Number(item.getAttribute('data-index')) || 0;
            open(list, idx, item);
        });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);

    // Click on backdrop closes; clicks on the image or controls don't
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox__stage')) {
            close();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
        }
    });

    // Basic swipe support for touch
    let touchStartX = null;
    lightbox.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const dx = (e.changedTouches[0].clientX - touchStartX);
        touchStartX = null;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) next(); else prev();
    });
})();
