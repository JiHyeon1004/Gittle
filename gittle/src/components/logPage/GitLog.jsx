import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./GitLog.module.css";

export default function GitLog() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    async function getLog() {
      const octokit = new Octokit({
        auth: "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",
      });

      const result = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: "junghyun1009",
          repo: "TIL",
          sha: "test",
        }
      );

      console.log(result);

      setLogs(result.data);
    }
    getLog();
  }, []);
  return (
    <>
      <div>
        {logs.map((log, index) => (
          <div key={index} className={styles.logbox}>
            <img
              src={log.committer.avatar_url}
              alt="avatar"
              className={styles.avatar}
            />
            <div className={styles.textbox}>
              <div className={styles.message}>{log.commit.message}</div>
              <div className={styles.name}>{log.committer.login}</div>
              <div className={styles.time}>{log.commit.author.date}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
