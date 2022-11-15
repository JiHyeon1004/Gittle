import React,{useState} from "react";
import styles from "./Command.module.css"

function Command(props){

    console.log(props.cmd)

    return(
        <>
            <div className={styles.cmdBox}>
                {props.cmd.map((item, idx)=>(
                    <div key={idx} className={styles.cmd}>
                        {item}
                    </div>
                ))}
            </div>
        </>
        
    )
}



export default Command


