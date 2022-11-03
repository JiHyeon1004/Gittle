import React from "react";
import GitLog from "../components/logPage/GitLog";
import styles from "./LogPage.module.css";

function LogPage() {
  return (
    <div className={styles.container}>
      <p>log</p>
      <GitLog />
    </div>
  );
}

export default LogPage;
