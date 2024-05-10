const baseURL = 'http://localhost:8000/api';

eventlisteners();

function eventlisteners() {
  let token;

  const purchaseList = document.getElementById('licenceList');

  window.addEventListener('DOMContentLoaded', function () {
    token = localStorage.getItem('softLicence');
    if (!token) return window.location.replace('./Login.html');

    fetch(`${baseURL}/purchase-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          console.log('data', data);
          let html = '';
          let expDate = new Date();
          data.purchases.forEach((license) => {
            expDate.setFullYear(
              new Date(license.created_at).getFullYear() +
                parseInt(license.licenseTerm.split(' ')[0])
            );
            html += `
                <tr id='${license._id}'>
                    <td>${license.selectedSoftware}</td>
                    <td>${license.licenseKey}</td>
                    <td>${new Date(
                      license.created_at
                    ).toLocaleDateString()} </td>
                    <td>${expDate.toLocaleDateString()} </td>
                    <td>${new Date() <= expDate ? 'Active' : 'Expired'}</td>
                </tr>
            `;
          });

          purchaseList.innerHTML = html;
        } else {
          alert(`Error: ${response.statusText}`);
        }
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  });

  const purchaseForm = document.getElementById('purchase-form');

  purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);

    const formData = {
      selectedSoftware: e.target.elements.selectedSoftware.value,
      licenseTerm: e.target.elements.licenseTerm.value,
      quantity: e.target.elements.quantity.value,
    };

    fetch(`${baseURL}/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) window.location.replace('./MyLicenses.html');
        else alert(`Error: ${response.statusText}`);
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  });

  const reNewLicense = document.getElementById('renew-form');

  reNewLicense.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);

    const formData = {
      licenseKey: e.target.elements.licenseKey.value,
      renewalTerm: e.target.elements.renewalTerm.value,
    };

    fetch(`${baseURL}/renew-license`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) window.location.replace('./MyLicenses.html');
        else alert(`Error: ${response.statusText}`);
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  });
}
