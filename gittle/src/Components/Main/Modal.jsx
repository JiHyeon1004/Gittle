import React, { useState } from "react";
import styles from "./Modal.module.css"
import { useNavigate } from "react-router";
import {CLICK} from '../../constants'



function Modal(props){
    

    //페이지 넘어가기 위한 변수
    const navigate=useNavigate()

    //페이지 넘어갈 때 필요한 두 가지(저장소 이름, 저장소 폴더 위치)
    const [repoName,setRepoName]=useState("");
    const [repoRoot, setRepoRoot]= useState("");

    //폴더 위치 가져오기 위한 변수선언
    const {ipcRenderer} = window.require('electron')

    //폴더 위치 가져오는 함수
    const findDirectoryRoot = ()=>{
        setRepoRoot(ipcRenderer.sendSync(CLICK,'start'))
    }

    const updateMyRepo= ()=>{
        ipcRenderer.send('update-my-repo',{branch:{repoName},root:{repoRoot}})
    }

    //최근 사용한 Repo로 값 넣어주기
    // const Store=require('electron-store')
    // const store = new Store()

    // const [arr,setArr] = useState(store.get('gittle-myRepo'))

    // function setMyRepoArr(){
    //     arr.unshift({branch:{repoName},root:{repoRoot}})
    // }

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
                    <input className={styles.localPath} type="text" readOnly value={repoRoot}/>
                    <button className={styles.pathButton}>폴더선택</button>
                </div>
            </div>
        )
    

    //버튼 모음
    const buttonFooter=(
            <div className={styles.buttonLayer}>
                <button className={styles.button} onClick={()=>{
                    updateMyRepo()
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