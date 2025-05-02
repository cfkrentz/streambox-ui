const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let childProcess = null; 

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: false,
    kiosk: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile(path.join(__dirname, '../public/index.html'));
}

ipcMain.on('launch-app', (event, command) => {
  childProcess = exec(command);
  childProcess.on('exit', () => {
    event.sender.send('app-closed');
    childProcess = null;
  });
});

ipcMain.on('kill-app', () => {
  if (childProcess) {
    childProcess.kill('SIGTERM');
    childProcess = null;
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
