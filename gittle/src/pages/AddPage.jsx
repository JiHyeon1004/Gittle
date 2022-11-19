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
  
  useEffect(()=>{
    SetCmd(`cd "${localStorage.getItem("currentRepo")}"`)
  },[])

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
    <div>
    <div className={styles.container}>
      {/* 깃커밋버튼 */}
      <div className={styles.commitButton}>
        <GitCommitButton /></div>
      
      <GitDiff diffFiles={files} diff={codes} />
      {/* <div>{codes}</div> */}
      <StatusComp getFile={getFile} getDiff={getDiff} cmd={cmd} updateCmd={updateCmd}/>
      <br />
      <br /><br /><br />

      
      </div>
      {/* <div className={styles.cmdDiv}>
        <Command></Command>
      </div> */}
      <footer className={styles.cmdDiv}>
        <Command></Command>
      </footer>
    </div>
  );
}

export default AddPage;