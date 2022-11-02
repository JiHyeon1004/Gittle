
const { app, BrowserWindow,ipcMain,dialog } = require("electron");
const path = require("path");
const fs = require('fs')
const {CLICK}=require('./constants')


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
  win.loadURL("http://localhost:3000");
}

ipcMain.on(CLICK,(event,arg)=>{
  
  dialog.showOpenDialog({ properties: ['openDirectory'] })
  .then(result => {
      console.log(result.filePaths[0])

      event.returnValue=result.filePaths[0]
  })
  .catch(err=>{
    console.log('에러발생',err)
  })
})


app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
