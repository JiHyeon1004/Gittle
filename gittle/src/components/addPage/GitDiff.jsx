import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./GitDiff.module.css";

export default function GitDiff() {
  // 마지막으로 커밋한 날짜
  const [date, setDate] = useState("");
  // 마지막으로 커밋한 사람
  const [user, setUser] = useState("");
  // 마지막 커밋 메세지
  const [message, setMessage] = useState("");
  // 마지막 커밋 로그
  const [commit, setCommit] = useState("");
  // 마지막 커밋 변경 파일 목록
  const [files, setFiles] = useState([]);
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
      setUser(branch.data.commit.commit.author.name);
      setMessage(branch.data.commit.commit.message);
      setCommit(branch.data.commit.sha);
    }
    getBranch();
  }, []);

  useEffect(() => {
    // 해당 branch 마지막 커밋 정보 가져오기
    // auth, owner, repo 변수에 저장해서 사용해야 함
    async function getCommit() {
      const octokit = new Octokit({
        auth: "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",
      });

      const commitInfo = await octokit.request(
        "GET /repos/{owner}/{repo}/commits/{ref}",
        {
          owner: "junghyun1009",
          repo: "TIL",
          ref: commit,
        }
      );

      console.log("11", commitInfo);
      setFiles(commitInfo.data.files);
    }
    getCommit();
  }, [commit]);
  return (
    <>
      <p>최종 수정 시간 : {date}</p>
      <p>변경한 사람 : {user}</p>
      <p>커밋 메세지 : {message}</p>
      <div>
        {files.map((file, index) => (
          <div key={index}>
            <p>{file.filename}</p>
            <pre style={{ color: "crimson" }}>{file.patch}</pre>
            <p className={styles.code}>{file.patch}</p>
          </div>
        ))}
      </div>
    </>
  );
}
