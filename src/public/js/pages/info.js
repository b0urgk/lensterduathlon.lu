function toggleQuickNav() {
    const quickNav = document.getElementById('quickNav');
    const toggleButton = document.getElementById('quickNavToggle');

    quickNav.classList.toggle('expanded');

    if (quickNav.classList.contains('expanded')) {
        toggleButton.textContent = '−';
    } else {
        toggleButton.textContent = '+';
    }
}

// Initialize expanded on page load
document.addEventListener('DOMContentLoaded', function() {
    const quickNav = document.getElementById('quickNav');
    quickNav.classList.add('expanded');
});