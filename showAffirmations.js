document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken"); // Asumo que el token se guarda así
  const affirmationsList = document.getElementById("affirmationsList");
  const errorDiv = document.getElementById("error");

  if (!token) {
    errorDiv.textContent = "You must be logged in to view your affirmations.";
    return;
  }

  fetch("http://localhost:8080/api/affirmations", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Your session has expired. Please log in again.");
        } else {
          throw new Error("Error loading affirmations.");
        }
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0) {
        affirmationsList.innerHTML = "<li>No affirmations found.</li>";
      } else {
        console.log("Data completa:", data);
        data.forEach(affirmation => {
          console.log("affirmation: ", affirmation);
          const li = document.createElement("li");
          li.textContent = affirmation.sentence;
          affirmationsList.appendChild(li);
        });
      }
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    });
});
