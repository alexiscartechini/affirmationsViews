document.getElementById('addAffirmations').addEventListener('submit', function (e) {
  e.preventDefault();

  const affirmation = document.getElementById('affirmationInput').value;

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
      alert('Affirmation added!');
      document.getElementById('affirmationInput').value = '';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Something went wrong!');
    });
});
