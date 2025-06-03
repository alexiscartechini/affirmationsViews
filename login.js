document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const basicAuth = 'Basic ' + btoa(username + ':' + password);

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
        username: username,
        password: password
      })
    });

    const messageElement = document.getElementById('message');

    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("jwtToken", token);
      window.location.href = "menu.html";
    } else if (response.status === 401) {
      messageElement.textContent = "Sorry, wrong username or password";
      messageElement.style.color = 'red';
    } else {
      messageElement.textContent = "Unexpected error: " + response.status;
      messageElement.style.color = 'red';
    }

  } catch (error) {
    console.error('Error while fetching:', error);
    const messageElement = document.getElementById('message');
    messageElement.textContent = "Sorry mate, we couldn't connect";
    messageElement.style.color = 'red';
  }
});
