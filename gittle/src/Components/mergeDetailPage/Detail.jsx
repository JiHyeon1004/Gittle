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
  const [commit, setCommit] = useState("");
  const [commitIdx, setCommitIdx] = useState(0);
  // 마지막 커밋 변경 파일 목록
  const [files, setFiles] = useState([]);
  const [commitId, setCommitId] = useState("");
  // 마지막 커밋에서 모든 파일의 코드
  const [codeBefore, setCodeBefore] = useState([]);
  const [codeAfter, setCodeAfter] = useState([]);
  const [fileIdx, setFileIdx] = useState(0);
  const [file, setFile] = useState("");
  // 설명 저장하기
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const user = localStorage.getItem("userInfo");
  const location = localStorage.getItem("currentRepo");
  const repoArr = location.split("\\");
  const repo = repoArr[repoArr.length - 1];

  useEffect(() => {
    console.log("!!!!", mergeReqInfo);
    console.log("~~~~~~~~~~", mergeCommitInfo);
  }, []);

  useEffect(() => {
    async function getCommit() {
      const user = localStorage.getItem("userInfo");
      const location = localStorage.getItem("currentRepo").split("\\");
      console.log(location);
      const repo = location[location.length - 1];
      const octokit = new Octokit({
        auth: "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",
      });

      const commitInfo = await octokit.request(
        "GET /repos/{owner}/{repo}/commits/{ref}",
        {
          owner: user,
          repo: repo,
          ref: commit,
        }
      );

      console.log("lalalal", commitInfo);
      setFiles(commitInfo.data.files);
      setCommitId(commitInfo.data.sha);
      let fileBefore = [];
      let fileAfter = [];
      commitInfo.data.files.map((file) => {
        // setCodes((prev) => [...prev, file.patch.split("\n")]);
        let before = [];
        let after = [];
        let lines = file.patch.split("\n");
        lines.map((line) => {
          if (line[0] === "-") {
            before.push(line);
          } else if (line[0] === "+") {
            after.push(line);
          } else {
            before.push(line);
            after.push(line);
          }
        });
        fileBefore.push(before);
        fileAfter.push(after);
      });
      setCodeBefore(fileBefore);
      setCodeAfter(fileAfter);
      setFileIdx(0);
    }
    getCommit();
  }, [commit]);

  const showOverview = () => {
    setOverview(true);
  };

  const showHistory = () => {
    setOverview(false);
  };

  const showDiff = (sha, index) => {
    setCommit(sha);
    setCommitIdx(index);
  };

  const showCode = (index) => {
    setFileIdx(index);
  };

  const saveFile = (e) => {
    setFile(e.target.value);
  };
  // 설명 저장하기
  const onDesChange = (e) => {
    console.log(11111111111111);
    setDescription(e.target.value);
  };

  async function saveReview(sha) {
    const octokit = new Octokit({
      auth: "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",
    });

    const review = await octokit.request(
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments",
      {
        owner: user,
        repo: repo,
        pull_number: mergeReqInfo.number,
        body: description,
        commit_id: sha,
        path: file,
        line: 1,
      }
    );

    console.log(review);
  }

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

  const sendReview = async (sha) => {
    console.log("클릭", sha);
    const review = await saveReview(sha);
    // event.stopPropagation();
    navigate("/merge/request");
  };

  return (
    <>
      <div className={styles.reqtitle}>{mergeReqInfo.title}</div>
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
            className={styles.reqavatar}
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
            {overview ? (
              <div className={styles.selected}>개요</div>
            ) : (
              <div>개요</div>
            )}
          </div>
          <div
            className={styles.tab}
            onClick={(event) => {
              event.stopPropagation();
              showHistory();
            }}
          >
            {overview ? (
              <div>변경사항</div>
            ) : (
              <div className={styles.selected}>변경사항</div>
            )}
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
                    <div className={styles.logbox}>
                      <div
                        className={styles.commitprofile}
                        onClick={(event) => {
                          event.stopPropagation();
                          showDiff(commit.sha, index);
                        }}
                      >
                        <img
                          src={commit.author.avatar_url}
                          alt="avatar"
                          className={styles.avatar}
                        />
                        <div className={styles.textbox}>
                          <div className={styles.message}>
                            {commit.commit.message}
                          </div>
                          <div className={styles.authortime}>
                            <div className={styles.name}>
                              {commit.commit.author.name}
                            </div>
                            <div className={styles.time}>
                              {commit.commit.author.date
                                .replace("T", " ")
                                .replace("Z", "")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {files.length &&
                        codeBefore.length &&
                        codeAfter.length &&
                        commit.sha === commitId ? (
                          <div>
                            <div className={styles.codearea}>
                              <div className={styles.codebox}>
                                {files.map((file, index) => (
                                  <div
                                    key={index}
                                    className={styles.file}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      showCode(index);
                                    }}
                                  >
                                    {index === fileIdx ? (
                                      <div className={styles.active}>
                                        {file.filename}
                                      </div>
                                    ) : (
                                      <div className={styles.filename}>
                                        {file.filename}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className={styles.code}>
                                <div className={styles.codebefore}>
                                  <div className={styles.title}>변경 전</div>
                                  <div className={styles.box}>
                                    {codeBefore[fileIdx].map((code, index) => (
                                      <div key={index}>
                                        {code[0] === "-" ? (
                                          <div className={styles.minus}>
                                            {code}
                                          </div>
                                        ) : (
                                          <div className={styles.zero}>
                                            {code}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className={styles.codeafter}>
                                  <div className={styles.title}>변경 후</div>
                                  <div className={styles.box}>
                                    {codeAfter[fileIdx].map((code, index) => (
                                      <div key={index}>
                                        {code[0] === "+" ? (
                                          <div className={styles.plus}>
                                            {code}
                                          </div>
                                        ) : (
                                          <div className={styles.zero}>
                                            {code}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.review}>
                              <div className={styles.comment}>검토</div>
                              <div className={styles.commentbox}>
                                <div className={styles.des}>
                                  해당 commit에서 검토한 파일을 체크해주세요.
                                </div>
                                <div>
                                  {files.map((file, index) => (
                                    <div key={index}>
                                      <label className={styles.label}>
                                        <input
                                          type="radio"
                                          value={file.filename}
                                          name={file.filename}
                                          onChange={saveFile}
                                        />
                                        <div className={styles.radio}>
                                          {file.filename}
                                        </div>
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                <div className={styles.des}>
                                  검토한 내용을 적어주세요.
                                </div>
                                <textarea
                                  name="description"
                                  cols="50"
                                  rows="3"
                                  onChange={onDesChange}
                                  value={description}
                                  className={styles.input}
                                ></textarea>
                              </div>
                              <Button
                                onClick={(event) => {
                                  alert("1");
                                  event.stopImmediatePropagation();
                                  alert("2");
                                  sendReview(commit.sha);
                                }}
                                content={"작성하기"}
                                style={{
                                  backgroundColor: "#6BCC78",
                                  border: "2px solid #6BCC78",
                                  fontWeight: "600",
                                }}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
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
