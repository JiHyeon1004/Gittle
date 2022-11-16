import React,{useState,useEffect} from "react";
import styles from "./Command.module.css"

function Command(props){

    const [cmd,setCmd]=useState(props.cmd)
    let arr =cmd.split('\n')
    const [isActive,SetIsActive] = useState(false)
    const [branch, setBranch] = useState(props.cmdBranch)

    useEffect(()=>{
        // 
        arr.push(`git checkout ${props.cmdBranch}`)
    },[arr,props.cmdBranch])

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


