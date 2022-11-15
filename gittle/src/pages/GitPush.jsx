import React, { useState } from "react";
import styles from "./GitPush.module.css";
import Committed from "../components/pushPage/Committed";
import Push from "../components/pushPage/Push";
import CommentBox from "../components/pushPage/CommentBox"
import Command from "../components/common/underbar/Command"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { pushedData } from "../atoms";

function PushPage() {
  const [selBranch, setSelBranch] = useState("");
  const { ipcRenderer } = window.require("electron");
  const navigate = useNavigate();
  const [committedList, setCommittedList] = useState([]);
  const [pushData, setPushData] = useRecoilState(pushedData);
  const [isMerge, setIsMerge] = useState(false);
  const [cmd , SetCmd] =useState([])
  // useEffect(()=>{

  // },[])
  const pushStart = () => {
    if (selBranch === "") {
      alert("브랜치를 선택해주세요!");
      return;
    }
    const value = ipcRenderer.sendSync("git-Push", {
      repoRoot: localStorage.getItem("currentRepo"),
      branch: selBranch,
    });

    if(value==='error'){
      alert("해당 브랜치에 푸시할 수 없습니다. 먼저 풀을 당겨서 원격 브랜치와 로컬 브린치의 버전을 맞춰주세요")
      return;
    }

    const result = { branch: selBranch, commitList: committedList };
    setPushData(result);
    let arr = cmd.slice()
    
    SetCmd(arr.push(`git push origin ${selBranch}`))
    console.log('세팅완료 : ')
    for(let i=0;i<cmd.length;i++){
      console.log(cmd[i])
    }
    setIsMerge(true);
    // console.log(value);
    // navigate("/merge/ready");
  };

  return (
    <>
      <div className={styles.divide}>
        <div className={styles.committed}>
          <CommentBox location="local"></CommentBox>
          <Committed
            settingCommittedData={(arg) => {
              setCommittedList(arg);
            }}
          />
        </div>
        <div className={styles.arrow}>
          <img
            src={process.env.PUBLIC_URL + "/right-arrow.png"}
            alt="arrow"
            className={styles.arrowImg}
          />
          Push
        </div>

        <div className={styles.push}>
        <CommentBox location="remote"></CommentBox>
          <Push
            changeBranch={(arg) => {
              setSelBranch(arg);
            }}
          />
        </div>
        <div className={styles.buttonArea}>
          {!isMerge && <button
            className={styles.button}
            onClick={() => {
              pushStart();
            }}
          >
            Push
          </button>}
          {isMerge && <button
            className={styles.mergeButton}
            onClick={() => {
              navigate("/merge/ready");
            }}
          >
            Merge
          </button>}
        </div>
        <Command cmd={JSON.stringify(cmd)}></Command>
      </div>
    </>
  );
}

export default PushPage;
