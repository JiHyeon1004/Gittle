import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";

export default function GitDiff() {
  const [date, setDate] = useState("");
  useEffect(() => {
    // 해당 branch 정보 가져오기
    // auth, owner, repo, branch 변수에 저장해서 사용해야 함
    async function getBranch() {
      const octokit = new Octokit({
        auth: "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",
      });

      const branch = await octokit.request(
        "GET /repos/{owner}/{repo}/branches/{branch}",
        {
          owner: "junghyun1009",
          repo: "TIL",
          branch: "main",
        }
      );

      console.log(branch);
      console.log(branch.data.commit.commit.author);
      setDate(branch.data.commit.commit.author.date);
    }
    getBranch();
  }, []);
  return (
    <>
      <p>최종 수정 시간 : {date}</p>
    </>
  );
}
