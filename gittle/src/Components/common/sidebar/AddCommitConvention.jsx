import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import Dropdown from 'react-bootstrap/Dropdown';

const { ipcRenderer } = window.require("electron"); 

function AddCommitConvention() {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState('')
  const [explanation, setExplanation] = useState('')

  const onChangeType = (e) => {
    setType(e.target.value)
  };
  const onChangeExplanation = (e) => {
    setExplanation(e.target.value)
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const test = () => {
    console.log(type)
    console.log(explanation)
    ipcRenderer.sendSync("WriteCommitConvention",{type:type,explanation:explanation})
    closeModal()
  }

  return (
    <>
      
      <Dropdown>
        <Dropdown.Toggle id="commit-rule">
          Commit 규칙
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
        <Button 
        action={openModal}
        content={"추가"}
        style={{ backgroundColor: "#6BCC78", color: "white" }}
        
      />
      </Dropdown>
      <Modal
        open={modalOpen}
        content={
          <>
            <div>
              <label>타입</label>
              <input 
                type="text"
                placeholder="Feat"
                onChange={onChangeType}
                value={type}
              />
            </div>
            <br/>
            <div>
              <label>설명</label>
              <input 
                type="text"
                placeholder="기능 변경"
                onChange={onChangeExplanation}
                value={explanation} 
              />
            </div>
          </>
        }
      >
        <div>
          <Button 
            action={test}  
            content={"추가"} 
            style={{ backgroundColor: "#6BCC78" }} 
          />
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

export default AddCommitConvention;
