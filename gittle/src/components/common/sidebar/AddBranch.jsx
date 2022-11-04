import React, { useState, useEffect } from "react";
import Button from "../Button";
import Modal from "../Modal";
import BranchSelector from "./BranchSelector";
import styles from "./AddBranch.module.css";

function AddBranch() {
  const [modalOpen, setModalOpen] = useState(false);
  const [newBranches, setNewBranches] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeHandler = (e) => {
    console.log("value", e.target.value);
    setNewBranches(e.target.value);
  };
  console.log("new", newBranches);

  const addNewBranches = (newBranch) => {
    const { ipcRenderer } = window.require("electron");
    console.log("newBranch", newBranch);

    const gitBranch = ipcRenderer.sendSync("gitBranch", newBranch);
    console.log("gitBranch", gitBranch);
    return gitBranch;
  };

  return (
    <>
      <Button
        action={openModal}
        content={"branch  추가"}
        style={{ backgroundColor: "#6BCC78" }}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <div>
              <label>이름</label>
              <input required type="text" onChange={onChangeHandler} />
            </div>
            <div>
              <label>상위 브랜치</label>
              <BranchSelector />
            </div>
          </>
        }
      >
        <div className={styles.buttonContainer}>
          <Button
            action={addNewBranches(newBranches)}
            content={"추가"}
            style={{ backgroundColor: "#6BCC78" }}
          />
          <Button
            action={closeModal}
            content={"취소"}
            style={{ border: "1px solid #7B7B7B" }}
          />
        </div>
      </Modal>
    </>
  );
}

export default AddBranch;
