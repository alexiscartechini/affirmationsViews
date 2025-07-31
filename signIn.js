document.getElementById('signInForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const emailAddress = document.getElementById('emailAddress').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        emailAddress,
        password
      })
    });

    if (response.ok) {
      document.getElementById('message').textContent = 'User created successfully!';
    } else {
      document.getElementById('message').textContent = 'Failed to create user.';
    }
  } catch (error) {
    console.error('Error while fetching:', error);
    const messageElement = document.getElementById('message');
    messageElement.textContent = "Sorry mate, we couldn't connect";
    messageElement.style.color = 'red';
  }
});
