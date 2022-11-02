import React from "react";
import styles from "./Repositories.module.css"
import Repo from "./Repo"
import RepoFile from "./folder.json"
import { useNavigate } from "react-router";

function Repoes(){
    const navigate=useNavigate()
    
    const repoFiles=RepoFile.map((item,idx)=>{
        return(
            <>
            <Repo id={idx} branch={item.branch} root={item.root} startGittle={()=>{
                navigate("/add",{state:{name:"",root:item.root}})
            }}/>
            </>
        )
    })
    

    return(
        <div className={styles.repo}>
            최근 repo
            {repoFiles}
        </div>
    )
}

export default Repoes;
