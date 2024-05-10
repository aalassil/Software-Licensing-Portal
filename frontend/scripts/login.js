const baseURL = 'http://localhost:8000/api';

const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e);

  const formData = {
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
  };

  fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('softLicence', data.Token);
        if (data.Role === 'client')
          window.location.replace('./MyLicenses.html');
        else window.location.replace('./dash.html');
      } else {
        alert(`Error: ${response.statusText}`);
      }
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });
});
