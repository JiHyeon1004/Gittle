const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { CLICK } = require("./constants");

let child_process = require("child_process");

let runCommand = (command) => {
  return child_process.execSync(command).toString();
};

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  win.loadURL("http://localhost:3000");
}

ipcMain.on(CLICK, (event, arg) => {
  dialog
    .showOpenDialog({ properties: ["openDirectory"] })
    .then((result) => {
      console.log(result.filePaths[0]);

      event.returnValue = result.filePaths[0];
    })
    .catch((err) => {
      console.log("에러발생", err);
    });
});

ipcMain.on("update-my-repo", (event, arg) => {
  console.log("변화시작");
  const Store = require("electron-store");
  const store = new Store();

  let arr = store.get("gittle-myRepo");

  if (arr === undefined) {
    arr = [];
  }

  arr.unshift(arg);

  if (arr.length === 4) {
    arr.pop();
  }

  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  store.set("gittle-myRepo", arr);
});

ipcMain.on("call-my-repo", (event, arg) => {
  console.log("가져오기 시작");
  const Store = require("electron-store");
  const store = new Store();

  let arr = store.get("gittle-myRepo");

  if (arr === undefined) {
    arr = [];
  }

  console.log("arr : " + arr);

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    // if(arr[i]===null){
    //   arr=[]
    // }
    if (arr[i] !== null) {
      result.push(arr[i]);
    }

    console.log(arr[i]);
  }

  if (result.length !== arr.length) {
    store.set("gittle-myRepo", result);
  }

  console.log(result.length);
  console.log(result);
  console.log("돌아갑니다");
  event.returnValue = result;
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("gitStatus", (event, payload) => {
  let data = runCommand("git status -u -s");
  console.log("git status : \n", data);
  // replyInputValue 송신 또는 응답
  event.returnValue = data;
});

ipcMain.on("git-Clone", (event, payload) => {
  console.log("도착했습니다요요요용");
  console.log("저장소 루트 : " + payload.cloneRoot);
  console.log("폴더 루트 : " + payload.repoRoot);
  let path = runCommand(
    `cd "${payload.repoRoot}" && git clone ${payload.cloneRoot}`
  );
  console.log("path : " + path);
});

ipcMain.on("git-Init", (event, payload) => {
  let start = runCommand(`cd "${payload.repoRoot}" && git init`);
  console.log("start : " + start);
});

ipcMain.on("gitDiff", (event, arg) => {
  console.log("코드 전후 비교해볼래");
  console.log(arg);
  const codes = [];
  arg.map((file) => {
    let diff = runCommand(`git diff ${file}`);
    console.log("git diff : ", diff);
    codes.push(diff);
  });
  event.returnValue = codes;
  // const Store=require('electron-store')
  // const store = new Store()

  // let arr = store.get('gittle-myRepo')

  // if(arr===undefined){
  //   arr=[]
  // }
  // console.log(arr)
  // console.log('돌아갑니다')
  // event.sender.send('return-2',arr)
});
ipcMain.on("gitAdd", (event, payload) => {
  let data = runCommand(payload);
  console.log(data);
  // replyInputValue 송신 또는 응답
});

ipcMain.on("gitReset", (event, payload) => {
  let data = runCommand(payload);
  console.log(data);
  // replyInputValue 송신 또는 응답
});

ipcMain.on("gitBranch", (event, route) => {
  console.log("현재 작업 중인 브랜치를 보여줘");
  console.log(route);
  const branch = runCommand(
    `git --git-dir=${route}\\.git branch --show-current `
  );
  console.log("브랜치이이이", branch);
  event.returnValue = branch;
});
