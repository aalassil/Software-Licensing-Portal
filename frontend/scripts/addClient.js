const baseURL = 'http://localhost:8000/api';

eventlisteners();

function eventlisteners() {
  let token;

  window.addEventListener('DOMContentLoaded', function () {
    token = localStorage.getItem('softLicence');
    if (!token) return window.location.replace('./Login.html');

    var currentDate = new Date();

    // Calculate the minimum allowed date as the next month from the current date
    var minDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    var minDateString = minDate.toISOString().slice(0, 7); // Format as 'YYYY-MM'

    // Set the min attribute of the input element
    document.getElementById('Expiry').setAttribute('min', minDateString);
  });

  const clientForm = document.getElementById('addClientForm');

  clientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);

    const formData = {
      fullName: e.target.elements.fullName.value,
      username: e.target.elements.username.value,
      softwareName: e.target.elements.softwareName.value,
      expirationDate: e.target.elements.expirationDate.value,
    };

    console.log('formData', formData);

    fetch(`${baseURL}/addClient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) window.location.replace('./dash.html');
        else alert(`Error: ${response.statusText}`);
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  });
}
