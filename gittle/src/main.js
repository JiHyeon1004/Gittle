const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");


let child_process = require("child_process")


let runCommand = (command) => {
  return child_process.execSync(command).toString()
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL("http://localhost:3000");
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on('gitStatus', (event, payload) => {
  let data = runCommand("git status -u -s")
  console.log('git status : \n', data)
  // replyInputValue 송신 또는 응답
  event.returnValue = data
})