import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import {commandBranch} from "../atoms"
import GitDiff from "../components/addPage/GitDiff";
import StatusComp from "../components/addPage/StatusComp";
import Command from "../components/common/underbar/Command"
import styles from "./AddPage.module.css";

function AddPage() {
  const [files, setFiles] = useState({});
  const [codes, setCodes] = useState([]);
  const [cmd , SetCmd] =useState("");
  const [cmdBranch,SetCmdBranch] = useRecoilState(commandBranch);

  useEffect(()=>{

  },[cmdBranch])

  useEffect(()=>{
    const current = localStorage.getItem("currentRepo")
    SetCmd(`cd "${current}"`)
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
    <div className={styles.container}>
      <GitDiff diffFiles={files} diff={codes} />
      {/* <div>{codes}</div> */}
      <StatusComp getFile={getFile} getDiff={getDiff} cmd={cmd} updateCmd={updateCmd}/>
      <Command cmd={cmd} cmdBranch={cmdBranch}></Command>
    </div>
  );
}

export default AddPage;
