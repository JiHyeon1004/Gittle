import React,{useState} from "react";
import styles from "./GitPush.module.css"
import Committed from "../components/pushPage/Committed"
import Push from "../components/pushPage/Push"





function PushPage(){

    const [selectedBranch,setSelectedBranch]=useState("")

    const pushStart=()=>{

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
                    setSelectedBranch(arg)
                }}/>
            </div>
            <div className={styles.buttonArea}>
                <button className={styles.button} onClick={pushStart()}>Push</button>
                
            </div>
        </div>
        </>
    )

}

export default PushPage;