import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentBranch, selectBranch } from "../../../atoms";
import BranchManage from "./BranchManage";
import DeleteBranch from "./DeleteBranch";
import styles from "./BranchList.module.css";

function BranchList() {
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [selectedBranch, setSelectedBranch] = useRecoilState(selectBranch);
  const [localListOpen, setLocalListOpen] = useState(false);
  const [remoteListOpen, setRemoteListOpen] = useState(false);

  const { ipcRenderer } = window.require("electron");
  const localBranches = ipcRenderer.sendSync(
    "localBranchList",
    localStorage.getItem("currentRepo")
  );
  const remoteBranches = ipcRenderer.sendSync(
    "remoteBranchList",
    localStorage.getItem("currentRepo")
  );

  const localBranchList = localBranches[0]
    .split("\n")
    .filter((branch) => branch)
    .map((branch) => branch.trim())
    .map((branch) => (branch.includes("*") ? curBranch : branch));

  const remoteBranchList = remoteBranches[0]
    .split("\n")
    .filter((branch) => branch)
    .filter((branch) => !branch.includes("->"))
    .map((branch) => branch.trim())
    .map((branch) => (branch.includes("*") ? curBranch : branch));

  // .map((branch) => branch.replace("origin/", ""));

  const showLocalBranches = () => {
    setLocalListOpen(!localListOpen);
  };
  const showRemoteBranches = () => {
    setRemoteListOpen(!remoteListOpen);
  };

  setCurBranch(
    ipcRenderer.sendSync("gitBranch", localStorage.getItem("currentRepo"))
  );

  const changeBranch = (selectedBranch) => {
    ipcRenderer.sendSync(
      "change branch",
      localStorage.getItem("currentRepo"),
      selectedBranch
    );
  };

  const branchSelector = (e) => {
    let branch = e.target.dataset.branch;
    setSelectedBranch(branch);
    console.log("select", selectedBranch);
  };

  const branchChanger = (e) => {
    // branchSelector(e);
    changeBranch(selectedBranch);
    console.log("change", selectedBranch);
    setCurBranch(selectedBranch);
  };

  // useEffect(() => {
  //   branchChanger();
  //   branchDeletor();
  // }, [selectedBranch]);

  console.log("sel", selectedBranch, "cur", curBranch);

  //   useEffect(branchDeletor, [delBranch]);

  return (
    <div className={styles.container}>
      <div className={styles.curBranch}>
        현재 branch <p>{curBranch}</p>
      </div>
      <div>
        <div className={styles.branchList}>
          <div onClick={showLocalBranches}>local</div>
          {localBranchList.map((branch, idx) => (
            <div
              className={
                localListOpen ? `${styles.openList}` : `${styles.list}`
              }
            >
              <div
                key={idx}
                className={
                  curBranch === branch
                    ? `${styles.branch} ${styles.clicked}`
                    : `${styles.branch}`
                }
                onClick={branchSelector}
                onDoubleClick={branchChanger}
                data-branch={branch}
              >
                {branch}

                <DeleteBranch branch={branch} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.branchList}>
          <div onClick={showRemoteBranches}>remote</div>
          {remoteBranchList.map((branch, idx) => (
            <div
              className={
                remoteListOpen ? `${styles.openList}` : `${styles.list}`
              }
            >
              <div
                key={idx}
                className={styles.branch}
                onDoubleClick={branchChanger}
                data-branch={branch}
              >
                {branch}

                <DeleteBranch branch={branch} />
              </div>
            </div>
          ))}
        </div>
        <BranchManage />
      </div>
    </div>
  );
}

export default BranchList;
