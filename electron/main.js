const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let childProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile(path.join(__dirname, '../public/index.html'));

  win.once('ready-to-show', () => {
    win.setFullScreen(true);
    win.setKiosk(true);
    win.show();
  });
}

function registerShortcuts() {
  const success = globalShortcut.register('Home', () => {
    console.log('Home key pressed via globalShortcut');

    if (childProcess) {
      childProcess.kill('SIGTERM');
      childProcess = null;
    }

    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      win.webContents.send('app-closed');
    }
  });

  if (!success) {
    console.warn('Failed to register Home shortcut');
  }
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

app.disableHardwareAcceleration();

app.whenReady().then(() => {
  createWindow();
  registerShortcuts();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll(); // clean up
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
