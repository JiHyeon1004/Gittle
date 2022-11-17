import React, { useState } from "react";
import Modal from "../common/Modal";
import GitCommitPage from "./GitCommitPage";
import styles from "./GitCommitPage.module.css"

function GitCommitButton(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div style={{zIndex: 99}}>
      <button
        className={styles.toCommitBtn}
        onClick={openModal}
        style={{ width: "150px" }}
      >commit</button>
      <Modal
        open={modalOpen}
        content={
          <>
            <div className={styles.closeBtn} onClick={closeModal} style={{
              cursor: "pointer", position: "relative", right: "3px"}}>
              x
            </div>
            <GitCommitPage style={{ width: "500px" }} />
          </>
        }
        style={{ width: "500px" }}
      ></Modal>
    </div>
  );
}

export default GitCommitButton;
