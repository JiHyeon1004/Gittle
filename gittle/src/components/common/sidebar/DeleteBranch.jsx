import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../Button";
import Modal from "../Modal";
import { currentBranch } from "../../../atoms";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteBranch.module.css";

function DeleteBranch(props) {
  const { branch } = props;
  const navigate = useNavigate();
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentErrorModalOpen, setCurrentErrorModalOpen] = useState(false);
  const [commitErrorModalOpen, setCommitErrorModalOpen] = useState(false);

  const { ipcRenderer } = window.require("electron");

  // const remoteRepository = ipcRenderer.sendSync(
  //   "remoteRepository",
  //   localStorage.getItem("currentRepo")
  // )[0];

  const deleteLocalBranches = (branch) => {
    const deletebranch = ipcRenderer.sendSync(
      "deleteLocalBranch",
      localStorage.getItem("currentRepo"),
      branch
    );
    return deletebranch;
  };

  const deleteRemoteBranches = (branch) => {
    ipcRenderer.sendSync(
      "deleteRemoteBranch",
      localStorage.getItem("currentRepo"),
      branch
    );
  };

  const openModal = () => {
    console.log("branch", branch, curBranch);
    console.log("de", deleteLocalBranches(branch));
    branch === curBranch
      ? setCurrentErrorModalOpen(true)
      : deleteLocalBranches(branch) === "error"
      ? setCommitErrorModalOpen(true)
      : setModalOpen(true);
  };

  const closeModal = () => {
    branch === curBranch
      ? setCurrentErrorModalOpen(false)
      : deleteLocalBranches(branch) === "error"
      ? setCommitErrorModalOpen(false)
      : setModalOpen(false);
  };

  const branchDeleter = () => {
    branch.includes("origin/")
      ? deleteRemoteBranches(branch.replace("origin/", ""))
      : deleteLocalBranches(branch);
    closeModal();
  };

  const goPush = () => {
    setCommitErrorModalOpen(false);
    navigate("/push");
  };

  return (
    <>
      <Button
        action={openModal}
        content={"branch 삭제"}
        style={{ border: "1px solid #7B7B7B" }}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <p>
              <span className={styles.branchName}>{branch}</span> branch를
              정말로 삭제하시겠습니까?
            </p>
            <p>(삭제한 branch는 복구가 불가능합니다.)</p>
          </>
        }
      >
        <div className={styles.buttonContainer}>
          <Button
            action={branchDeleter}
            content={"예"}
            style={{ backgroundColor: "#6BCC78" }}
          />
          <Button
            action={closeModal}
            content={"아니오"}
            style={{ border: "1px solid #7B7B7B" }}
          />
        </div>
      </Modal>
      <Modal
        open={currentErrorModalOpen}
        content={
          <>
            <p>현재 브랜치는 삭제할 수 없습니다.</p>
          </>
        }
      >
        <div className={styles.buttonContainer}>
          <Button
            action={closeModal}
            content={"돌아가기"}
            style={{ backgroundColor: "#6BCC78" }}
          />
        </div>
      </Modal>
      <Modal
        open={commitErrorModalOpen}
        content={
          <>
            <p>commit된 파일이 있어 브랜치를 삭제할 수 없습니다.</p>
            <p>push를 완료해주세요</p>
          </>
        }
      >
        <div className={styles.buttonContainer}>
          <Button
            action={goPush}
            content={"push하러 가기"}
            style={{ backgroundColor: "#6BCC78" }}
          />
          <Button
            action={closeModal}
            content={"돌아가기"}
            style={{ border: "1px solid #7B7B7B" }}
          />
        </div>
      </Modal>
    </>
  );
}

export default DeleteBranch;
