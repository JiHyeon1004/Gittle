import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

function BranchManage() {
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
        content={"브랜치 추가"}
        style={{ backgroundColor: "#6BCC78" }}
      />
      <Button
        action={openModal}
        content={"브랜치 삭제"}
        style={{ backgroundColor: "#6BCC78" }}
      />

      <Modal
        open={modalOpen}
        content={
          targetModal === "add" ? (
            <>
              <label>이름</label> <input type="text" />
            </>
          ) : (
            <>삭제</>
          )
        }
      >
        <div>
          <Button content={"hi"} style={{ backgroundColor: "#6BCC78" }} />
          <Button
            action={closeModal}
            content={"bye"}
            style={{ border: "1px solid #7B7B7B" }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default BranchManage;
