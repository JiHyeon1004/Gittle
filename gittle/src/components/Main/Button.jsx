import React from "react";
import styles from "./Button.module.css"

function button(props){

    

    return(
        <div className={styles.button} onClick={()=>{props.callModal()}}>
            <p>Repository {props.comment}</p>
            <p>저장소 {props.comment}</p>
        </div>
    )
    
}

export default button;
