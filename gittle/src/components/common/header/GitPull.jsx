import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import { useRecoilState } from "recoil";
import { currentBranch } from "../../../atoms";
import { useNavigate } from "react-router-dom";
import styles from "./GitPull.module.css";

function GitPull() {
  const navigate = useNavigate();
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [modalOpen, setModalOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [targetBranch, setTargetBranch] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { ipcRenderer } = window.require("electron");
  const pullRequest = (targetBranch) => {
    const pull = ipcRenderer.sendSync(
      "gitPull",
      localStorage.getItem("currentRepo"),
      targetBranch
    );
    return pull;
  };
  const remoteBranches = ipcRenderer.sendSync(
    "remoteBranchList",
    localStorage.getItem("currentRepo")
  );

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
    showBranches();
  };
  const showBranches = () => {
    setListOpen(!listOpen);
  };
  const getTargetBranch = (e) => {
    let branch = e.target.firstChild.data;
    setTargetBranch(branch);
  };
  // console.log(targetBranch);
  const pullData = () => {
    pullRequest(targetBranch) === "error"
      ? setErrorModalOpen(true)
      : pullRequest(targetBranch);
    closeModal();
    showBranches();
  };

  const goCommit = () => {
    setErrorModalOpen(false);
    navigate("/add");
    showBranches();
  };

  return (
    <div>
      <Button
        action={openModal}
        content={"pull"}
        style={{ backgroundColor: "#FF6B6B" }}
      />

      <Modal
        style={{ height: "300px", width: "400px" }}
        open={modalOpen}
        content={
          <>
            <div className={styles.container}>
              <div className={styles.selectorContainer}>
                <p
                  // className={!listOpen ? `${styles.openList}` : `${styles.list}`}
                  onClick={showBranches}
                >
                  pull 받을 branch 선택
                </p>
                <div
                  className={
                    listOpen
                      ? `${styles.selector} ${styles.openList}`
                      : `${styles.list}`
                  }
                >
                  {remoteBranchList.map((branch, idx) => (
                    <p onClick={getTargetBranch} key={idx}>
                      {branch}
                    </p>
                  ))}
                </div>
              </div>
              <p>에서</p>
              <div className={styles.selector}>{curBranch}로</div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                action={pullData}
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
      <Modal
        open={errorModalOpen}
        content={
          <>
            <p>변경사항이 있으면 pull 받을 수 없습니다.</p>
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

export default GitPull;
