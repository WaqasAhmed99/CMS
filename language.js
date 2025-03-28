// Check the current page language
const isEnglish = document.documentElement.lang === "en";

// Get the toggle button
const toggleButton = document.getElementById('toggleBtn');

// Add event listener to the toggle button
toggleButton.addEventListener('click', function() {
    if (isEnglish) {
        // Switch to Urdu
        window.location.href = 'index-ur.html'; // Redirect to Urdu page
    } else {
        // Switch to English
        window.location.href = 'index.html'; // Redirect to English page
    }
});
