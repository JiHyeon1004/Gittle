import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";

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
          <div key={index}>
            <div>{log.commit.author.name}</div>
            <div>{log.commit.message}</div>
          </div>
        ))}
      </div>
    </>
  );
}
