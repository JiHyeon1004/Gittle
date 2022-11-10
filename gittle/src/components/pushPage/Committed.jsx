import React from "react";
import styles from './Committed.module.css'


function Committed(){

    const repoRoot=localStorage.getItem('currentRepo');
    const {ipcRenderer} = window.require('electron')


    return(
        <div className={styles.commit}>
            

        </div>
    )
}


export default Committed