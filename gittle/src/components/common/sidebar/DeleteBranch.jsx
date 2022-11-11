import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import styles from "./DeleteBranch.module.css";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { deleteBranch, selectBranch, deleteModalOpen } from "../../../atoms";

function DeleteBranch(branch, idx) {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useRecoilState(deleteModalOpen);
  // const [delBranch, setDelBranch] = useRecoilState(deleteBranch);
  const [selectedBranch, setSelectedBranch] = useRecoilState(selectBranch);
  console.log("branch", branch, idx);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const branchDeletor = () => {
    // deleteBranches(delBranch);
    deleteBranches(selectedBranch);
    closeModal();
  };

  const deleteBranches = (delBranch) => {
    const { ipcRenderer } = window.require("electron");
    const gitBranch = ipcRenderer.sendSync(
      "delete branch",
      localStorage.getItem("currentRepo"),
      selectedBranch
    );
    return gitBranch;
  };

  return (
    <>
      <Button
        action={openModal}
        content={"branch 삭제"}
        value={selectedBranch}
        style={{ border: "1px solid #7B7B7B" }}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <p>{selectedBranch} branch를 정말로 삭제하시겠습니까?</p>
            <p>(삭제한 branch는 복구가 불가능합니다.)</p>
          </>
        }
      >
        <div className={styles.buttonContainer}>
          <Button
            action={branchDeletor}
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
