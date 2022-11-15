import React,{useState} from "react";
import styles from "./Command.module.css"

function Command(props){

    console.log("뿌에에에엥",props.cmd)
    let arr = props.cmd;

    return(
        <>
            <div className={styles.cmdBox}>
                {arr.map((item, idx)=>(
                    <div key={idx} className={styles.cmd}>
                        {item}
                    </div>
                ))}
            </div>
        </>
        
    )
}



export default Command


