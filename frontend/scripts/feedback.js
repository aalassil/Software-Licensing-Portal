const baseURL = 'http://localhost:8000/api/save-feedback';

const form = document.getElementById('feedbackForm');

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
        alert('Feedback sent successfully!');
        // Redirect or perform any actions on success
      } else {
        alert(`Error: ${response.statusText}`);
      }
    })
    .catch(error => {
      alert(`Error: ${error}`);
    });
});
