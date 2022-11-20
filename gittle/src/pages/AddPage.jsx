import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { commandLine } from "../atoms";
import GitDiff from "../components/addPage/GitDiff";
import StatusComp from "../components/addPage/StatusComp";
import Command from "../components/common/underbar/Command";
import styles from "./AddPage.module.css";

function AddPage() {
  const [files, setFiles] = useState({});
  const [codes, setCodes] = useState([]);
  const [cmd, SetCmd] = useRecoilState(commandLine);

  useEffect(() => {
    SetCmd(`cd "${localStorage.getItem("currentRepo")}"`);
  }, []);

  const getFile = (file) => {
    setFiles(file);
  };
  const getDiff = (diff) => {
    setCodes(diff);
  };
  const updateCmd = (arg) => {
    SetCmd(arg);
  };
  return (
    <div>
      <div className={styles.container}>
        <GitDiff diffFiles={files} diff={codes} />

        <StatusComp
          getFile={getFile}
          getDiff={getDiff}
          cmd={cmd}
          updateCmd={updateCmd}
        />
      </div>

      <footer className={styles.cmdDiv}>
        <Command></Command>
      </footer>
    </div>
  );
}

export default AddPage;
