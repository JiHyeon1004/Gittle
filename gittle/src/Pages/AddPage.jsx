import React from "react";
import GitDiff from "../components/addPage/GitDiff";
import StatusComp from "../components/addPage/StatusComp";
import styles from "./AddPage.module.css";

function AddPage() {
  return (
    <div className={styles.container}>
      <GitDiff />
      <StatusComp />
    </div>
  );
}

export default AddPage;
