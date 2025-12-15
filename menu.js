document.addEventListener("DOMContentLoaded", () => {
    const addAffirmations = document.getElementById("addAffirmations");
    const showAffirmations = document.getElementById("showAffirmations");
    const logOut = document.getElementById("logOut");
    const settings = document.getElementById("settings");
    const messageDiv = document.getElementById("message");

    const tokenObj = JSON.parse(localStorage.getItem("jwtToken"));
    const token = tokenObj?.token;
    if (!token) {
        messageDiv.textContent = "You must be logged in.";
        return;
    }

    addAffirmations.onclick = () => window.location.href = "addAffirmation.html";
    showAffirmations.onclick = () => window.location.href = "showAffirmation.html";
    settings.onclick = () => window.location.href = "settings.html";

    logOut.onclick = () => {
        localStorage.removeItem("jwtToken");
        window.location.href = "login.html";
    };
});
