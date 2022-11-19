import React,{useState} from "react";
import { Link, useLocation } from "react-router-dom";
import GitHelp from "./GitHelp";
import GitPull from "./GitPull";
import Button from "./Button"
import styles from "./Header.module.css";
import { useRecoilState } from "recoil";
import {pushBtn  } from "../../../atoms";
import TerminalButton from "./TerminalButton";

function Header() {
  const location = useLocation();
  
  // const [selectedPage,SetSelectedPage]= useState("add")
  const [selectedPage,SetSelectedPage]= useRecoilState(pushBtn)
  
  const changeSelectedPage=(arg)=>{
    SetSelectedPage(arg)
  }

  if (location.pathname === "/") return null;
  return (
    <div className={styles.container}>
      <h2>
        <Link to="/">
          <img
            className={styles.gittleLogo}
            src={process.env.PUBLIC_URL + "/gittle_logo.png"}
            alt="gittle-logo"
          />
        </Link>
      </h2>
      <div className={styles.buttonBox}>
        <div className={styles.localToRemote}>
          <Button page="add" whenClick={changeSelectedPage} selPage={selectedPage}></Button>
          
          <Button page="push" whenClick={changeSelectedPage} selPage={selectedPage}></Button>
          
          <Button page="merge/ready" whenClick={changeSelectedPage} selPage={selectedPage}></Button>
        </div>
        <div className={styles.log}>
          <Button  page="merge/request" whenClick={changeSelectedPage} selPage={selectedPage}></Button>
          <Button  page="log" whenClick={changeSelectedPage} selPage={selectedPage}></Button>
        </div>
      </div>
      <div className={styles.box}>
        <TerminalButton /> 
        <GitHelp />
        <GitPull />
      </div>
    </div>
  );
}

export default Header;
