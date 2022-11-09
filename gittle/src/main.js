const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { CLICK } = require("./constants");

let child_process = require("child_process");
const { check } = require("yargs");

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

  console.log("arr입니다 : " + arr.length);
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
  console.log(arr);
  console.log("돌아갑니다");
  event.returnValue = arr;
});

ipcMain.on("call-my-repo-2", (event, arg) => {
  console.log("가져오기 시작");
  const Store = require("electron-store");
  const store = new Store();

  let arr = store.get("gittle-myRepo");

  if (arr === undefined) {
    arr = [];
  }
  console.log(arr);
  console.log("돌아갑니다");
  event.sender.send("return-2", arr);
});

ipcMain.on("branchList", (event, route) => {
  console.log("브랜치 리스트");

  const codes = [];
  let branchList = runCommand(`git --git-dir=${route}\\.git branch -a`);
  console.log("branchList : ", branchList);
  codes.push(branchList);
  event.returnValue = codes;
});

ipcMain.on("change branch", (event, route, selectedBranch) => {
  console.log("브랜치 이동");

  const codes = [];
  let branch = runCommand(
    `git --git-dir=${route}\\.git checkout ${selectedBranch}`
  );
  console.log("change branch : ", branch);
  codes.push(branch);
  event.returnValue = codes;
});

// ipcMain.on("gitBranch", (event, newBranch, baseBranch) => {
ipcMain.on("add branch", (event, route, newBranch) => {
  console.log("브랜치 추가");

  const codes = [];
  // let branch = runCommand(`git checkout -b ${newBranch} ${baseBranch}`);
  let branch = runCommand(
    `git --git-dir=${route}\\.git checkout -b ${newBranch}`
  );
  console.log("add branch : ", branch);
  codes.push(branch);
  event.returnValue = codes;
});

ipcMain.on("delete branch", (event, route, delBranch) => {
  console.log("브랜치 삭제");

  const codes = [];
  let branch = runCommand(
    `git --git-dir=${route}\\.git branch -d ${delBranch}`
  );
  console.log("delete branch : ", branch);
  codes.push(branch);
  event.returnValue = codes;
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
