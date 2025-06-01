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
      const text = await response.text();
      messageElement.textContent = "Login exitoso! 🎉 Respuesta del servidor: " + text;
      messageElement.style.color = 'green';
    } else if (response.status === 401) {
      messageElement.textContent = "Sorry, wrong username or password";
      messageElement.style.color = 'red';
    } else {
      messageElement.textContent = "Unexpected error: " + response.status;
      messageElement.style.color = 'red';
    }

  } catch (error) {
    console.error('Error al hacer fetch:', error);
    const messageElement = document.getElementById('message');
    messageElement.textContent = "No se pudo conectar con el servidor 😢";
    messageElement.style.color = 'red';
  }
});
