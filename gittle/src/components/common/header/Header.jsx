import React from "react";
import { Link, useLocation } from "react-router-dom";
import GitHelp from "./GitHelp";
import GitPull from "./GitPull";
import styles from "./Header.module.css";
import TerminalButton from "./TerminalButton";

function Header() {
  const location = useLocation();
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
      <div>
        <Link to="/add">add</Link> | <Link to="/oauth">oauth</Link> |{" "}
        <Link to="/log">log</Link> | <Link to="/merge/ready">merge</Link> |{" "}
        <Link to="/push">push</Link> |{" "}
        <Link to="/merge/request">merge request</Link>
      </div>
      <TerminalButton />
      <GitHelp/>
      <GitPull />
    </div>
  );
}

export default Header;
