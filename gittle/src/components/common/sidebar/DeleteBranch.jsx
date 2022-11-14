import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../Button";
import Modal from "../Modal";
import { currentBranch } from "../../../atoms";
import styles from "./DeleteBranch.module.css";

function DeleteBranch(props) {
  const { branch } = props;
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [modalOpen, setModalOpen] = useState(false);
  let sameBranch = true;
  const { ipcRenderer } = window.require("electron");

  // const remoteRepository = ipcRenderer.sendSync(
  //   "remoteRepository",
  //   localStorage.getItem("currentRepo")
  // )[0];

<<<<<<< HEAD
  // const remoteRepository = ipcRenderer.sendSync(
  //   "remoteRepository",
  //   localStorage.getItem("currentRepo")
  // )[0];

  const deleteLocalBranches = (delBranch) => {
=======
  const deleteLocalBranches = (branch) => {
>>>>>>> 04091373c0b2a950450d51fbd6d2443b134fea28
    ipcRenderer.sendSync(
      "delete localBranch",
      localStorage.getItem("currentRepo"),
      branch
    );
  };

  const deleteRemoteBranches = (branch) => {
    ipcRenderer.sendSync(
      "delete remoteBranch",
      localStorage.getItem("currentRepo"),
      branch
    );
  };

  const openModal = () => {
    console.log(branch);
    let same = branch === curBranch;
    sameBranch = same;
    console.log("same?", same, sameBranch);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const branchDeleter = () => {
    branch.includes("origin/")
      ? deleteRemoteBranches(branch.replace("origin/", ""))
      : deleteLocalBranches(branch);
    closeModal();
  };

  return (
    <>
      <Button
        action={openModal}
        content={"branch 삭제"}
        style={{ border: "1px solid #7B7B7B" }}
      />

      {sameBranch === true ? (
        <Modal
          open={modalOpen}
          content={
            <>
              <p>안돼</p>
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
      ) : (
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
      )}
    </>
  );
}

export default DeleteBranch;
