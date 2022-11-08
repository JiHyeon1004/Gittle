import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentBranch } from "../../../atoms";
import styles from "./BranchList.module.css";

function BranchList() {
  const location = useLocation();
  const [current, setCurrent] = useRecoilState(currentBranch);
  const [listOpen, setListOpen] = useState(false);

  const { ipcRenderer } = window.require("electron");
  const branchList = ipcRenderer.sendSync("branchList", location.state.root);
  const branches = branchList[0]
    .split("\n")
    .filter((branch) => branch)
    .filter((branch) => !branch.includes("->"))
    .map((branch) => branch.trim());
  console.log(branches);

  branches.map((branch) => {
    if (branch.includes("*")) {
      setCurrent(branch.replace("*", ""));
    }
  });
  console.log(current);

  const showBranches = () => {
    setListOpen(!listOpen);
  };
  return (
    <div>
      <div onClick={showBranches}>{current}</div>
      <div className={listOpen ? `${styles.openList}` : `${styles.list}`}>
        {branches.map((branch) => (
          <p>
            {branch.includes("*") ? (
              <span>{branch.replace("*", "")}</span>
            ) : (
              <div>{branch}</div>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default BranchList;
