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
    icon: path.join(__dirname, "../public/apple.png"),
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

ipcMain.on("localBranchList", (event, route) => {
  console.log("로컬 브랜치 리스트");

  const codes = [];
  let localBranchList = runCommand(`git --git-dir=${route}\\.git branch -l`);
  console.log("localBranchList : ", localBranchList);
  codes.push(localBranchList);
  event.returnValue = codes;
});

ipcMain.on("remoteBranchList", (event, route) => {
  console.log("리모트 브랜치 리스트");

  const codes = [];
  let remoteBranchList = runCommand(`git --git-dir=${route}\\.git branch -r`);
  console.log("remoteBranchList : ", remoteBranchList);
  codes.push(remoteBranchList);
  event.returnValue = codes;
});

ipcMain.on("change branch", (event, route, selectedBranch) => {
  console.log("브랜치 이동");

  const codes = [];
  let branch = runCommand(
    // `cd "${route}" && git init && git checkout ${selectedBranch}`
    `git --git-dir=${route}\\.git checkout ${selectedBranch}`
  );
  console.log("change branch : ", branch);
  codes.push(branch);
  event.returnValue = codes;
});

// ipcMain.on("gitBranch", (event, newBranch, baseBranch) => {
ipcMain.on("create branch", (event, route, newBranch) => {
  console.log("브랜치 생성");

  const codes = [];
  // let branch = runCommand(`git checkout -b ${newBranch} ${baseBranch}`);
  let branch = runCommand(
    `git --git-dir=${route}\\.git checkout -b ${newBranch}`
  );
  console.log("add branch : ", branch);
  codes.push(branch);
  event.returnValue = codes;
});

ipcMain.on("delete localBranch", (event, route, delBranch) => {
  console.log("로컬 브랜치 삭제");

  const codes = [];
  let branch = runCommand(
    `git --git-dir=${route}\\.git branch -d ${delBranch}`
  );
  console.log("delete branch : ", branch);
  codes.push(branch);
  event.returnValue = codes;
});

ipcMain.on("remoteRepository", (event, route) => {
  console.log("remote repository");
  const codes = [];
  let remote = runCommand(`git --git-dir=${route}\\.git remote`);
  codes.push(remote);
  event.returnValue = codes;
});

ipcMain.on("delete remoteBranch", (event, route, delBranch) => {
  console.log("리모트 브랜치 삭제");

  const codes = [];
  let branch = runCommand(
    `git --git-dir=${route}\\.git push origin -d ${delBranch}`
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

//이거 exe 로 만들면 현재 디렉토리가 어디지?
ipcMain.on("WriteCommitConvention", (event, payload) => {
  if (!fs.existsSync("./asdf/commitConvention.json")) {
    fs.appendFileSync(
      "./asdf/commitConvention.json",
      "[" + JSON.stringify(payload) + "]"
    );
    const commitRules = JSON.parse(
      fs.readFileSync("./asdf/commitConvention.json").toString()
    );
    event.returnValue = commitRules;
  } else {
    const commitRules = JSON.parse(
      fs.readFileSync("./asdf/commitConvention.json").toString()
    );
    commitRules.push(payload);
    fs.writeFileSync(
      "./asdf/commitConvention.json",
      JSON.stringify(commitRules)
    );
    event.returnValue = commitRules;
  }
});

ipcMain.on("ReadCommitConvention", (event) => {
  if (!fs.existsSync("./asdf/commitConvention.json")) {
    //fs.appendFileSync("./asdf/commitConvention.json","[]");
    console.log("temp");
    event.returnValue = "empty";
  } else {
    const commitRules = fs
      .readFileSync("./asdf/commitConvention.json")
      .toString();
    console.log(commitRules);
    console.log(typeof commitRules);
    event.returnValue = commitRules;
  }
});

ipcMain.on("git-Clone", (event, payload) => {
  console.log("도착했습니다");
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
    // const name = file.split("/");
    // const fileName = name[name.length - 1];
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
ipcMain.on("gitCommit", (event, payload) => {
  let data = runCommand(payload);
  console.log(data);
  event.returnValue = data;
});
ipcMain.on("lastCommitDescription", (event, payload) => {
  let data;
  try {
    data = runCommand(payload).split(" : ")[1];
  } catch (error) {
    console.error(error);
    data = "empty";
  }
  event.returnValue = data;
});

ipcMain.on("gitPull", (event, route, targetBranch) => {
  console.log("gitPull");
  const pull = runCommand(
    `git --git-dir=${route}\\.git pull --set-upstream origin ${targetBranch}`
  );
  console.log("pull", pull);
  event.returnValue = pull;
});
