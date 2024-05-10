const baseURL = 'http://localhost:8000/api';

eventlisteners();

function eventlisteners() {
  let token;
  const clientList = document.getElementById('clientList');

  window.addEventListener('DOMContentLoaded', function () {
    token = localStorage.getItem('softLicence');
    if (!token) return window.location.replace('./Login.html');

    fetch(`${baseURL}/viewClients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          console.log('cliwent data', data);

          if (data.providers.length === 0) {
            return (clientList.innerHTML = `
             <hr />
                 <h3 class="error">You Do Not have any clients at the moment</h3>`);
          }
          let html = `
           <table>
            <thead>
            <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Software Name</th>
                <th>Licence Key</th>
            </tr>
            </thead>
            <tbody>
      `;

          data.providers.forEach((provider) => {
            html += `
                  <tr id='${provider._id}'>
                      <td>${provider.fullName}</td>
                      <td>${provider.providerEmail}</td>
                      <td>${provider.softwareName}</td>
                      <td>${provider.licenseKey}</td>
                  </tr>
              `;
          });

          clientList.innerHTML = `${html}</tbody></table>`;
        } else {
          alert(`Error: ${response.statusText}`);
        }
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  });
}
