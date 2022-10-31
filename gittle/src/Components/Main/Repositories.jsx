import React from "react";
import styles from "./Repositories.module.css"
import Repo from "./Repo"

function repo(){
    return(
        <div className={styles.repo}>
            최근 repo
            <Repo/>
            <Repo/>
            <Repo/>
        </div>
    )
}

export default repo;
