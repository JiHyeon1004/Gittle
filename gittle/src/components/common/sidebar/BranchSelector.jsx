import React, { useEffect, useState } from "react";
import { Octokit, App } from "octokit";

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
      console.log(branches);

      const branchList = [];
      branches.data.forEach((branch) => {
        branchList.push(branch.name);
      });
      setBranchList(branchList);
    }
    getBranchList();
  }, []);

  const onChangeHandler = (e) => {
    setSelectedBranch(e.currentTarget.value);
  };
  const [branchList, setBranchList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  return (
    <div>
      <select onChange={onChangeHandler} value={selectedBranch}>
        {branchList.map((branch) => (
          <option value={branch}>{branch}</option>
        ))}
      </select>
      <p>{selectedBranch}</p>
    </div>
  );
}

export default BranchSelector;
