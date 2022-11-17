import React, { useState } from "react";
import styles from "./GitPush.module.css";
import Committed from "../components/pushPage/Committed";
import Push from "../components/pushPage/Push";
import CommentBox from "../components/pushPage/CommentBox"
import Command from "../components/common/underbar/Command"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { pushedData, commandLine, isLoading } from "../atoms";

function PushPage() {
  const [selBranch, setSelBranch] = useState("");
  const { ipcRenderer } = window.require("electron");
  const navigate = useNavigate();
  const [committedList, setCommittedList] = useState([]);
  const [pushData, setPushData] = useRecoilState(pushedData);
  const [isMerge, setIsMerge] = useState(false);
  // const [cmd , SetCmd] =useState("")
  const [cmd, SetCmd] = useRecoilState(commandLine)
  const [isLoad , SetIsLoad] = useRecoilState(isLoading)
  
  const pushStart = () => {
    SetIsLoad(true)
    if (selBranch === "") {
      alert("브랜치를 선택해주세요!");
      SetIsLoad(false)
      return;
    }
    const value = ipcRenderer.sendSync("git-Push", {
      repoRoot: localStorage.getItem("currentRepo"),
      branch: selBranch,
    });

    if(value==='error'){
      alert("해당 브랜치에 푸시할 수 없습니다. 먼저 풀을 당겨서 원격 브랜치와 로컬 브린치의 버전을 맞춰주세요")
      SetIsLoad(false)
      return;


      
    }

    const result = { branch: selBranch, commitList: committedList };
    setPushData(result);
    let text = cmd+'\n'+`git push origin ${selBranch}`
    
    
    SetCmd(text)
    
    setIsMerge(true);
    SetIsLoad(false)
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
        
        <Command cmd={cmd}></Command>
      </div>
    </>
  );
}

export default PushPage;
