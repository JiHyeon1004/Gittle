import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Octokit } from "octokit";
// import Button from "../Button";
// import Modal from "../Modal";
import styles from "./BranchSelector.module.css";

function BranchSelector(props) {
  const { action } = props;
  const [branchList, setBranchList] = useState([]);
  const [currentBranch, setCurretBranch] = useState("");
  const [prevBranch, setPrevBranch] = useState("");
  // 레포지토리 주소 받아오기
  const location = useLocation();
  console.log(location.state.root);
  // 레포지토리 주소에서 이름 저장하기
  const repoArr = location.state.root.split("\\");
  const repo = repoArr[repoArr.length - 1];
  console.log(repo);
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
          repo: repo,
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
