const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });
  ipcMain.handle("ping", () => "pong");
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

// 추가 창 생성 방지
// app.on("web-contents-created", (event, contents) => {
//   contents.setWindowOpenHandler(({ url }) => {
//     if (isSafeForExternalOpen(url)) {
//       setImmediate(() => {
//         shell.openExternal(url);
//       });
//     }
//     return { action: "deny" };
//   });
// });
