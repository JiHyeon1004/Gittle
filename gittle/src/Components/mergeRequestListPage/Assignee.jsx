import react from "react";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./Assignee.module.css";

export default function Assignee() {
  const [requests, setRequests] = useState([]);
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
  return (
    <div className={styles.main}>
      <div className={styles.title}>나에게 할당된 내역</div>
      <div className={styles.assigned}>
        {requests.map((request, index) => (
          <div key={index} className={styles.box}>
            <div className={styles.title}>{request.title}</div>
            <div className={styles.body}>
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
    </div>
  );
}
