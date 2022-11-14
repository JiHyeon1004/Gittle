import React from "react";
import { Octokit } from "octokit";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./Reviewer.module.css";

export default function Reviewer() {
  const [reviews, setReviews] = useState([]);
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

  return (
    <div className={styles.main}>
      <div className={styles.title}>나에게 검토가 요청된 내역</div>
      <div className={styles.assigned}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.box}>
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
