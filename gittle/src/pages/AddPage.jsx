import GitCommitButton from "../components/addPage/GitCommitButton";
import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { commandLine} from "../atoms"
import GitDiff from "../components/addPage/GitDiff";
import StatusComp from "../components/addPage/StatusComp";
import Command from "../components/common/underbar/Command"
import styles from "./AddPage.module.css";

function AddPage() {
  const [files, setFiles] = useState({});
  const [codes, setCodes] = useState([]);
  const [cmd, SetCmd] = useRecoilState(commandLine)
  


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
      <div className={styles.commitButton}>
      <GitCommitButton/></div>
      <GitDiff diffFiles={files} diff={codes} />
      {/* <div>{codes}</div> */}
      <StatusComp getFile={getFile} getDiff={getDiff} cmd={cmd} updateCmd={updateCmd}/>
      <br />
      <br /><br /><br />

      <div className={styles.cmdDiv}>
        <Command></Command>
      </div></div>
  );
}

export default AddPage;