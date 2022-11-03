import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import Button from "../Button";
import Modal from "../Modal";
import styles from "./BranchSelector.module.css";

function BranchSelector() {
  useEffect(() => {
    async function getBranchList() {
      const octokit = new Octokit({
        auth: "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",
      });
      const branches = await octokit.request(
        "GET /repos/{owner}/{repo}/branches",
        {
          owner: "cli",
          repo: "cli",
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
  };
  const [branchList, setBranchList] = useState([]);
  const [currentBranch, setCurretBranch] = useState("");
  const [prevBranch, setPrevBranch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <select
        className={styles.selector}
        onChange={onChangeHandler}
        value={currentBranch}
      >
        {branchList.map((branch) => (
          <option value={branch}>{branch}</option>
        ))}
      </select>

      <Button
        action={openModal}
        content={"선택"}
        style={{ backgroundColor: "#6BCC78" }}
      />
      <Modal
        open={modalOpen}
        content={
          <>
            <p>
              {prevBranch} branch에서 {currentBranch}branch로 이동하시겠습니까?
            </p>
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
    </div>
  );
}

export default BranchSelector;
