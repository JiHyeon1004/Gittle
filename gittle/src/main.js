

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

ipcMain.on('update-my-repo',(event,arg)=>{
    console.log('변화시작')
    const Store=require('electron-store')
    const store = new Store()

    
    let arr =store.get('gittle-myRepo')

    if(arr===undefined){
      
      arr=[]
    }

    arr.unshift(arg)

    if(arr.length===4){
      arr.pop()
    }

    console.log('arr입니다 : '+arr.length)
    for(let i=0;i<arr.length;i++){
      console.log(arr[i])
    }
    store.set('gittle-myRepo',arr)
})




ipcMain.on('call-my-repo',(event,arg)=>{
  console.log('가져오기 시작')
  const Store=require('electron-store')
  const store = new Store()

  let arr = store.get('gittle-myRepo')

  if(arr===undefined){
    arr=[]
  }
  console.log(arr)
  console.log('돌아갑니다')
  event.returnValue=arr
  
})



app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
