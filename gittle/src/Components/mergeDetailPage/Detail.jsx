import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { mergeRequest, mergeCommit } from "../../atoms";
import styles from "./Detail.module.css";

export default function Detail() {
  const mergeReqInfo = useRecoilValue(mergeRequest);
  const mergeCommitInfo = useRecoilValue(mergeCommit);
  useEffect(() => {
    console.log("!!!!", mergeReqInfo);
    console.log("~~~~~~~~~~", mergeCommitInfo);
  }, []);
  return (
    <>
      <div className={styles.title}>{mergeReqInfo.title}</div>
      {mergeReqInfo.merged ? <div>merge 완료</div> : <div>merge 미완료</div>}
      <div>merge 여부 : {String(mergeReqInfo.merged)}</div>
      <div>merge 가능 여부 : {String(mergeReqInfo.mergeable)}</div>
      <div>
        <img
          src={mergeReqInfo.user.avatar_url}
          alt="avatar"
          className={styles.avatar}
        />
        <div>{mergeReqInfo.user.login}</div>
        <div>
          요청 일자 :{" "}
          {mergeReqInfo.created_at.replace("T", " ").replace("Z", "")}
        </div>
        <div>
          수정 일자 :{" "}
          {mergeReqInfo.updated_at.replace("T", " ").replace("Z", "")}
        </div>
      </div>
      <div>
        <div>push 완료 된 branch : {mergeReqInfo.head.ref}</div>
        <div>merge 할 branch : {mergeReqInfo.base.ref}</div>
      </div>
      <div>내용 : {mergeReqInfo.body}</div>
      <div>
        <div>commit 내역</div>
        <div>
          {mergeCommitInfo.map((commit, index) => (
            <div key={index}>
              <div>{commit.commit.message}</div>
              <div>{commit.commit.author.name}</div>
              <div>
                {commit.commit.author.date.replace("T", " ").replace("Z", "")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
