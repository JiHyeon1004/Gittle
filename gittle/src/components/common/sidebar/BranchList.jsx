import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentBranch, selectBranch, commandBranch } from "../../../atoms";
import BranchManage from "./BranchManage";
import DeleteBranch from "./DeleteBranch";
import Modal from "../Modal";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import styles from "./BranchList.module.css";

function BranchList() {
  const navigate = useNavigate();
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [selectedBranch, setSelectedBranch] = useRecoilState(selectBranch);
  const [cmdBranch,SetCmdBranch] = useRecoilState(commandBranch);
  const [localListOpen, setLocalListOpen] = useState(false);
  const [remoteListOpen, setRemoteListOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { ipcRenderer } = window.require("electron");
  const currentRepo = localStorage.getItem("currentRepo");

  const localBranches = ipcRenderer.sendSync("localBranchList", currentRepo);
  const remoteBranches = ipcRenderer.sendSync("remoteBranchList", currentRepo);


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
  let gitStatus = ipcRenderer.sendSync("gitStatus", currentRepo);

  let status = gitStatus.length > 0 ? true : false;

  const showLocalBranches = () => {
    setLocalListOpen(!localListOpen);
  };
  const showRemoteBranches = () => {
    setRemoteListOpen(!remoteListOpen);
  };

  setCurBranch(ipcRenderer.sendSync("gitBranch", currentRepo));

  const changeBranch = (selectedBranch) => {
    return ipcRenderer.sendSync("change branch", currentRepo, selectedBranch);
  };

  const branchSelector = (e) => {
    let branch = e.target.dataset.branch;
    setSelectedBranch(branch);
  };

  const branchChanger = () => {
    // branchSelector(e);
    changeBranch(selectedBranch) === "error"
      ? setErrorModalOpen(true)
      : changeBranch(selectedBranch); 
    
    // status ? setStashModalOpen(true) : changeBranch(selectedBranch);
    // console.log("change", changeBranch(selectedBranch));

    setCurBranch(selectedBranch);
    if(changeBranch(selectedBranch) !== "error") SetCmdBranch(selectedBranch)
  };

  const goCommit = () => {
    setErrorModalOpen(false);
    navigate("/add");
  };
  // const gitStash = () => {
  //   ipcRenderer.sendSync("gitStash", currentRepo);
  // };

  // const goStash = () => {
  //   gitStash();
  //   setErrorModalOpen(false);
  // };

  // useEffect(() => {
  //   branchChanger();
  //   branchDeletor();
  // }, [selectedBranch]);

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
      <Modal
        open={errorModalOpen}
        content={
          <>
            <p>변경사항이 있으면 branch 이동을 할 수 없습니다.</p>
            <p>먼저 commit해주세요</p>
            <div className={styles.buttonContainer}>
              <Button
                action={goCommit}
                content={"commit하러 가기"}
                style={{ backgroundColor: "#6BCC78" }}
              />
            </div>
          </>
        }
      ></Modal>
    </div>
  );
}

export default BranchList;
