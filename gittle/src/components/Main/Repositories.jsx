import React,{useState,useEffect} from "react";
import styles from "./Repositories.module.css"
import Repo from "./Repo"
import { useNavigate } from "react-router";

function Repoes(){
    // console.log('myRe : '+myRe)
    const navigate=useNavigate()
    const {ipcRenderer} = window.require('electron')
    const [myRe,setMyRe]=useState( [
          {
             branch: { repoName: 'first' },
             root: { repoRoot: 'test1' }
           },
           {
             branch: { repoName: 'second' },
             root: { repoRoot: 'test2' }
           },
           {
             branch: { repoName: 'third' },
             root: { repoRoot: 'test3' }
           }
        ])

    useEffect(()=>{
        const temp=callMyRepo()
        setMyRe(temp)
    },[])

   
    const callMyRepo=()=>{
        console.log('start')
        const temp=ipcRenderer.sendSync('call-my-repo')
        console.log('end')
        return temp
    }
    
    
    const repoFiles=(
        <div>
            {myRe.map((item,idx)=>(
                    <>
                    <Repo className="hi" id={idx} branch={item.branch.repoName} root={item.root.repoRoot} startGittle={()=>{
                        navigate("/add",{state:{name:item.branch.repoName,root:item.root.repoRoot}})
                    }}/>
                    </>
            ))}
        </div>
    )

    


    return(
        <div className={styles.repo}>
            최근 repo
            {repoFiles}

        </div>
    )
}

export default Repoes;
