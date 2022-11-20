import React, { useState } from "react";
import Modal from "../common/Modal";
import GitCommitPage from "./GitCommitPage";
import styles from "./GitCommitPage.module.css"
import Button from 'react-bootstrap/Button';


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
      <Button
        // className={styles.button}
        onClick={openModal}
        style={{ 
          width: "100px", 
          backgroundColor : "#4D96FF",
          border : "0px"
      }}
      >Commit</Button>
      <Modal
        open={modalOpen}
        content={
          <>
            <div className={styles.closeBtn} onClick={closeModal} style={{
              cursor: "pointer", position: "relative", right: "3px"}}>
            </div>
            <GitCommitPage style={{ width: "500px" }} modalClose={closeModal}/>
          </>
        }
        style={{ width: "500px" }}
      ></Modal>
    </div>
  );
}

export default GitCommitButton;
