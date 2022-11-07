import React from "react";
import styles from "./GitPush.module.css"
import Committed from "../components/pushPage/Committed"
import Push from "../components/pushPage/Push"





function PushPage(){
    
    return (
        <>
        <div className={styles.divide}>
            <div className={styles.committed}>
                <Committed/>
            </div>
            <div className={styles.push}>
                <Push/>
            </div>

        </div>
        </>
    )

}

export default PushPage;