import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../Button";
import Modal from "../Modal";
import { createBtn } from "../../../atoms";
import styles from "./CreateBranch.module.css";

function CreateBranch() {
  const [isCreate, setIsCreate] = useRecoilState(createBtn);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBranches, setNewBranches] = useState("");
  const { ipcRenderer } = window.require("electron");

  const createNewBranches = (newBranch) => {
    ipcRenderer.sendSync(
      "create branch",
      localStorage.getItem("currentRepo"),
      newBranch
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeHandler = (e) => {
    setNewBranches(e.target.value);
  };

  const branchCreator = (e) => {
    e.preventDefault();
    if (newBranches.trim().length === 0) return;
    createNewBranches(newBranches);
    setNewBranches("");
    closeModal();
    setIsCreate(true);
  };
  setIsCreate(false);

  return (
    <>
      <Button
        action={openModal}
        content={"새 branch"}
        style={{ width: "200px" }}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <form onSubmit={branchCreator}>
              <div>
                <label>이름</label>
                <input
                  required
                  type="text"
                  value={newBranches}
                  className={styles.input}
                  onChange={onChangeHandler}
                />
              </div>

              <div className={styles.buttonContainer}>
                <button
                  className={styles.rulePlusBtn2}
                  style={{ backgroundColor: "#6BCC78", color: "white" }}
                >branch 생성</button>
                <button
                  className={styles.rulePlusBtn2}
                  onClick={closeModal}
                  style={{ border: "1px solid #7B7B7B", backgroundColor:"white" }}
                >취소</button>
              </div>
            </form>
          </>
        }
      ></Modal>
    </>
  );
}

export default CreateBranch;
