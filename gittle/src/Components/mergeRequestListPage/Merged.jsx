import React from "react";
import { Octokit } from "octokit";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { mergedRequests } from "../../atoms";

export default function Merged() {
  const [mergedReq, setMergedReq] = useRecoilState(mergedRequests);

  const user = localStorage.getItem("userInfo");
  const location = localStorage.getItem("currentRepo");
  const repoArr = location.split("\\");
  const repo = repoArr[repoArr.length - 1];

  useEffect(() => {
    async function getRequest() {
      const octokit = new Octokit({
        auth: "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",
      });

      const result = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
        owner: user,
        repo: repo,
        state: "closed",
      });

      console.log('닫힘', result.data);
      setMergedReq(result.data);
    }
    getRequest();
  }, []);
  return (
    <>
      <div>
        {mergedReq.map((req, index) => (
          <div key={index}>
            <div>{req.title}</div>
            <div>요청자 : {req.user.login}</div>
            <div>담당자 : {req.assignee.login}</div>
            <div>{req.merged_at.replace("T", " ").replace("Z", "")}</div>
          </div>
        ))}
      </div>
    </>
  );
}
