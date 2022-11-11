import React,{useState} from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './Committed.module.css'


function Committed(){

    const repoRoot=localStorage.getItem('currentRepo');
    const {ipcRenderer} = window.require('electron') 
    const [fileList,setFileList]=useState([])

    const callFiles=()=>{
        const returnValue=ipcRenderer.sendSync('call-committed-files',repoRoot)
        console.log('컴백')
        console.log(returnValue)
        const tempArr = returnValue.split('\n')
        setFileList(tempArr)
    }

    




    useEffect(()=>{
        callFiles()
    },[])


    return(
        <div className={styles.commit}>
            {fileList.map((item,idx)=>{
                <div
                    key={idx}>
                        {item}
                </div>
            })}

        </div>
    )
}


export default Committed