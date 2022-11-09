import React from "react";

const { ipcRenderer } = window.require("electron");
function TerminalButton() {
  return (
    <>
      <button><img style={{ width: "40px", height: "40px" }}
      src={process.env.PUBLIC_URL + '/icons/terminal.png'} 
      alt="terminal" onClick={() => {ipcRenderer.send("gitbash")}} />
      <br/>
      터미널
      </button>
    </>
  );
}

export default TerminalButton;
