import React, { useState } from "react";
import GitDiff from "../components/addPage/GitDiff";
import StatusComp from "../components/addPage/StatusComp";
import Command from "../components/common/underbar/Command"
import styles from "./AddPage.module.css";

function AddPage() {
  const [files, setFiles] = useState({});
  const [codes, setCodes] = useState([]);
  const [cmd , SetCmd] =useState("")
  const getFile = (file) => {
    setFiles(file);
  };
  const getDiff = (diff) => {
    setCodes(diff);
  };
  const updateCmd=(arg)=>{
    SetCmd(arg)
  }
  return (
    <div className={styles.container}>
      <GitDiff diffFiles={files} diff={codes} />
      {/* <div>{codes}</div> */}
      <StatusComp getFile={getFile} getDiff={getDiff} cmd={cmd} updateCmd={updateCmd}/>
      <Command cmd={cmd}></Command>
    </div>
  );
}

export default AddPage;
