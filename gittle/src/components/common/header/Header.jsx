import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <h2>Gittle</h2>
      <div>
        <Link to="/">main</Link> | <Link to="/add">add</Link> |{" "}
        <Link to="/log">log</Link> |{" "}
        <Link to="/merge">merge</Link>
      </div>
    </div>
  );
}

export default Header;
