import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import BranchSelector from "./BranchSelector";

function AddBranch() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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
              <input type="text" />
            </div>
            <div>
              <label>상위 브랜치</label>
              <BranchSelector />
            </div>
          </>
        }
      >
        <div>
          <Button content={"추가"} style={{ backgroundColor: "#6BCC78" }} />
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
