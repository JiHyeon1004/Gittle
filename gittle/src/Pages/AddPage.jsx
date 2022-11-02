import React from "react";
import GitDiff from "../components/addPage/GitDiff";
import styles from "./AddPage.module.css";

function AddPage() {
  return (
    <div className={styles.container}>
      <p>add</p>
      <GitDiff />
    </div>
  );
}

export default AddPage;
