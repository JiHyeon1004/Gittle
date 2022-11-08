import React from "react";
import { useRecoilValue } from "recoil";
import { pushedBranch, mergingBranch } from "../atoms";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MergePage.module.css";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";

function MergePage() {
  // push된 브랜치와 merge할 브랜치 받아오기
  const pushed = useRecoilValue(pushedBranch);
  const merging = useRecoilValue(mergingBranch);
  // user와 현재 repo 받아오기
  const user = localStorage.getItem("userInfo");
  const location = localStorage.getItem("currentRepo");
  const repoArr = location.split("\\");
  const repo = repoArr[repoArr.length - 1];
  // collaborator 저장하기
  const [collab, setCollab] = useState([]);
  // reviewer 저장하기
  const [reviewer, setReviewer] = useState([]);
  // 제목 저장하기
  const [title, setTitle] = useState("");
  // 설명 저장하기
  const [description, setDescription] = useState("");
  // 담당자 저장하기
  const [assignees, setAssignees] = useState("");
  // 리뷰어 저장하기
  const [reviewers, setReviewers] = useState("");

  // merge request 보내는 함수
  async function mergeRequest() {
    const octokit = new Octokit({
      auth: "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",
    });

    const merge = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
      owner: user,
      repo: repo,
      title: title,
      body: description,
      head: pushed,
      base: merging,
    });

    console.log("숫자", merge.data.number);
    return merge.data.number;
  }

  // assignee 등록하고, review 요청 보내는 함수
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
        assignees: [assignees],
      }
    );

    const review = await octokit.request(
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
      {
        owner: user,
        repo: repo,
        pull_number: pullNum,
        reviewers: [reviewers],
      }
    );

    console.log(assignee);
    console.log(review);
    return { assignee, review };
  }

  // 현재 repo에서 collaborator 정보 받아오는 함수
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
      const members = [{ value: "null", name: "선택 안 함" }];
      const exceptMe = [{ value: "null", name: "선택 안 함" }];
      collaborator.data.map((member) => {
        const each = {};
        each.value = member.login;
        each.name = member.login;
        members.push(each);
        if (each.name !== user) {
          exceptMe.push(each);
        }
      });
      console.log(members);
      setCollab(members);
      setReviewer(exceptMe);
    }
    getCollab();
  }, []);

  // 제목 저장하기
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 설명 저장하기
  const onDesChange = (e) => {
    setDescription(e.target.value);
  };

  // 담당자 저장하기
  const onAssigneeChange = (e) => {
    setAssignees(e.target.value);
  };

  // 리뷰어 저장하기
  const onReviewerChange = (e) => {
    setReviewers(e.target.value);
  };

  // 한꺼번에 요청 보내기!
  const sendRequest = async () => {
    const pullNumber = await mergeRequest();
    const response = await reviewRequest(pullNumber);
    return response;
  };

  return (
    <div className={styles.main}>
      <p>merge</p>
      <div className={styles.merge}>
        <div className={styles.text}>
          <p className={styles.pushedbranch}>{pushed}</p>
          <p className={styles.line}>branch 에서</p>
        </div>
        <div className={styles.arrow}>
          <FontAwesomeIcon icon={faCircleArrowRight} className={styles.icon} />
          <p>merge</p>
        </div>
        <div className={styles.text}>
          <p className={styles.mergingbranch}>{merging}</p>
          <p className={styles.line}>branch 로</p>
        </div>
      </div>
      <div>
        <p className={styles.title}>제목</p>
        <input type="text" onChange={onTitleChange} value={title} className={styles.titleinput} />
      </div>
      <div>
        <p className={styles.title}>설명</p>
        <textarea
          name="description"
          cols="50"
          rows="10"
          onChange={onDesChange}
          value={description}
          className={styles.input}
        ></textarea>
      </div>
      <div className={styles.review}>
        <div>
          <p className={styles.title}>담당자</p>
          <select onChange={onAssigneeChange} className={styles.select}>
            {collab.map((member) => (
              <option
                key={member.value}
                value={member.value}
                defaultValue={member.value === "null"}
                className={styles.option}
              >
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.reviewer}>
          <p className={styles.title}>검토자</p>
          <select onChange={onReviewerChange} className={styles.select}>
            {reviewer.map((member) => (
              <option
                key={member.value}
                value={member.value}
                defaultValue={member.value === "null"}
                className={styles.option}
              >
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={sendRequest}>merge 요청하기</button>
    </div>
  );
}

export default MergePage;
