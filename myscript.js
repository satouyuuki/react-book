const sites = [];

function createData() {
  const newSiteName = document.getElementById('siteName').value;
  const newSiteURL = document.getElementById('siteURL').value;

  if (newSiteName === '' || newSiteURL === '') return;
  const siteInfo = {
    name: newSiteName,
    url: newSiteURL
  }
  sites.push(siteInfo);
  document.getElementById('siteName').value = '';
  document.getElementById('siteURL').value = '';
}

function readData() {
  const list = document.getElementById('dataList');
  list.innerHTML = '';
  for (let i = 0; i < sites.length; i++) {
    list.innerHTML += `
    <li>
      ${i} ${sites[i].name} ${sites[i].url}
    </li>
    `;
  }
}
function updateData() {
  const updateId = document.getElementById('updateId').value;
  const updateName = document.getElementById('updateName').value;
  const updateURL = document.getElementById('updateURL').value;
  if (updateName === '' || updateURL === '') return;
  sites[Number(updateId)] = {
    name: updateName,
    url: updateURL
  };
  document.getElementById('updateId').value = '';
  document.getElementById('updateName').value = '';
  document.getElementById('updateURL').value = '';
}
function deleteData() {
  const deleteId = document.getElementById('deleteId').value;
  if (deleteId === '') return;
  sites.splice(deleteId, 1);
  document.getElementById('deleteId').value = '';
}