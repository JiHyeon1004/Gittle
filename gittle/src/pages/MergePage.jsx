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
  // collaborator 저장하기
  const [collab, setCollab] = useState([]);

  async function mergeRequest() {
    const octokit = new Octokit({
      auth: "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",
    });

    const merge = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
      owner: user,
      repo: repo,
      title: "Amazing new feature",
      body: "Please pull these awesome changes in!",
      head: pushed,
      base: merging,
    });

    console.log("숫자", merge.data.number);
    return merge.data.number;
  }

  // useEffect(() => {
  async function reviewRequest(pullNum) {
    console.log("들어오라고고고", pullNum);
    const octokit = new Octokit({
      auth: "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",
    });

    const assignee = await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
      {
        owner: user,
        repo: repo,
        issue_number: pullNum,
        assignees: ["junghyun1009"],
      }
    );

    const review = await octokit.request(
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
      {
        owner: user,
        repo: repo,
        pull_number: pullNum,
        reviewers: ["uussong"],
      }
    );

    console.log(assignee);
    console.log(review);
    return { assignee, review };
  }
  // reviewRequest();
  // }, [[pullNum]]);

  useEffect(() => {
    async function getCollab() {
      const octokit = new Octokit({
        auth: "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",
      });

      const collaborator = await octokit.request(
        "GET /repos/{owner}/{repo}/collaborators",
        {
          owner: user,
          repo: repo,
        }
      );
      console.log(collaborator);
      const members = [];
      collaborator.data.map((member) => {
        members.push(member.login);
      });
      setCollab(members);
    }
    getCollab();
  }, []);

  const sendRequest = async () => {
    const pullNumber = await mergeRequest();
    const response = await reviewRequest(pullNumber);
    return response;
  };

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
      <button onClick={sendRequest}>merge 요청하기</button>
      <hr />
      <div>리뷰 요청</div>
      <div>
        <div>검토자</div>
        {collab.map((each, index) => (
          <div key={index}>{each}</div>
        ))}
      </div>
      {/* <button
        onClick={async () => {
          await reviewRequest();
        }}
      >
        리뷰 요청하기
      </button> */}
    </div>
  );
}

export default MergePage;
