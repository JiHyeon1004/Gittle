import React,{useState,useEffect} from "react";
import styles from "./Push.module.css"


function Push(props){

    const repoRoot=localStorage.getItem('currentRepo');

    const {ipcRenderer} = window.require('electron')
    const [branchArr,setBranchArr] = useState([])
    const [selected,setSelected]=useState("브랜치를 선택해주세요!")
    const [actived,setActived]=useState(-1)

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
                    className={idx === actived ? styles.activeBranchBox : styles.branchBox} 
                    onClick={()=>{
                        setActived(idx)
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