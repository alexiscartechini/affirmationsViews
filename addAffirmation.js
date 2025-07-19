document.getElementById('addAffirmations').addEventListener('submit', function (e) {
  e.preventDefault();

  const affirmation = document.getElementById('affirmationInput').value;
  const messageDiv = document.getElementById('message');

  fetch('http://localhost:8080/api/affirmations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ sentence: affirmation })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add affirmation');
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
