
// Smart Navbar that shows on scroll up
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let scrollingDown = true;
document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        // Determine scroll direction
        if (currentScrollY > lastScrollY) {
            scrollingDown = true;
        } else {
            scrollingDown = false;
        }

        // Show/hide navbar based on scroll direction
        if (scrollingDown && currentScrollY > 100) {
            console.log(1)
            header.classList.add('navbar-hidden');
        } else {
            header.classList.remove('navbar-hidden');
        }

        lastScrollY = currentScrollY;
    });

    // Mobile logo test
    if (window.innerWidth <= 768) {
        const logoContainer = document.querySelector('.edge-logo-container');
        if (logoContainer) {
            console.log('Mobile logo container exists and should be visible');
            logoContainer.style.display = 'block';
        } else {
            console.log('Mobile logo container not found');
        }
    }

    // Handle window resize for logo
    window.addEventListener('resize', function () {
        const logoContainer = document.querySelector('.edge-logo-container');
        if (logoContainer) {
            if (window.innerWidth <= 768) {
                logoContainer.style.display = 'block';
            } else {
                logoContainer.style.display = 'none';
            }
        }
    });


    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');


    hamburger.addEventListener('click', toggleSidebar)

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('open');
                nav.classList.remove('open');
            }
        });
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('open');
            nav.classList.remove('open');
        }
    });
    // Add dropdown menu toggle for mobile
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Only attach this event on mobile
    if (window.innerWidth <= 1400) {
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle dropdown visibility
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn') && window.innerWidth <= 1400) {
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1400) {
            // Reset dropdown display for desktop
            dropdownContent.style.display = '';
        } else {
            // Ensure dropdown is hidden on mobile until clicked
            dropdownContent.style.display = 'none';
        }
    });
})

function toggleSidebar(){
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
}