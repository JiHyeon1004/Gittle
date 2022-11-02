import React from "react";
import { ipcRenderer } from "electron";

ipcRenderer.send('github-oauth', 'getToken');

function OauthPage() {
  return (
    <div>
      <p>로그인페이지</p>
    </div>
  );
}

export default OauthPage;
