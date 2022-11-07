import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

const { ipcRenderer } = window.require("electron"); 
//let CommitRules
const getCommitRules = () => {
 return JSON.parse(ipcRenderer.sendSync("ReadCommitConvention"))
  
}
getCommitRules()
function GitCommit() {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState('')
  const [explanation, setExplanation] = useState('')
  const [commitRules, setCommitRules] = useState(getCommitRules())

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
  const commit = () => {
    
  }
  return (
    <>
      <div>
        <input 
          type="text"
          placeholder="Feat"
          onChange={onChangeType}
          value={type}
        />
        <Button 
          action={commit}
          content={"Commit"}
          style={{ backgroundColor: "#4D96FF", color: "white" }}
        />
      </div>

    </>
  );
}

export default GitCommit;
