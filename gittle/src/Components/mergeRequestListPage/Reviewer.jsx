import React from "react";
import { Octokit } from "octokit";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./Reviewer.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { mergeRequest, mergeCommit } from "../../atoms";

export default function Reviewer() {
  const [reviews, setReviews] = useState([]);
  const [detail, setDetail] = useRecoilState(mergeRequest);
  const [commits, setCommits] = useRecoilState(mergeCommit);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const location = localStorage.getItem("currentRepo").split("\\");
    console.log(location);
    const repo = location[location.length - 1];

    async function getReview() {
      const octokit = new Octokit({
        auth: "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",
      });

      const result = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
        owner: user,
        repo: repo,
        state: "open",
      });

      console.log(result.data);
      const myReview = [];
      result.data.map((each) => {
        each.requested_reviewers.map((reviewer) => {
          if (reviewer.login === user) {
            myReview.push(each);
          }
        });
      });
      setReviews(myReview);
    }
    getReview();
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
      <div className={styles.title}>나에게 검토가 요청된 내역</div>
      <div className={styles.assigned}>
        {reviews.map((review, index) => (
          <div
            key={index}
            className={styles.box}
            onClick={() => reqDetail(review.number)}
          >
            <div className={styles.title}>{review.title}</div>
            <div className={styles.body}>
              <div className={styles.texttitle}>요청자</div>
              <img
                className={styles.image}
                src={review.user.avatar_url}
                alt="avatar"
              />
              <div className={styles.text}>{review.user.login}</div>
              <div className={styles.text}>|</div>
              <div className={styles.text}>
                {review.created_at.replace("T", " ").replace("Z", "")} 에 요청됨
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
