document.addEventListener("DOMContentLoaded", () => {
    const addAffirmations = document.getElementById("addAffirmations");
    const showAffirmations = document.getElementById("showAffirmations");
    const logOut = document.getElementById("logOut");
    const deleteAccount = document.getElementById("deleteAccount");
    const messageDiv = document.getElementById("message");

    const tokenObj = JSON.parse(localStorage.getItem("jwtToken"));
    const token = tokenObj?.token;
    if (!token) {
        messageDiv.textContent = "You must be logged in.";
        return;
    }

    addAffirmations.onclick = () => window.location.href = "addAffirmation.html";
    showAffirmations.onclick = () => window.location.href = "showAffirmation.html";

    logOut.onclick = () => {
        localStorage.removeItem("jwtToken");
        window.location.href = "login.html";
    };

    deleteAccount.onclick = async () => {
        if (!confirm("Are you sure you want to delete your account?")) return;

        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete account");
            }

            localStorage.removeItem("jwtToken");
            alert("Account deleted successfully");
            window.location.href = "login.html";

        } catch (err) {
            messageDiv.textContent = err.message;
        }
    };
});
