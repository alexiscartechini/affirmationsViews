document.addEventListener("DOMContentLoaded", () => {
  const tokenObj = JSON.parse(localStorage.getItem("jwtToken"));
  const token = tokenObj?.token; 

  const affirmationsList = document.getElementById("affirmationsList");
  const errorDiv = document.getElementById("error");

  if (!token) {
    errorDiv.textContent = "You must be logged in to view your affirmations.";
    return;
  }

  function loadAffirmations() {
    affirmationsList.innerHTML = "";
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
          data.forEach(affirmation => {
            const li = document.createElement("li");
            li.textContent = affirmation.sentence + " ";

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => {
              const newText = prompt("Edit your affirmation:", affirmation.sentence);
              if (newText) {
                fetch(`http://localhost:8080/api/affirmations/${affirmation.id}`, {
                  method: "PUT",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ sentence: newText })
                })
                .then(res => {
                  if (!res.ok) throw new Error("Error editing affirmation.");
                  loadAffirmations();
                })
                .catch(err => {
                  alert(err.message);
                });
              }
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => {
              if (confirm("Are you sure you want to delete this affirmation?")) {
                fetch(`http://localhost:8080/api/affirmations/${affirmation.id}`, {
                  method: "DELETE",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                  }
                })
                .then(res => {
                  if (!res.ok) throw new Error("Error deleting affirmation.");
                  loadAffirmations();
                })
                .catch(err => {
                  alert(err.message);
                });
              }
            };

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            affirmationsList.appendChild(li);
          });
        }
      })
      .catch(err => {
        errorDiv.textContent = err.message;
      });
  }

  loadAffirmations();
});
