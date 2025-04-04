// Add a simple countdown timer, scroll animations, sponsors slider, and smart navbar
document.addEventListener('DOMContentLoaded', function() {
    // Get the date text from the element
    const dateText = document.querySelector('.event-date').textContent.trim();

    // Parse the date more explicitly - assuming format is DD.MM.YYYY
    const dateParts = dateText.split('.');
    if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed in JavaScript
        const year = parseInt(dateParts[2], 10);

        // Create date object using explicit parameters
        const countDownDate = new Date(year, month, day).getTime();

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
                document.querySelector('.countdown-container').innerHTML = "EVENT STARTED";
            }
        }, 1000);
    } else {
        console.error("Date format not recognized:", dateText);
    }    // Scroll animation for info sections
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

    // Make Nav links link to local sections

    // Function to extract the last path segment and convert to hashtag
    function pathToHashtag(href) {
        try {
            // Parse the URL properly
            const url = new URL(href);

            // Get the pathname and split by slashes
            const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);

            // Get the last segment (or return empty if no segments)
            const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';

            // Split by hyphens, capitalize each part, and join back
            const capitalized = lastSegment.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('');

            // Add the hashtag symbol
            return '#' + capitalized;
        } catch (e) {
            // If URL parsing fails, fallback to a simpler method
            const parts = href.split('/');
            const lastPart = parts[parts.length - 1];

            const capitalized = lastPart.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('');

            return '#' + capitalized;
        }
    }
    const navLinks = document.querySelectorAll('nav ul li > a');
    const exceptions = ["partners", "contact", 'archive', 'volunteers'];

    navLinks.forEach(navLink => {
        if (!exceptions.some(exception => navLink.href.includes(exception))) {
            navLink.href = pathToHashtag(navLink.href);
        }
    });

})