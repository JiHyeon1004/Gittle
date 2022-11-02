import React from "react";
import { ipcRenderer } from "electron";
import * as types from './store/mutation-types';


ipcRenderer.send('github-oauth', 'getToken');

function OauthPage() {
  return (
    <div>
      <p>로그인페이지</p>
    </div>
  );
}

export const init = (store) => {
  ipcRenderer.on('github-oauth-reply', (evenet, { access_token }) => {
    store.commit(types.SET_ACCESS_TOKEN, access_token);
    store.dispatch('getUser').then(user => {
      store.commit(types.AUTHENTICATED, user);
    });
  });
}
