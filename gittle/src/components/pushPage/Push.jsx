import React,{useState,useEffect} from "react";
import styles from "./Push.module.css"


function Push(props){

    const repoRoot=localStorage.getItem('currentRepo');

    const {ipcRenderer} = window.require('electron')
    const [branchArr,setBranchArr] = useState([])
    const [selected,setSelected]=useState("")

    const gitBranch = ()=>{
        setBranchArr(ipcRenderer.sendSync('git-Branch',repoRoot))
    }


    useEffect(()=>{
        gitBranch()
    },[])

    return(
        <>
        
        <div className={styles.push}>
            {branchArr.map((item,idx)=>(

                <div 
                    key={idx}
                    className={styles.branchBox} 
                    onClick={()=>{
                        setSelected(item)
                        props.changeBranch(item)
                    }}
                >
                    {item}
                </div>
            ))}
        </div>
        <div className={styles.selected}>
            {selected}
        </div>
        </>
    )
}


export default Push