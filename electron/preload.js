const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  launchApp: (cmd) => ipcRenderer.send('launch-app', cmd),
  onAppClosed: (callback) => ipcRenderer.on('app-closed', callback),
  killApp: () => ipcRenderer.send('kill-app')
});