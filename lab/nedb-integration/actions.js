const {ipcRenderer} = require('electron');

// insert a document
let btnSaveUser = document.getElementById('save-user');

btnSaveUser.addEventListener('click', () => {
  let user = {};
  user.name = document.getElementById('name').value;
  user.age = document.getElementById('age').value;
  ipcRenderer.send('save-user-request', user);
});

ipcRenderer.on('save-user-response', (event, arg) => {
  alert(arg);
});

// find documents by field name
let btnFindUsers = document.getElementById('find-users');

btnFindUsers.addEventListener('click', () => {
  let searchedName = document.getElementById('search').value;
  ipcRenderer.send('find-users-request', searchedName);
});

ipcRenderer.on('find-users-response', (event, arg) => {
  // handle errors must come here
  let divResp = document.getElementById('found-docs');
  divResp.textContent = '';
  if(arg.length) {
    arg.forEach(function(value) {
      let p = document.createElement('p');
      p.textContent = JSON.stringify(value);
      divResp.appendChild(p);
    });
  }
  else {
    divResp.textContent = 'No documents found';
  }
});