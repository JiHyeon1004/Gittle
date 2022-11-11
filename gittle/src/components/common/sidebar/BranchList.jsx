import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentBranch, selectBranch, deleteBranch } from "../../../atoms";
import BranchManage from "./BranchManage";
import styles from "./BranchList.module.css";
import Modal from "../Modal";
import Button from "../Button";
import DeleteBranch from "./DeleteBranch";

function BranchList() {
  const location = useLocation();
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [selectedBranch, setSelectedBranch] = useRecoilState(selectBranch);
  const [delBranch, setDelBranch] = useRecoilState(deleteBranch);
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useRecoilState(deleteModalOpen);
  // const [branchList, setBranchList] = useState([curBranch]);
  const [listOpen, setListOpen] = useState(false);
  const [localListOpen, setLocalListOpen] = useState(false);
  const [remoteListOpen, setRemoteListOpen] = useState(false);
  // const [clicked, setClicked] = useState(false);
  // const [dbClicked, setDbClicked] = useState(false);
  const { ipcRenderer } = window.require("electron");
  const localBranches = ipcRenderer.sendSync(
    "localBranchList",
    localStorage.getItem("currentRepo")
  );
  const remoteBranches = ipcRenderer.sendSync(
    "remoteBranchList",
    localStorage.getItem("currentRepo")
  );

  const deleteBranches = (delBranch) => {
    const { ipcRenderer } = window.require("electron");
    const gitBranch = ipcRenderer.sendSync(
      "delete branch",
      localStorage.getItem("currentRepo"),
      selectedBranch
    );
    return gitBranch;
  };

  const localBranchList = localBranches[0]
    .split("\n")
    .filter((branch) => branch)
    .map((branch) => branch.trim());

  const remoteBranchList = remoteBranches[0]
    .split("\n")
    .filter((branch) => branch)
    .filter((branch) => !branch.includes("->"))
    .map((branch) => branch.trim())
    .map((branch) => branch.replace("origin/", ""));

  setCurBranch(
    ipcRenderer.sendSync("gitBranch", localStorage.getItem("currentRepo"))
  );

  const changeBranch = (selectedBranch) => {
    const gitBranch = ipcRenderer.sendSync(
      "change branch",
      localStorage.getItem("currentRepo"),

      selectedBranch
    );
    // console.log(gitBranch);
    // return gitBranch;
  };

  //   const deleteBranch = (delBranch) => {
  //     ipcRenderer.sendSync("delete branch", location.state.root, delBranch);
  //   };

  const showBranches = () => {
    setListOpen(!listOpen);
  };
  const showLocalBranches = () => {
    setLocalListOpen(!localListOpen);
  };
  const showRemoteBranches = () => {
    setRemoteListOpen(!remoteListOpen);
  };

  const branchSelector = (e) => {
    // console.log(e.target.firstChild.data);
    let branch = e.target.firstChild.data;
    // console.log(e.target.innerText.split("\n"));
    // console.log("inner", innerText);
    setSelectedBranch(branch);
    console.log(branch);
    // console.log("dddd", e.target.dataset);
    // setSelectedBranch(e.target.dataset.branch);
    // console.log("select", selectedBranch);
  };
  // console.log("selector", branchSelector());

  const branchChanger = () => {
    branchSelector();
    changeBranch(selectedBranch);
    setCurBranch(selectedBranch);
  };

  const open = () => {
    console.log(selectedBranch);
  };

  // const delBranchSelector = (e) => {
  //   let innerText = e.target.innerText;
  //   setDelBranch(innerText);
  // };
  const openModal = () => {
    branchSelector();
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const branchDeletor = () => {
    // deleteBranches(delBranch);
    deleteBranches(selectedBranch);
    closeModal();
  };

  // useEffect(() => {
  //   branchChanger();
  //   branchDeletor();
  // }, [selectedBranch]);

  console.log("hhhh", selectedBranch);

  //   const branchDeletor = () => {
  //     deleteBranch(delBranch);
  //   };

  //   useEffect(branchDeletor, [delBranch]);

  return (
    <div className={styles.container}>
      <div className={styles.branchList}>
        <div className={styles.curBranch} onClick={showBranches}>
          {curBranch}
        </div>

        <div className={listOpen ? `${styles.openList}` : `${styles.list}`}>
          <div>
            <p onClick={showLocalBranches}>local</p>
            {localBranchList.map((branch, idx) => (
              <div
                className={
                  localListOpen ? `${styles.openList}` : `${styles.list}`
                }
              >
                <p
                  key={idx}
                  className={`${styles.branch}`}
                  onClick={branchChanger}
                  // data-branch={branch}
                  onContextMenu={branchSelector}
                >
                  {branch.includes("*") ? `${curBranch}` : `${branch}`}
                  {/* <DeleteBranch branch={branch} idx={idx} /> */}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p onClick={showRemoteBranches}>remote</p>
            {remoteBranchList.map((branch, idx) => (
              <div
                className={
                  remoteListOpen ? `${styles.openList}` : `${styles.list}`
                }
              >
                <p
                  key={idx}
                  className={`${styles.branch}`}
                  onClick={branchChanger}
                  // data-branch={branch}
                  onContextMenu={branchSelector}
                >
                  {branch.includes("*") ? `${curBranch}` : `${branch}`}
                  {/* <DeleteBranch branch={branch} idx={idx} /> */}
                </p>
              </div>
            ))}
          </div>
          <BranchManage />
          <Modal
            open={modalOpen}
            content={
              <>
                <p>{selectedBranch} branch를 정말로 삭제하시겠습니까?</p>
                <p>(삭제한 branch는 복구가 불가능합니다.)</p>
              </>
            }
          >
            {/* <div className={styles.buttonContainer}>
              <Button
                action={branchDeletor}
                content={"예"}
                style={{ backgroundColor: "#6BCC78" }}
              />
              <Button
                action={closeModal}
                content={"아니오"}
                style={{ border: "1px solid #7B7B7B" }}
              />
            </div> */}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BranchList;
