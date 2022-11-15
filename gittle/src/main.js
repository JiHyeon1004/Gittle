const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { CLICK } = require("./constants");

let child_process = require("child_process");
const { check } = require("yargs");

let runCommand = (command) => {
  return child_process.execSync(command).toString();
};

let currentRepo;
let gitDir;




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
  win.webContents
    .executeJavaScript('localStorage.getItem("currentRepo");', true)
    .then((result) => {
      currentRepo = result;
      gitDir = `--git-dir=${result}\\.git`;
    });

  win.loadURL("http://localhost:3000");
  // currentRepo = localStorage.getItem("currentRepo");
  // console.log(currentRepo)
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

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

ipcMain.on("setting-currentRepo", (event, arg) => {
  console.log(arg);
  currentRepo = arg;
});

ipcMain.on("update-my-repo", (event, arg) => {
  console.log("변화시작");
  const Store = require("electron-store");
  const store = new Store();

  let arr = store.get("gittle-myRepo");
  store.delete("gittle-myRepo");

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

  // let arr = store.get("gittle-myRepo");
  let arr = localStorage.getItem("currentRepo");

  if (arr === undefined) {
    arr = [];
  }

  console.log("arr : " + arr);

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      result.push(arr[i]);
    }

    console.log(arr[i]);
  }

  if (result.length !== arr.length) {
    localStorage.setItem(result);
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
  let remoteBranchList;
  try{

    remoteBranchList = runCommand(`git --git-dir=${route}\\.git branch -r`);
  }catch(e){
    remoteBranchList=[]
    
  }
  console.log("remoteBranchList : ", remoteBranchList);
  codes.push(remoteBranchList);
  event.returnValue = codes;
});

ipcMain.on("change branch", (event, route, selectedBranch) => {
  console.log("브랜치 이동");
  console.log("selectedBranch : ", selectedBranch);

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

// ipcMain.on("gitStatus", (event, curRepo) => {
//   currentRepo = curRepo;
//   console.log("currentRepo : ", currentRepo);
//   gitDir = `--git-dir=${currentRepo}\\.git`;


//   const option = currentRepo !== null || currentRepo !== undefined ? `${gitDir} --work-tree=${currentRepo}` : ''
//   const data = runCommand(`cd ${currentRepo} && git status -u -s`);
//   event.returnValue = data;
// });

ipcMain.on("gitStatus", (event, curRepo) => {
  currentRepo = curRepo;
  console.log("currentRepo : ", currentRepo);
  gitDir = `--git-dir=${currentRepo}\\.git`;
  const a = curRepo === null ? "./" : curRepo;
  const option =
    currentRepo !== null || currentRepo !== undefined
      ? `${gitDir} --work-tree=${currentRepo}`
      : "";


  const list = runCommand(`cd ${a} && ls`).split('\n');
  const flag=false
  for(let i=0;i<list.length;i++){
    console.log(list[i])
    if(list[i]==='.git'){
      flag=true;
      break;
    }
  }
  let data;
  if(flag){
    data = runCommand(`cd ${a} && git status -u -s`);
  }else{
    data = runCommand(`cd ./ && git status -u -s`)
  }
  // const data = runCommand(`git status -u -s`);
  event.returnValue = data;
});


ipcMain.on("WriteCommitConvention", (event, payload) => {
  // if (!fs.existsSync(`${currentRepo}/commitConvention.json`)) {
  //   console.log("does not exist")
  //   fs.appendFileSync(
  //     `${currentRepo}/commitConvention.json`,
  //     "[" + JSON.stringify(payload) + "]"
  //   );
  //   const commitRules = JSON.parse(
  //     fs.readFileSync(`${currentRepo}/commitConvention.json`).toString()
  //   );
  //   event.returnValue = commitRules;
  // }
  const commitRules = JSON.parse(
    fs.readFileSync(`${currentRepo}/commitConvention.json`).toString()
  );
  commitRules.push(payload);
  fs.writeFileSync(
    `${currentRepo}/commitConvention.json`,
    JSON.stringify(commitRules)
  );
  event.returnValue = commitRules;
});

ipcMain.on("ReadCommitConvention", (event) => {
  if (!fs.existsSync(`${currentRepo}/commitConvention.json`)) {
    fs.appendFileSync(`${currentRepo}/commitConvention.json`, "[]");
  }
  const commitRules = fs
    .readFileSync(`${currentRepo}/commitConvention.json`)
    .toString();
  event.returnValue = commitRules;
});

ipcMain.on("git-Clone", (event, payload) => {
  console.log("도착했습니다");
  console.log("저장소 루트 : " + payload.cloneRoot);
  console.log("폴더 루트 : " + payload.repoRoot);
  let stringArr = payload.cloneRoot.split("/");
  for (let i = 0; i < stringArr.length; i++) {
    console.log(i, "번째 : ", stringArr[i]);
  }

  let temp = stringArr[stringArr.length - 1];
  let folderName = temp.substr(0, temp.length - 4);
  console.log("folderName : ", folderName);
  runCommand(`cd "${payload.repoRoot}" && git clone ${payload.cloneRoot}`);

  console.log("돌아갑니다");
  event.returnValue = folderName;
});

ipcMain.on("git-Init", (event, payload) => {
  console.log("repoName : " + payload.repoName);
  console.log("repoRoot : " + payload.repoRoot);
  runCommand(
    `cd "${payload.repoRoot}" && mkdir ${payload.repoName}  && cd ${payload.repoName}  && git init`
  );
  event.returnValue = payload.repoName + "\\" + payload.repoRoot;
});

ipcMain.on("check-git-folder",(event,root)=>{
  // const arr=runCommand(`cd ${root} && ls`).split('\n')

  try{
    runCommand(`cd ${root}\\.git`)
    event.returnValue='true'
  }catch(e){
    event.returnValue='false'
  }

  // let flag = false
  // for(let i=0;i<arr.length;i++){
  //   if(arr[i]==='.git'){
  //     flag=true;
  //     break;
  //   }
  // }

  // event.returnValue = flag

})

ipcMain.on("gitDiff", (event, arg) => {
  console.log("코드 전후 비교해볼래");
  console.log(arg);
  const codes = [];
  arg.map((file) => {
    // const name = file.split("/");
    // const fileName = name[name.length - 1];
    let diff = runCommand(`git -C ${currentRepo} diff ${file}`);
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
ipcMain.on("gitAdd", (event, files) => {
  let data = runCommand(`cd ${currentRepo} && git add ${files}`);
  console.log(data);
});

ipcMain.on("gitReset", (event, files) => {
  let data = runCommand(`git -C ${currentRepo} reset ${files}`);
  console.log(data);
});

ipcMain.on("git-Branch", (event, payload) => {
  try{
    let data = runCommand(`cd "${payload}" && git branch -r`);
    let result = data.split("\n");
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].length !== 0) {
        let tempArr = result[i].split("/");
        let temp = "";
        for (let j = 1; j < tempArr.length; j++) {
          temp += tempArr[j];
          if (j !== tempArr.length - 1) {
            temp += "/";
          }
        }

        arr.push(temp);
      }
    }
    event.returnValue = arr;
  }catch(e){
    event.returnValue=[]
  }

  
});

ipcMain.on("gitBranch", (event, route) => {
  console.log("현재 작업 중인 브랜치를 보여줘");
  console.log(route);
  let branch = runCommand(
      `git --git-dir=${route}\\.git branch --show-current `
    );
  console.log("브랜치이이이", branch);
  event.returnValue = branch;
});

ipcMain.on("gitCommit", (event, commitMessage) => {
  let data = runCommand(`git -C ${currentRepo} commit -m ${commitMessage}`);
  console.log(data);
  event.returnValue = data;
});

ipcMain.on("lastCommitDescription", (event, command) => {
  let data;
  try {
    data = runCommand(command);
    data = data.substring(1, data.length - 1);
    data = data.includes(" : ") ? data.split(" : ")[1] : data;
  } catch (error) {
    console.error(error);
    data = "";
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

ipcMain.on("git-Push", (event, payload) => {
  console.log("repo입니다 : ", payload.repoRoot);
  console.log("브랜치입니다 : ", payload.branch);
  
  try{
    runCommand(`cd "${payload.repoRoot}" && git push origin ${payload.branch}`);
    event.returnValue = "return";
  }catch(exception){
    console.log('오류가 발생했습니다.')
    console.log(exception)
    event.returnValue = "error";
  }

  console.log("완료되었습니다");
  
});

ipcMain.on("call-committed-files", (event, root) => {
  const commitIdList = runCommand(`cd "${root}" && git log -1`);
  let temp1 = commitIdList.split("\n")[0];
  let tempArr = temp1.split(" ");

  let commitId = tempArr[1];

  //실행
  const returnArr = runCommand(
    `cd "${root}" && git show --pretty="" --name-only ${commitId}`
  );
  event.returnValue = returnArr;
});

ipcMain.on("gitbash", (event, currentRepo) => {
  child_process.exec(
    `cd ${currentRepo} && start "" "%PROGRAMFILES%\\Git\\bin\\sh.exe" --login`
  );
});

ipcMain.on("gitStash", (event, route) => {
  console.log("gitStash");
  console.log("cur", route);
  const stash = runCommand(`git --git-dir=${route}\\.git stash`);
  console.log("gitStash", stash);
  event.returnValue = stash;
});
