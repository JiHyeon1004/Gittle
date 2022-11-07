import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./GitDiff.module.css";

export default function GitDiff({ diffFiles, diff }) {
  // 마지막으로 커밋한 날짜
  const [date, setDate] = useState("");
  // 마지막으로 커밋한 사람
  const [user, setUser] = useState("");
  // 마지막 커밋 메세지
  const [message, setMessage] = useState("");
  // 마지막 커밋 로그
  // const [commit, setCommit] = useState("");
  // 마지막 커밋 변경 파일 목록
  const [files, setFiles] = useState([]);
  // 마지막 커밋에서 모든 파일의 코드
  const [codeBefore, setCodeBefore] = useState([]);
  const [codeAfter, setCodeAfter] = useState([]);
  const [fileIdx, setFileIdx] = useState(0);
  // 레포지토리 주소 받아오기
  const location = localStorage.getItem("currentRepo");
  console.log(location);
  // 레포지토리 주소에서 이름 저장하기
  const repoArr = location.split("\\");
  const repo = repoArr[repoArr.length - 1];
  console.log(repo);
  // 현재 작업 중인 브랜치 저장
  const [currBranch, setCurrBranch] = useState("");

  useEffect(() => {
    // 해당 branch 정보 가져오기
    // auth, owner, repo, branch 변수에 저장해서 사용해야 함
    // 선택한 레포지토리에서 브랜치 가져오기
    const { ipcRenderer } = window.require("electron");
    const currentBranch = ipcRenderer.sendSync("gitBranch", location);
    setCurrBranch(currentBranch);
    console.log("브랜치", currentBranch);
    async function getBranch() {
      const user = localStorage.getItem("userInfo");
      const octokit = new Octokit({
        auth: "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",
      });

      const branch = await octokit.request(
        "GET /repos/{owner}/{repo}/branches/{branch}",
        {
          owner: user,
          repo: repo,
          branch: currentBranch.replace(/\n/g, ""),
        }
      );

      // console.log(branch);
      // console.log(branch.data.commit.commit.author);
      setDate(
        branch.data.commit.commit.author.date.replace("T", " ").replace("Z", "")
      );
      setUser(branch.data.commit.commit.author.name);
      setMessage(branch.data.commit.commit.message);
      // setCommit(branch.data.commit.sha);
    }
    getBranch();
  }, []);

  useEffect(() => {
    // unstaged에서 선택한 파일들의 git diff 보여주기
    async function getCommit() {
      // const octokit = new Octokit({
      //   auth: "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",
      // });

      // const commitInfo = await octokit.request(
      //   "GET /repos/{owner}/{repo}/commits/{ref}",
      //   {
      //     owner: "junghyun1009",
      //     repo: "TIL",
      //     ref: commit,
      //   }
      // );

      // console.log("11", commitInfo);
      setFiles(diffFiles);
      let fileBefore = [];
      let fileAfter = [];
      diff.map((file) => {
        // setCodes((prev) => [...prev, file.patch.split("\n")]);
        let before = [];
        let after = [];
        let lines = file.split("\n");
        lines.map((line) => {
          if (line[0] === "-") {
            before.push(line);
          } else if (line[0] === "+") {
            after.push(line);
          } else {
            before.push(line);
            after.push(line);
          }
        });
        fileBefore.push(before);
        fileAfter.push(after);
        console.log("before", before);
        console.log("after", after);
        console.log("files", files);
      });
      console.log("fileBefore", fileBefore);
      console.log("fileAfter", fileAfter);
      setCodeBefore(fileBefore);
      setCodeAfter(fileAfter);
    }
    getCommit();
  }, [diffFiles]);

  const showCode = (index) => {
    setFileIdx(index);
  };

  // const { ipcRenderer } = window.require("electron");
  // let gitDiff = ipcRenderer.sendSync("gitDiff");

  return (
    <>
      <div className={styles.textbox}>
        <div className={styles.text}>최종 수정 시간 : {date}</div>
        <div className={styles.text}>변경한 사람 : {user}</div>
        <div className={styles.text}>커밋 메세지 : {message}</div>
      </div>
      {/* <div>{diff}</div> */}
      <div>
        {files.length && codeBefore.length && codeAfter.length ? (
          <div>
            <div className={styles.codebox}>
              {files.map((file, index) => (
                <div
                  key={index}
                  className={styles.file}
                  onClick={() => showCode(index)}
                >
                  {index === fileIdx ? (
                    <div className={styles.active}>{file}</div>
                  ) : (
                    <div className={styles.filename}>{file}</div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.code}>
              <div className={styles.codebefore}>
                <div className={styles.title}>변경 전</div>
                <div className={styles.box}>
                  {codeBefore[fileIdx].map((code, index) => (
                    <div key={index}>
                      {code[0] === "-" ? (
                        <div className={styles.minus}>{code}</div>
                      ) : (
                        <div className={styles.zero}>{code}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.codeafter}>
                <div className={styles.title}>변경 후</div>
                <div className={styles.box}>
                  {codeAfter[fileIdx].map((code, index) => (
                    <div key={index}>
                      {code[0] === "+" ? (
                        <div className={styles.plus}>{code}</div>
                      ) : (
                        <div className={styles.zero}>{code}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>변경사항이 없습니다!</div>
        )}
      </div>
    </>
  );
}
