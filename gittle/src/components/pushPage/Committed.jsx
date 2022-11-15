import React,{useState} from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './Committed.module.css'


function Committed(props){

    const repoRoot=localStorage.getItem('currentRepo');
    const {ipcRenderer} = window.require('electron') 
    const [fileList,setFileList]=useState([])

    const callFiles=()=>{
        const returnValue=ipcRenderer.sendSync('call-committed-files',repoRoot)
        const tempArr = returnValue.split('\n')

        const resultArr=[]

        for(let i=0;i<tempArr.length;i++){
            if(tempArr[i]!==''){
                resultArr.push(tempArr[i])
            }
        }

        setFileList(resultArr)
    }

    useEffect(()=>{
        callFiles()
        props.settingCommittedData(fileList)
    },[])


    return(
        <>
        <div className={styles.commit}>
            
            {fileList.map((item,idx)=>(
                <div
                    key={idx}
                    className={styles.commitBox}>
                        {item}
                </div>
            ))}

        </div>
        </>
    )
}


export default Committed