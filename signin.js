document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signinForm');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const messageElement = document.getElementById('message');

  const criteria = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    noSpace: document.getElementById('noSpace')
  };

  passwordInput.addEventListener('input', function () {
    const value = passwordInput.value;

    toggleValid(criteria.length, value.length >= 8);
    toggleValid(criteria.uppercase, /[A-Z]/.test(value));
    toggleValid(criteria.lowercase, /[a-z]/.test(value));
    toggleValid(criteria.number, /[0-9]/.test(value));
    toggleValid(criteria.noSpace, !/\s/.test(value));
  });

  function toggleValid(element, isValid) {
    element.style.color = isValid ? 'green' : 'red';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      /\s/.test(password)
    ) {
      messageElement.textContent = "Password doesn't meet the criteria.";
      messageElement.style.color = 'red';
      return;
    }

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
});
