import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import BranchSelector from "../BranchSelector";
import Button from "../Button";
import Modal from "../Modal";
import styles from "./BranchSelector.module.css";
import { useRecoilState } from "recoil";
import { selectBranch } from "../../../atoms";

function BranchChanger() {
  const [branchList, setBranchList] = useState([]);
  const [currentBranch, setCurretBranch] = useState("");
  const [prevBranch, setPrevBranch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    async function getBranchList() {
      const user = localStorage.getItem("userInfo");
      const octokit = new Octokit({
        auth: "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",
      });
      const branches = await octokit.request(
        "GET /repos/{owner}/{repo}/branches",
        {
          owner: user,
          repo: "TIL",
        }
      );

      const branchList = [];
      branches.data.forEach((branch) => {
        branchList.push(branch.name);
      });
      setBranchList(branchList);
      setCurretBranch(branchList[0]);
    }
    getBranchList();
  }, []);

  const onChangeHandler = (e) => {
    setPrevBranch(currentBranch);
    setCurretBranch(e.currentTarget.value);
    openModal();
  };
  const [branchList, setBranchList] = useState([]);
  const [currentBranch, setCurretBranch] = useState("");
  const [prevBranch, setPrevBranch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [branch, setBranch] = useRecoilState(selectBranch);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const changeBranch = () => {
    closeModal();
    console.log("바꿔쓰", currentBranch);
    setBranch(currentBranch);
  };
  const onChangeHandler = (e) => {
    setPrevBranch(currentBranch);
    setCurretBranch(e.currentTarget.value);
    openModal();
  };

  return (
    <>
      <BranchSelector action={onChangeHandler} />
      <Modal
        open={modalOpen}
        content={
          <>
            {prevBranch ? (
              <p>
                <span className={styles.branch}>{prevBranch}</span> branch에서{" "}
                <span className={styles.branch}>{currentBranch}</span> branch로
                이동하시겠습니까?
              </p>
            ) : (
              <p>
                <span className={styles.branch}>{currentBranch}</span> branch로
                이동하시겠습니까?
              </p>
            )}
          </>
        }
      >
        <div className={styles.buttonContainer}>
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

export default BranchChanger;
