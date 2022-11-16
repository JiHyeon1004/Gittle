import React,{useState,useEffect} from "react";
import { useRecoilState } from "recoil";
import {commandBranch,commandLine} from "../../../atoms"
import styles from "./Command.module.css"


function Command(props){

    const [cmd,setCmd] = useRecoilState(commandLine)
    let arr =cmd.split('\n')
    const [isActive,SetIsActive] = useState(false)

    

    return(
        <>
            <div className={!isActive ? styles.cmdBox : styles.bigCmdBox}>
                <div className={styles.button} onClick={()=>{
                    
                    SetIsActive(!isActive)
                }}>
                    {!isActive && '^'}
                    {isActive && 'V'}
                </div>
                <div className={styles.wordBox}>
                    {!isActive && 
                        <div className={styles.cmd}>
                        {arr[arr.length-1]}
                    </div> }
                    
                    {isActive && 
                        arr.map((item, idx)=>(
                            <div key={idx} className={styles.cmd}>
                                {item}
                            </div>
                        ))
                    }
                </div>
                
            </div>
            </>
        
    )
}



export default Command


