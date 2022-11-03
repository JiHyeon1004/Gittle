import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./Remote.module.css";

// push된 브랜치 이름 받아오기
export default function Remote() {
  const [branches, setBranches] = useState([]);
  const [push, setPush] = useState("");
  const [merge, setMerge] = useState("");

  useEffect(() => {
    async function getBranches() {
      const octokit = new Octokit({
        auth: "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",
      });

      const branch = await octokit.request(
        "GET /repos/{owner}/{repo}/branches",
        {
          owner: "junghyun1009",
          repo: "TIL",
        }
      );
      console.log("1", branch);
      setBranches(branch.data);
    }
    getBranches();
    // push된 branch 받아오기
    setPush("test");
  }, []);

  const selectBranch = (branch) => {
    setMerge(branch);
  };

  return (
    <>
      <div>
        {branches.length ? (
          <div>
            <div className={styles.box}>
              <div className={styles.title}>branches</div>
              <div className={styles.list}>
                {branches.map((branch, index) =>
                  push === branch.name ? (
                    <div key={index} className={styles.pushbranch}>
                      {branch.name}
                    </div>
                  ) : merge === branch.name ? (
                    <div key={index} className={styles.mergebranch}>
                      {branch.name}
                    </div>
                  ) : (
                    <div
                      key={index}
                      onClick={() => selectBranch(branch.name)}
                      className={styles.branch}
                    >
                      {branch.name}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.push}></div>
              <div className={styles.text}>push 완료된 branch</div>
            </div>
            <div className={styles.info}>
              <div className={styles.merge}></div>
              <div className={styles.text}>merge 할 branch</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
