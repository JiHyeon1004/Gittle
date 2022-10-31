import React from "react";
import styles from './Repo.module.css'

function repo(){
    return(
        <div className={styles.routes}>
            <img className={styles.folder} src={process.env.PUBLIC_URL + '/icons/folder.png'} alt="folder" />
        </div>
    )
}

export default repo;