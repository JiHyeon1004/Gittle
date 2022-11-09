import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import BranchSelector from "../BranchSelector";
import styles from "./AddBranch.module.css";
import { useLocation } from "react-router-dom";

function AddBranch() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [newBranches, setNewBranches] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeHandler = (e) => {
    setNewBranches(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (newBranches.trim().length === 0) return;
    addNewBranches(newBranches);
    setNewBranches("");
    closeModal();
  };

  const addNewBranches = (newBranch) => {
    const { ipcRenderer } = window.require("electron");
    const gitBranch = ipcRenderer.sendSync(
      "add branch",
      location.state.root,
      newBranch
    );
    return gitBranch;
  };

  return (
    <>
      <Button
        action={openModal}
        content={"branch 추가"}
        style={{ backgroundColor: "#6BCC78" }}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <form onSubmit={onHandleSubmit}>
              <div>
                <label>이름</label>
                <input
                  required
                  type="text"
                  value={newBranches}
                  onChange={onChangeHandler}
                />
              </div>

              <div>
                <label>상위 브랜치</label>
                {/* <BranchSelector /> */}
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  // action={addNewBranches(newBranches)}
                  content={"추가"}
                  style={{ backgroundColor: "#6BCC78" }}
                />
                <Button
                  action={closeModal}
                  content={"취소"}
                  style={{ border: "1px solid #7B7B7B" }}
                />
              </div>
            </form>
          </>
        }
      ></Modal>
    </>
  );
}

export default AddBranch;
