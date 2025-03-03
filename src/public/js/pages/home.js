// Add a simple countdown timer, scroll animations, sponsors slider, and smart navbar
document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to
    const countDownDate = new Date(document.querySelector('.event-date').textContent.split('.').reverse().join('-'))

    // Update the countdown every 1 second
    const x = setInterval(function () {
        // Get current date and time
        const now = new Date().getTime();

        // Find the distance between now and the countdown date
        const distance = countDownDate - now;

        // Calculate days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the elements
        document.querySelectorAll('.countdown-number')[0].textContent = days;
        document.querySelectorAll('.countdown-number')[1].textContent = hours;
        document.querySelectorAll('.countdown-number')[2].textContent = minutes;
        document.querySelectorAll('.countdown-number')[3].textContent = seconds;

        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(x);
            document.querySelectorAll('.countdown-container').innerHTML = "EVENT STARTED";
        }
    }, 1000);
    // Scroll animation for info sections
    const infoSections = document.querySelectorAll('.info-section');

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Add animation class when element is in viewport
    function checkVisibility() {
        infoSections.forEach(function(section) {
            if (isElementInViewport(section)) {
                section.classList.add('animate');
            }
        });
    }

    // Check visibility on load
    checkVisibility();

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    // Sponsors slider functionality
    const track = document.querySelector('.sponsors-track');
    const sponsorItems = document.querySelectorAll('.sponsor-item');
    const dotsContainer = document.querySelector('.sponsors-navigation');
    const itemWidth = sponsorItems[0].offsetWidth + 30; // Include margin
    let currentSlide = 0;
    let slidesPerView = calculateSlidesPerView();
    let maxSlide = Math.max(0, sponsorItems.length - slidesPerView);
    let autoSlideInterval;

    // Calculate how many slides should be visible based on screen width
    function calculateSlidesPerView() {
        if (window.innerWidth < 768) {
            return 1;
        } else if (window.innerWidth < 992) {
            return 2;
        } else {
            return 3;
        }
    }

    // Create navigation dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const numDots = maxSlide + 1;

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Update the dots to reflect current slide
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
        track.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
        updateDots();
    }

    // Go to next slide with loop
    function nextSlide() {
        if (currentSlide >= maxSlide) {
            // Loop back to the beginning with animation
            currentSlide = maxSlide;
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }

    // Start auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Update slider on window resize
    function handleResize() {
        slidesPerView = calculateSlidesPerView();
        maxSlide = Math.max(0, sponsorItems.length - slidesPerView);

        // Adjust the current slide if needed
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }

        // Update dots to reflect new number of possible slides
        createDots();

        // Update slider position
        goToSlide(currentSlide);
    }

    // Clone first few items and append to the end for smooth infinite loop
    function cloneItems() {
        for (let i = 0; i < slidesPerView; i++) {
            const clone = sponsorItems[i].cloneNode(true);
            track.appendChild(clone);
        }
    }

    // Initialize slider
    createDots();
    cloneItems();
    startAutoSlide();
    window.addEventListener('resize', handleResize);
})