import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pushedBranch, mergingBranch, pullNumber } from "../atoms";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MergePage.module.css";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";

function MergePage() {
  const [repository, setRepository] = useState("");
  const pushed = useRecoilValue(pushedBranch);
  const merging = useRecoilValue(mergingBranch);
  console.log(pushed, merging);
  const user = localStorage.getItem("userInfo");
  const location = localStorage.getItem("currentRepo");
  // 레포지토리 주소에서 이름 저장하기
  const repoArr = location.split("\\");
  const repo = repoArr[repoArr.length - 1];
  // pull number 저장하기
  const [pullNum, setPullNum] = useRecoilState(pullNumber);

  // useEffect(() => {
  async function mergeRequest() {
    const octokit = new Octokit({
      auth: "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",
    });

    const response = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
      owner: user,
      repo: repo,
      title: "Amazing new feature",
      body: "Please pull these awesome changes in!",
      head: pushed,
      base: merging,
    });

    console.log(response);
    setPullNum(response.number);
  }
  // mergeRequest();
  // }, [isClicked]);

  return (
    <div>
      <p>merge</p>
      <div className={styles.merge}>
        <div className={styles.text}>
          <p className={styles.branch}>{pushed}</p>
          <p>branch에서</p>
        </div>
        <div className={styles.arrow}>
          <FontAwesomeIcon icon={faCircleArrowRight} className={styles.icon} />
          <p>merge</p>
        </div>
        <div className={styles.text}>
          <p className={styles.branch}>{merging}</p>
          <p>branch로</p>
        </div>
      </div>
      <div>
        <p>제목</p>
        <input type="text" />
      </div>
      <div>
        <p>설명</p>
        <input type="text" />
      </div>
      <button
        onClick={async () => {
          await mergeRequest();
        }}
      >
        merge request
      </button>
    </div>
  );
}

export default MergePage;
