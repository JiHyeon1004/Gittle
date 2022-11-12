import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import styles from "./DeleteBranch.module.css";

function DeleteBranch(branch) {
  const [modalOpen, setModalOpen] = useState(false);

  const delBranch = branch.branch;

  const { ipcRenderer } = window.require("electron");

  const deleteBranches = (delBranch) => {
    ipcRenderer.sendSync(
      "delete branch",
      localStorage.getItem("currentRepo"),
      delBranch
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const branchDeleter = () => {
    console.log("del", delBranch, typeof delBranch);
    deleteBranches(delBranch);
    closeModal();
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
              <span className={styles.branchName}>{delBranch}</span> branch를
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
    </>
  );
}

export default DeleteBranch;
