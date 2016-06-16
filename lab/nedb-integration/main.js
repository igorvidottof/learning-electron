const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = require('electron');
const Datastore = require('nedb');

const db = new Datastore({
  filename: 'test.db', autoload: true, timestampData: true 
});

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

ipcMain.on('save-user-request', (event, arg) => {
  let user = {
    name: arg.name,
    age: arg.age
  };
  db.insert(user, (err, newDoc) => {
    if(err) {
      event.sender.send('save-user-response', `An error occurred\n${err}`);
    }
    else {
      event.sender.send('save-user-response', `User inserted: ${newDoc._id}`); 
    }
  });
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(win === null) {
    createWindow();
  }
});