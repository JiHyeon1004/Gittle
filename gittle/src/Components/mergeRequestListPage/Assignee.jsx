import React from "react";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./Assignee.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { mergeRequest, mergeCommit } from "../../atoms";

export default function Assignee() {
  const [requests, setRequests] = useState([]);
  const [detail, setDetail] = useRecoilState(mergeRequest);
  const [commits, setCommits] = useRecoilState(mergeCommit);
  const navigate = useNavigate();

  useEffect(() => {
    const location = localStorage.getItem("currentRepo").split("\\");
    console.log(location);
    const repo = location[location.length - 1];

    async function getAssigned() {
      const octokit = new Octokit({
        auth: "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",
      });
      const assigned = await octokit.request("GET /issues", {});
      const issues = [];
      console.log(assigned);
      assigned.data.map((each) => {
        const issue = {};
        if (each.repository.name === repo) {
          issue.number = each.number;
          issue.title = each.title;
          issue.body = each.body;
          issue.user = each.user.login;
          issue.avatar = each.user.avatar_url;
          issue.created = each.created_at;
          issue.updated = each.updated_at;
        }
        issues.push(issue);
        console.log(issues);
        setRequests(issues);
      });
    }
    getAssigned();
  }, []);

  const reqDetail = async (number) => {
    const result = await showRequest(number);
    navigate("/merge/detail");
  };

  async function showRequest(number) {
    const user = localStorage.getItem("userInfo");
    const location = localStorage.getItem("currentRepo").split("\\");
    console.log(location);
    const repo = location[location.length - 1];

    const octokit = new Octokit({
      auth: "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",
    });

    const info = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner: user,
        repo: repo,
        pull_number: number,
      }
    );

    const commit = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",
      {
        owner: user,
        repo: repo,
        pull_number: number,
      }
    );
    console.log(info.data);
    console.log(commit);

    setDetail(info.data);
    setCommits(commit.data);
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>나에게 할당된 내역</div>
      <div className={styles.assigned}>
        {requests.map((request, index) => (
          <div
            key={index}
            className={styles.box}
            onClick={() => reqDetail(request.number)}
          >
            <div className={styles.title}>{request.title}</div>
            <div className={styles.body}>
              <div className={styles.texttitle}>요청자</div>
              <img className={styles.image} src={request.avatar} alt="avatar" />
              <div className={styles.text}>{request.user}</div>
              <div className={styles.text}>|</div>
              <div className={styles.text}>
                {request.created.replace("T", " ").replace("Z", "")} 에 요청됨
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <Modal
        open={modalOpen}
        content={
          <>
            <div>
              <div>{modal.title}</div>
              <div>
                <div>{modal.avatar_url}</div>
                <div>{modal.login}</div>
                <div>{modal.created_at}</div>
              </div>
              <div>push 완료된 branch : {modal.push}</div>
              <div>merge 할 branch : {modal.merge}</div>
              <div>{modal.body}</div>
            </div>
            <Button
              action={closeModal}
              content={"닫기"}
              style={{ border: "1px solid #7B7B7B" }}
            />
          </>
        }
      ></Modal> */}
    </div>
  );
}
