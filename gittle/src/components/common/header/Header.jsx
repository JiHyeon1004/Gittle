import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GitPull from "./GitPull";
import HelpGuide from "./HelpGuide";
import MenuBar from "./MenuBar";
import styles from "./Header.module.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;
  return (
    <div className={styles.container}>
      <div className={styles.gittleLogo}>
        <div onClick={() => navigate("/")}>
          <span className={`${styles.title} ${styles.title1}`}>Git</span>
          <span className={`${styles.title} ${styles.title2}`}>tle</span>
        </div>
      </div>
      <MenuBar />
      <div className={styles.box}>
        <GitPull />
        <HelpGuide />
      </div>
    </div>
  );
}

export default Header;
