import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./Remote.module.css";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className={styles.main}>
      <div className={styles.remote}>
        <div className={styles.remotebox}>
          <p>remote</p>
        </div>
        <div className={styles.listandbtn}>
          {branches.length ? (
            <div>
              <div className={styles.box}>
                <div className={styles.title}>branches</div>
                <div className={styles.list}>
                  {branches.map((branch, index) =>
                    push === branch.name ? (
                      <div className={styles.pushbranch}>
                        <FontAwesomeIcon
                          icon={faCodeBranch}
                          className={styles.icon}
                        />
                        <div key={index}>{branch.name}</div>
                      </div>
                    ) : merge === branch.name ? (
                      <div className={styles.mergebranch}>
                        <FontAwesomeIcon
                          icon={faCodeBranch}
                          className={styles.icon}
                        />
                        <div key={index}>{branch.name}</div>
                      </div>
                    ) : (
                      <div className={styles.branch}>
                        <FontAwesomeIcon
                          icon={faCodeBranch}
                          className={styles.icon}
                        />
                        <div
                          key={index}
                          onClick={() => selectBranch(branch.name)}
                        >
                          {branch.name}
                        </div>
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
          <div>merge</div>
        </div>
      </div>
    </div>
  );
}
