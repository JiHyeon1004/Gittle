import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
// import Button from "../Button";
// import Modal from "../Modal";
import styles from "./BranchSelector.module.css";

function BranchSelector(props) {
  const { action } = props;
  const [branchList, setBranchList] = useState([]);
  const [currentBranch, setCurretBranch] = useState("");
  const [prevBranch, setPrevBranch] = useState("");
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

  return (
    <>
      <div className={styles.container}>
        <select
          className={styles.selector}
          onChange={action ? action : onChangeHandler}
          value={currentBranch}
        >
          {branchList.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default BranchSelector;
