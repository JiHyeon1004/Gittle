import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import CommitRulePage from "./CommitRulePage";

function CommitRuleButton(props) {
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
        content={"commit 규칙"}
        style={{ border: "1px solid #7B7B7B", width: "200px" }}
      />
      <Modal
        open={modalOpen}
        content={
          <>
            <span onClick={closeModal} style={{ cursor: "pointer" }}>
              x
            </span>
            <CommitRulePage style={{ width: "500px" }} />
          </>
        }
        style={{ width: "500px", zIndex: "99" }}
      ></Modal>
    </div>
  );
}

export default CommitRuleButton;
