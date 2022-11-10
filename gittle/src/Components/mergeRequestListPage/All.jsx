import React from "react";
import { Octokit } from "octokit";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allRequests } from "../../atoms";

export default function All(){
  const [allReq, setAllReq] = useRecoilState(allRequests);

  const user = localStorage.getItem("userInfo");
  const location = localStorage.getItem("currentRepo");
  const repoArr = location.split("\\");
  const repo = repoArr[repoArr.length - 1];

  useEffect(() => {
    async function getAll() {
      const octokit = new Octokit({
        auth: "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",
      })

      const result = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
        owner: user,
        repo: repo,
        state: "all",
      })

      console.log('전체', result.data)
      setAllReq(result.data)
    }
    getAll()
  }, [])
  return (
    <>
    <div>
      {allReq.map((req, index) => (
        <div key={index}>
          <div>{req.title}</div>
          <div>{req.user.login}</div>
          <div>{req.merged_at}</div>
        </div>
      ))}
    </div>
    </>
  )
}