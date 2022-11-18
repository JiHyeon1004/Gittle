import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./Committed.module.css";
import { committedFiles, isLoading,pushBtn } from "../../atoms";
import { useRecoilState } from "recoil";

function Committed(props) {
  
  const repoRoot=localStorage.getItem('currentRepo');
  const {ipcRenderer} = window.require('electron') 
  const [fileList,setFileList]=useState([])
  const [isLoad, SetIsLoad] = useRecoilState(isLoading)
  const [selectedPage,SetSelectedPage]= useRecoilState(pushBtn)
  const returnValue = ipcRenderer.sendSync("call-committed-files", repoRoot);
  const tempArr = returnValue.split("\n");
    const navigate = useNavigate()

    const callFiles=()=>{
        SetIsLoad(true)
        const returnValue=ipcRenderer.sendSync('call-committed-files',repoRoot)
        if(returnValue==='no'){
            alert("커밋된 것이 없습니다.")
            navigate("/add")
            SetSelectedPage("add")
            SetIsLoad(false)
        }
        const tempArr = returnValue.split('\n')

        const resultArr=[]

        for(let i=0;i<tempArr.length;i++){
            if(tempArr[i]!==''){
              console.log(`${i} 번째 : `)
              console.log(tempArr[i])
                resultArr.push(tempArr[i])
            }
        }

        setFileList(resultArr)
        SetIsLoad(false)
    }

    useEffect(()=>{
        callFiles()
        props.settingCommittedData(fileList)
    },[])

    return (
      <>
        <div className={styles.commit}>
          {fileList.map((item, idx) => (
            <div key={idx} className={styles.commitBox}>
              {item}
            </div>
          ))}
        </div>
      </>
    );
  
}

export default Committed;
