import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

function DeleteBranch() {
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
        content={"branch 삭제"}
        style={{ border: "1px solid #7B7B7B" }}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <p>branch를 정말로 삭제하시겠습니까?</p>
            <p>(삭제한 branch는 복구가 불가능합니다.)</p>
          </>
        }
      >
        <div>
          <Button content={"예"} style={{ backgroundColor: "#6BCC78" }} />
          <Button
            action={closeModal}
            content={"아니오"}
            style={{ border: "1px solid #7B7B7B" }}
          />
        </div>
      </Modal>
    </>
  );
}

export default DeleteBranch;