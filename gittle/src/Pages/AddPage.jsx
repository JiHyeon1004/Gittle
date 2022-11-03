import React from "react";
import GitDiff from "../components/addPage/GitDiff";
import StatusComp from "../components/addPage/StatusComp";
import styles from "./AddPage.module.css";

function AddPage() {
  return (
    <div className={styles.container}>
      <p>add</p>
      <GitDiff />
      <StatusComp />
    </div>
  );
}

export default AddPage;
