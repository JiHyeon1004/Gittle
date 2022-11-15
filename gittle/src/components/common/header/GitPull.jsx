import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import { useRecoilState } from "recoil";
import { currentBranch } from "../../../atoms";
// import BranchSelector from "../BranchSelector";
import styles from "./GitPull.module.css";

function GitPull() {
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [modalOpen, setModalOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [targetBranch, setTargetBranch] = useState("");
  const { ipcRenderer } = window.require("electron");
  const currentRepo = localStorage.getItem("currentRepo");
  const gitPull = (targetBranch) => {
    ipcRenderer.sendSync("gitPull", currentRepo, targetBranch);
  };
  const remoteBranches = ipcRenderer.sendSync("remoteBranchList", currentRepo);

  const remoteBranchList = remoteBranches[0]
    .split("\n")
    .filter((branch) => branch)
    .filter((branch) => !branch.includes("->"))
    .filter((branch) => branch !== curBranch)
    .map((branch) => branch.trim())
    .map((branch) => branch.replace("origin/", ""));

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const showBranches = () => {
    setListOpen(!listOpen);
  };
  const getTargetBranch = (e) => {
    let branch = e.target.firstChild.data;
    setTargetBranch(branch);
  };
  console.log(targetBranch);
  const pullRequest = () => {
    gitPull(targetBranch);
    console.log("target", targetBranch);
    closeModal();
  };

  return (
    <div>
      <Button
        action={openModal}
        content={"pull"}
        style={{ backgroundColor: "#FF6B6B" }}
      />

      <Modal
        style={{ height: "300px" }}
        open={modalOpen}
        content={
          <>
            <div className={styles.selectorContainer}>
              {/* <p className={styles.branch} onClick={showBranches}>
                pull 받을 branch 선택
              </p> */}
              {/* <div
                className={listOpen ? `${styles.openList}` : `${styles.list}`}
              > */}
              <div className={styles.selector}>
                {remoteBranchList.map((branch, idx) => (
                  <p onClick={getTargetBranch} key={idx}>
                    {branch}
                  </p>
                ))}
              </div>
              <p>에서</p>
              <div className={styles.selector}>{curBranch}로</div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                action={pullRequest}
                content={"pull 받기"}
                style={{ backgroundColor: "#6BCC78" }}
              />
              <Button
                action={closeModal}
                content={"취소"}
                style={{ border: "1px solid #7B7B7B" }}
              />
            </div>
          </>
        }
      ></Modal>
    </div>
  );
}

export default GitPull;
