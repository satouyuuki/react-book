// const sites = [];

function createData() {
  const newSiteName = document.getElementById('siteName').value;
  const newSiteURL = document.getElementById('siteURL').value;

  if (newSiteName === '' || newSiteURL === '') return;
  const siteInfo = {
    name: newSiteName,
    url: newSiteURL
  }
  fetch('http://localhost:3000/sites', {
    method: 'post',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(siteInfo)
  })
    .then(() => {
      document.getElementById('siteName').value = '';
      document.getElementById('siteURL').value = '';
    })
    .catch((err) => console.log(err));
}

function readData() {
  const list = document.getElementById('dataList');
  list.innerHTML = '';
  fetch('http://localhost:3000/sites')
    .then((res) => res.json())
    .then((sites) => {
      console.log(sites)
      for (let i = 0; i < sites.length; i++) {
        list.innerHTML += `
        <li>
          ${sites[i].id} ${sites[i].name} ${sites[i].url}
        </li>
        `;
      }
  })

}
function updateData() {
  const updateId = document.getElementById('updateId').value;
  const updateName = document.getElementById('updateName').value;
  const updateURL = document.getElementById('updateURL').value;
  if (updateName === '' || updateURL === '') return;
  const updateSite =  {
    name: updateName,
    url: updateURL
  };
  fetch(`http://localhost:3000/sites/${updateId}`, {
    method: 'put',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updateSite)
  })
    .then(() => {
      document.getElementById('updateId').value = '';
      document.getElementById('updateName').value = '';
      document.getElementById('updateURL').value = '';
  })

}
function deleteData() {
  const deleteId = document.getElementById('deleteId').value;
  if (deleteId === '') return;
  fetch(`http://localhost:3000/sites/${deleteId}`, {
    method: 'delete',
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(() => {
      document.getElementById('deleteId').value = '';    
    })
}