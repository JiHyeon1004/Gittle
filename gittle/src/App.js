import { Link, Route, Routes, useLocation } from "react-router-dom";
import { app, ipcMain, BrowserWindow, Menu } from 'electron';
import Main from "./Pages/MainPage";
import Add from "./Pages/AddPage";
import Oauth from "./Pages/OauthPage";
import electronOauth2 from "electron-oauth2";

function App() {

  const eletronOauth2 = require('electron-oauth2');
  const oauthConfig = require('./config').oauth;
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  };
  const githubOauth = electronOauth2(oauthConfig, windowParams);

  ipcMain.on('github-oauth', (event, arg) => {
    githubOauth.getAccessToken({})
      .then(token => {
        event.sender.send('github-oauth-reply', token);
      }, err => {
        console.log('Error while getting token', err);
      });
  });





  const location = useLocation();
  return (
    <div>
      <Link to="/main">main</Link> | <Link to="/add">add</Link> | <Link to="/oauth">oauth</Link>
      <Routes location={location}>
        <Route path="/main" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/oauth" element={<Oauth />} />
      </Routes>
    </div>
  );
}

export default App;
