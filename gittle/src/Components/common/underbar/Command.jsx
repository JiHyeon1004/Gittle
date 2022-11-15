import React from "react";
import styles from "./Command.module.css"

function Command(props){

    let cmd=props.cmd

    return(
        <>
            <div className={styles.cmdBox}>
            {cmd.split('\n').map((item, idx)=>(
                <div key={idx} className={styles.cmd}>
                    {item}
                </div>
            ))}
        </div>
        </>
        
    )
}



export default Command


