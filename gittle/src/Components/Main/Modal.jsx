import React, { useState } from "react";
import styles from "./Modal.module.css"
import { useNavigate } from "react-router";
import {CLICK} from '../../constants'



function Modal(props){

    const navigate=useNavigate()
    // const {dialog} =require('@electron/remote');
    const [repoName,setRepoName]=useState("");
    const [repoRoot, setRepoRoot]= useState("");
    const {ipcRenderer} = window.require('electron')

    const findDirectoryRoot = ()=>{
        setRepoRoot(ipcRenderer.sendSync(CLICK,'start'))
    }

    //저장소 이름 가져오기
    const repositoryName =(
            <div className={styles.inputBlock}>
                <div className={styles.names}>Repository 이름</div>
                <input type="text" className={styles.noButton} onChange={(e)=>{
                    setRepoName(e.target.value)
                }}/>
            </div>
        )
    

    //경로 가져오기
    const localPath=(
            <div  className={styles.inputBlock}>
                <div className={styles.names}>Local 경로</div>
                <div onClick={findDirectoryRoot}>
                    <input type="text" readOnly value={repoRoot}/>
                    <button>button</button>
                </div>
            </div>
        )
    

    //버튼 모음
    const buttonFooter=(
            <div className={styles.buttonLayer}>
                <button className={styles.button} onClick={()=>{
                    navigate("/add",{state:{name:repoName,root:repoRoot}})
                }}>만들기</button>
                <button className={styles.button} onClick={()=>props.close()}>취소</button>
            </div>
        )

    return(
        <div className={styles.modal}>
            <div className={styles.nameTag}>
                {'Repository'+props.setModalOpen.name}
            </div>

            {props.setModalOpen.isRoot && repositoryName}

            {localPath}

            {buttonFooter}
            
        </div>
    )
}



export default Modal;