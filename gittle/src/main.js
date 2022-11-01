const { app, BrowserWindow,ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  });
  require('@electron/remote/main').initialize()
  require("@electron/remote/main").enable(win.webContents);
  win.loadURL("http://localhost:3000");
}






app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
