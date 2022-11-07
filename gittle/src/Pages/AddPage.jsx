import React, { useState } from "react";
import GitDiff from "../components/addPage/GitDiff";
import StatusComp from "../components/addPage/StatusComp";
import styles from "./AddPage.module.css";

function AddPage() {
  const [files, setFiles] = useState({});
  const [codes, setCodes] = useState([]);
  const getFile = (file) => {
    setFiles(file);
  };
  const getDiff = (diff) => {
    setCodes(diff);
  };
  return (
    <div className={styles.container}>
      <GitDiff diffFiles={files} diff={codes} />
      {/* <div>{codes}</div> */}
      <StatusComp getFile={getFile} getDiff={getDiff} />
    </div>
  );
}

export default AddPage;
