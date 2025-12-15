    const deleteAccount = document.getElementById("deleteAccount");
    
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