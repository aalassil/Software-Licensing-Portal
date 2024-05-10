const baseURL = 'http://localhost:8000/api';

const form = document.getElementById('signupForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e);

  const formData = {
    firstName: e.target.elements.firstName.value,
    lastName: e.target.elements.lastName.value,
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
    username: e.target.elements.username.value,
    role: e.target.elements.role.value,
    contact: e.target.elements.contact.value,
  };

  fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        alert(`${formData.role} created successfully, login to get access`);
        window.location.replace('./Login.html');
      } else {
        alert(`Error: ${response.statusText}`);
      }
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });
});
