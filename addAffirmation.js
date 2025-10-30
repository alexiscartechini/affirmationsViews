document.getElementById('addAffirmations').addEventListener('submit', function (e) {
  e.preventDefault();

  const affirmation = document.getElementById('affirmationInput').value;
  const messageDiv = document.getElementById('message');

  const tokenObj = JSON.parse(localStorage.getItem("jwtToken"));
  const token = tokenObj?.token; 

  if (!token) {
    messageDiv.textContent = 'Please, sign in.';
    messageDiv.style.color = 'red';
    return;
  }

  console.log("JWT Token:", token);

  fetch('http://localhost:8080/api/affirmations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ sentence: affirmation })
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text || 'Failed to add affirmation');
        });
      }
      messageDiv.textContent = 'Affirmation added successfully!';
      messageDiv.style.color = 'green';
      document.getElementById('affirmationInput').value = '';
    })
    .catch(error => {
      console.error('Error:', error);
      messageDiv.textContent = 'Failed to add affirmation. Please try again.';
      messageDiv.style.color = 'red';
    });
});