import React,{useState} from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './Committed.module.css'


function Committed(){

    const repoRoot=localStorage.getItem('currentRepo');
    const {ipcRenderer} = window.require('electron') 
    const [fileList,setFileList]=useState([])

    const callFiles=()=>{
        setFileList(ipcRenderer.sendSync('call-committed-files',localStorage.getItem('currentRepo')))
    }


    

    useEffect(()=>{
        callFiles()
    },[])


    return(
        <div className={styles.commit}>
            

        </div>
    )
}


export default Committed