function renderAffirmationItem(affirmation) {
  const li = document.createElement("li");
  li.className = "bg-white rounded-lg shadow p-4 flex justify-between items-center";

  const text = document.createElement("span");
  text.textContent = affirmation.sentence;
  text.className = "text-gray-800";

  const actions = document.createElement("div");
  actions.className = "flex gap-2";

  const editBtn = document.createElement("button");
  editBtn.className = "btn-primary";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-danger";
  deleteBtn.textContent = "Delete";

  actions.append(editBtn, deleteBtn);
  li.append(text, actions);

  return { li, editBtn, deleteBtn };
}

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Error loading affirmations");
        return res.json();
      })
      .then(data => {
        if (!data.length) {
          affirmationsList.innerHTML =
            "<li class='text-gray-500'>No affirmations found.</li>";
          return;
        }

        data.forEach(affirmation => {
          const { li, editBtn, deleteBtn } =
            renderAffirmationItem(affirmation);

          editBtn.onclick = () => editAffirmation(affirmation);
          deleteBtn.onclick = () => deleteAffirmation(affirmation.id);

          affirmationsList.appendChild(li);
        });
      })
      .catch(err => {
        errorDiv.textContent = err.message;
      });
  }

  function editAffirmation(affirmation) {
    const newText = prompt("Edit your affirmation:", affirmation.sentence);
    if (!newText) return;

    fetch(`http://localhost:8080/api/affirmations/${affirmation.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: newText }),
    }).then(loadAffirmations);
  }

  function deleteAffirmation(id) {
    if (!confirm("Are you sure you want to delete this affirmation?")) return;

    fetch(`http://localhost:8080/api/affirmations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(loadAffirmations);
  }

  loadAffirmations();
});