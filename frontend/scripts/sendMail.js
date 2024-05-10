const baseURL = 'http://localhost:8000/api/sendMail';

const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = {
    name: e.target.elements.name.value,
    phone: e.target.elements.phone.value,
    email: e.target.elements.email.value,
    subject: e.target.elements.subject.value,
    message: e.target.elements.message.value,
  };

  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(async response => {
      if (response.ok) {
        alert('Message sent successfully!');
        // Redirect or do something on success if needed
      } else {
        alert(`Error: ${response.statusText}`);
      }
    })
    .catch(error => {
      alert(`Error: ${error}`);
    });
});
