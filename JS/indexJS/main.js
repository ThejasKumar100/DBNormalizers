// Function to update time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById("current-time").innerText = ` ${hours}:${minutes}:${seconds}`;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call to set time immediately

// Language change handler
document.getElementById("language-select").addEventListener("change", function () {
    const selectedLanguage = this.value;

    // Set the `lang` attribute on the <html> tag to change the language
    document.documentElement.lang = selectedLanguage;

    // Alternatively, if you have localized URLs, you could redirect to a specific URL.
    // For example:
    // window.location.href = `/${selectedLanguage}/your-page-url`;
});

