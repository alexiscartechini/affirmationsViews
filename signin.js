document.getElementById('signinForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const emailAddress = document.getElementById('emailAddress').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageElement = document.getElementById('message');

  if (password !== confirmPassword) {
    messageElement.textContent = "Passwords do not match.";
    messageElement.style.color = 'red';
    return;
  }

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
      messageElement.textContent = 'User created successfully!';
      messageElement.style.color = 'green';
    } else if (response.status === 409) {
    messageElement.textContent = 'User already exists.';
    messageElement.style.color = 'red';
    } else {
      messageElement.textContent = 'Failed to create user.';
      messageElement.style.color = 'red';
    }
  } catch (error) {
    console.error('Error while fetching:', error);
    messageElement.textContent = "Sorry mate, we couldn't connect";
    messageElement.style.color = 'red';
  }
});
