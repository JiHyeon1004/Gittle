import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { mergeRequest, mergeCommit } from "../../atoms";
import styles from "./Detail.module.css";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { Octokit } from "octokit";
import { useNavigate } from "react-router-dom";

export default function Detail() {
  const mergeReqInfo = useRecoilValue(mergeRequest);
  const mergeCommitInfo = useRecoilValue(mergeCommit);
  const [overview, setOverview] = useState(true);
  const navigate = useNavigate();

  const user = localStorage.getItem("userInfo");
  const location = localStorage.getItem("currentRepo");
  const repoArr = location.split("\\");
  const repo = repoArr[repoArr.length - 1];

  useEffect(() => {
    console.log("!!!!", mergeReqInfo);
    console.log("~~~~~~~~~~", mergeCommitInfo);
  }, []);

  const showOverview = () => {
    setOverview(true);
  };

  const showHistory = () => {
    setOverview(false);
  };

  async function mergeAccept() {
    const octokit = new Octokit({
      auth: "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",
    });

    const merge = await octokit.request(
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge",
      {
        owner: user,
        repo: repo,
        pull_number: mergeReqInfo.number,
        // commit_title: 'Expand enum',
        // commit_message: 'Add a new value to the merge_method enum'
      }
    );

    console.log(merge);
    navigate("/merge/request");
  }

  const goList = () => {
    navigate("/merge/request");
  };

  return (
    <>
      <div className={styles.title}>{mergeReqInfo.title}</div>
      {mergeReqInfo.merged ? (
        <div>merge 완료</div>
      ) : (
        <div className={styles.needmerge}>merge 대기</div>
      )}
      {/* <div>merge 여부 : {String(mergeReqInfo.merged)}</div> */}
      {/* <div>merge 가능 여부 : {String(mergeReqInfo.mergeable)}</div> */}
      <div className={styles.info}>
        <div className={styles.profile}>
          <div className={styles.bold}>요청자</div>
          <img
            src={mergeReqInfo.user.avatar_url}
            alt="avatar"
            className={styles.avatar}
          />
          <div>{mergeReqInfo.user.login} |</div>
        </div>
        <div className={styles.profile}>
          <div className={styles.bold}>요청 일자</div>
          <div>
            {mergeReqInfo.created_at.replace("T", " ").replace("Z", "")} |
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.bold}>수정 일자</div>
          <div>
            {mergeReqInfo.updated_at.replace("T", " ").replace("Z", "")}
          </div>
        </div>
      </div>
      <div className={styles.overview}>
        <div className={styles.tabs}>
          <div className={styles.tab} onClick={showOverview}>
            개요
          </div>
          <div className={styles.tab} onClick={showHistory}>
            변경사항
          </div>
        </div>
        <div className={styles.tabbox}>
          {overview ? (
            <div>
              <div className={styles.request}>
                <div className={styles.push}>
                  <div className={styles.branch}>push 완료 된 branch</div>
                  <div className={styles.pushbranch}>
                    {mergeReqInfo.head.ref}
                  </div>
                </div>
                <div className={styles.arrow}>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className={styles.icon}
                  />
                  <div>merge</div>
                </div>
                <div className={styles.merge}>
                  <div className={styles.branch}>merge 할 branch</div>
                  <div className={styles.mergebranch}>
                    {mergeReqInfo.base.ref}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.bold}>내용</div>
                <div>{mergeReqInfo.body}</div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.bold}>commit 내역</div>
              <div>
                {mergeCommitInfo.map((commit, index) => (
                  <div key={index}>
                    <div>{commit.commit.message}</div>
                    <div>{commit.commit.author.name}</div>
                    <div>
                      {commit.commit.author.date
                        .replace("T", " ")
                        .replace("Z", "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        {!mergeReqInfo.merged ? (
          mergeReqInfo.mergeable ? (
            <Button
              action={mergeAccept}
              content={"merge"}
              style={{
                backgroundColor: "#6BCC78",
                border: "2px solid #6BCC78",
                fontWeight: "600",
              }}
            />
          ) : (
            <Button
              content={"conflict를 해결해주세요"}
              style={{
                border: "2px solid #ff6b6b",
                backgroundColor: "#ff6b6b",
                width: "13rem",
                fontWeight: "600",
              }}
            />
          )
        ) : null}
        <Button
          action={goList}
          content={"목록 가기"}
          style={{ border: "2px solid #6BCC78", fontWeight: "600" }}
        />
      </div>
    </>
  );
}
