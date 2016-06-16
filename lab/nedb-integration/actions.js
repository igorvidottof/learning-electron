const {ipcRenderer} = require('electron');

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