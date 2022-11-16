import React, { useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import GitCommitPage from "./GitCommitPage";

function GitCommitButton(props) {
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
        content={"commit"}
        style={{ border: "1px solid #7B7B7B", width: "150px" }}
      />
      <Modal
        open={modalOpen}
        content={
          <>
            <span onClick={closeModal} style={{
              cursor: "pointer", position: "relative", right: "3px"}}>
              x
            </span>
            <GitCommitPage style={{ width: "500px" }} />
          </>
        }
        style={{ width: "500px" }}
      ></Modal>
    </div>
  );
}

export default GitCommitButton;
