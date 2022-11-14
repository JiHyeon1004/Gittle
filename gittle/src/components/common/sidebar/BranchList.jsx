import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentBranch, selectBranch } from "../../../atoms";
import BranchManage from "./BranchManage";
import DeleteBranch from "./DeleteBranch";
import Modal from "../Modal";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import styles from "./BranchList.module.css";

function BranchList() {
  const navigate = useNavigate();
  const [curBranch, setCurBranch] = useRecoilState(currentBranch);
  const [selectedBranch, setSelectedBranch] = useRecoilState(selectBranch);
  const [localListOpen, setLocalListOpen] = useState(false);
  const [remoteListOpen, setRemoteListOpen] = useState(false);
  const [stashModalOpen, setStashModalOpen] = useState(false);

  const { ipcRenderer } = window.require("electron");
  const currentRepo = localStorage.getItem("currentRepo");

  const localBranches = ipcRenderer.sendSync("localBranchList", currentRepo);
  const remoteBranches = ipcRenderer.sendSync("remoteBranchList", currentRepo);

  const localBranchList = localBranches[0]
    .split("\n")
    .filter((branch) => branch)
    .map((branch) => branch.trim())
    .map((branch) => (branch.includes("*") ? curBranch : branch));

  const remoteBranchList = remoteBranches[0]
    .split("\n")
    .filter((branch) => branch)
    .filter((branch) => !branch.includes("->"))
    .map((branch) => branch.trim())
    .map((branch) => (branch.includes("*") ? curBranch : branch));

  // .map((branch) => branch.replace("origin/", ""));
  let gitStatus = ipcRenderer.sendSync("gitStatus", currentRepo);

  let status = gitStatus.length > 1 ? true : false;

  const showLocalBranches = () => {
    setLocalListOpen(!localListOpen);
  };
  const showRemoteBranches = () => {
    setRemoteListOpen(!remoteListOpen);
  };

  setCurBranch(ipcRenderer.sendSync("gitBranch", currentRepo));

  const changeBranch = (selectedBranch) => {
    ipcRenderer.sendSync("change branch", currentRepo, selectedBranch);
  };

  const branchSelector = (e) => {
    let branch = e.target.dataset.branch;
    setSelectedBranch(branch);
    console.log("select", selectedBranch);

    console.log("statussss", branch, gitStatus, status);
  };

  const branchChanger = (e) => {
    // branchSelector(e);
    status ? setStashModalOpen(true) : changeBranch(selectedBranch);
    console.log("change", selectedBranch);
    setCurBranch(selectedBranch);
  };

  const closeModal = () => {
    setStashModalOpen(false);
    navigate("/add");
  };

  // useEffect(() => {
  //   branchChanger();
  //   branchDeletor();
  // }, [selectedBranch]);

  //   useEffect(branchDeletor, [delBranch]);

  return (
    <div className={styles.container}>
      <div className={styles.curBranch}>
        현재 branch <p>{curBranch}</p>
      </div>
      <div>
        <div className={styles.branchList}>
          <div onClick={showLocalBranches}>local</div>
          {localBranchList.map((branch, idx) => (
            <div
              className={
                localListOpen ? `${styles.openList}` : `${styles.list}`
              }
            >
              <div
                key={idx}
                className={
                  curBranch === branch
                    ? `${styles.branch} ${styles.clicked}`
                    : `${styles.branch}`
                }
                onClick={branchSelector}
                onDoubleClick={branchChanger}
                data-branch={branch}
              >
                {branch}

                <DeleteBranch branch={branch} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.branchList}>
          <div onClick={showRemoteBranches}>remote</div>
          {remoteBranchList.map((branch, idx) => (
            <div
              className={
                remoteListOpen ? `${styles.openList}` : `${styles.list}`
              }
            >
              <div
                key={idx}
                className={styles.branch}
                onDoubleClick={branchChanger}
                data-branch={branch}
              >
                {branch}

                <DeleteBranch branch={branch} />
              </div>
            </div>
          ))}
        </div>
        <BranchManage />
      </div>
      <Modal
        open={stashModalOpen}
        content={
          <>
            <p>변경사항이 있습니다</p>
            <p>commit하거나 임시저장해주세요</p>
            <div className={styles.buttonContainer}>
              <Button
                action={closeModal}
                content={"commit하러 가기"}
                style={{ backgroundColor: "#6BCC78" }}
              />
              <Button
                // action={closeModal}
                content={"stash"}
                style={{ border: "1px solid #7B7B7B" }}
              />
            </div>
          </>
        }
      ></Modal>
    </div>
  );
}

export default BranchList;
