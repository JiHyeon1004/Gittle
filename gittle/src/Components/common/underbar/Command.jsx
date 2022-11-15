import React,{useState} from "react";
import styles from "./Command.module.css"

function Command(props){

    console.log("뿌에에에엥 : ",props.cmd[0])
    let arr = props.cmd;
    for(let i=0;i<arr.length;i++){
        console.log(i +" : "+ arr[i])
    }

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


