import React,{useState} from "react";
import styles from "./GitPush.module.css"
import Committed from "../components/pushPage/Committed"
import Push from "../components/pushPage/Push"





function PushPage(){

    const [selBranch,setSelBranch]=useState("")
    const {ipcRenderer} = window.require('electron')
    const pushStart=()=>{ 
        if(selBranch===''){
            alert('브랜치를 선택해주세요!')
            return
        }
        const value=ipcRenderer.sendSync('git-Push'  ,{repoRoot: localStorage.getItem('currentRepo'),branch : selBranch})
        console.log(value) 
    }
    
    return (
        <>
        <div className={styles.divide}>
            <div className={styles.committed}>
                <Committed/>
            </div>
            <div className={styles.arrow}>
                <img src={process.env.PUBLIC_URL + '/right-arrow.png'} alt="arrow" className={styles.arrowImg}/>
                Push
            </div>



            <div className={styles.push}>
                <Push changeBranch={(arg)=>{
                    setSelBranch(arg)
                }}/>
            </div>
            <div className={styles.buttonArea}>
                <button className={styles.button} onClick={()=>{pushStart()}}>Push</button>
            </div>
        </div>
        </>
    )

}

export default PushPage;