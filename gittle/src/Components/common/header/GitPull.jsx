import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import BranchSelector from "../../common/BranchSelector";
import styles from "./GitPull.module.css";

function GitPull(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Button
        action={openModal}
        content={"pull"}
        style={{ backgroundColor: "#FF6B6B" }}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <div className={styles.selectorContainer}>
              <div className={styles.selector}>
                <BranchSelector />
                에서
              </div>
              <div className={styles.selector}>
                <BranchSelector />로
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
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
    </div>
  );
}

export default GitPull;
