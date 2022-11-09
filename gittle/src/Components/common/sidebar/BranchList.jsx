import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentBranch, selectBranch, deleteBranch } from "../../../atoms";
import styles from "./BranchList.module.css";

function BranchList() {
  const location = useLocation();
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [selectedBranch, setSelectedBranch] = useRecoilState(selectBranch);
  const [delBranch, setDelBranch] = useRecoilState(deleteBranch);
  const [listOpen, setListOpen] = useState(false);
  const { ipcRenderer } = window.require("electron");
  const branches = ipcRenderer.sendSync("branchList", location.state.root);
  const branchList = branches[0]
    .split("\n")
    .filter((branch) => branch)
    .filter((branch) => !branch.includes("->"))
    .map((branch) => branch.trim());

  const changeBranch = (selectedBranch) => {
    const gitBranch = ipcRenderer.sendSync(
      "change branch",
      location.state.root,  
      selectedBranch
    );
    // console.log(gitBranch);
    // return gitBranch;
  };

  //   const deleteBranch = (delBranch) => {
  //     ipcRenderer.sendSync("delete branch", location.state.root, delBranch);
  //   };

  const showBranches = () => {
    setListOpen(!listOpen);
  };

  branchList.map((branch) => {
    if (branch.includes("*")) {
      setCurBranch(branch.replace("*", "").trim());
    }
    return;
  });

  const branchSelector = (e) => {
    let innerText = e.target.innerText;
    setSelectedBranch(innerText);
  };

  const branchChanger = () => {
    changeBranch(selectedBranch);
    setCurBranch(selectedBranch);
  };

  useEffect(branchChanger, [selectedBranch]);

  const delBranchSelector = (e) => {
    let innerText = e.target.innerText;
    setDelBranch(innerText);
  };

  //   const branchDeletor = () => {
  //     deleteBranch(delBranch);
  //   };
  console.log("del", delBranch);

  //   useEffect(branchDeletor, [delBranch]);

  return (
    <div>
      <div onClick={showBranches}>{curBranch}</div>
      <p>----------</p>
      <div className={listOpen ? `${styles.openList}` : `${styles.list}`}>
        {branchList.map((branch) => (
          <p onDoubleClick={branchSelector} onClick={delBranchSelector}>
            {branch.includes("*") ? `${curBranch}` : `${branch}`}
          </p>
        ))}
      </div>
    </div>
  );
}

export default BranchList;
