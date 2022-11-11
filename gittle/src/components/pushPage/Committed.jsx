import React,{useState} from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './Committed.module.css'


function Committed(){

    const repoRoot=localStorage.getItem('currentRepo');
    const {ipcRenderer} = window.require('electron') 
    const [fileList,setFileList]=useState([])

    const callFiles=()=>{
        const returnArr=ipcRenderer.sendSync('call-committed-files',repoRoot)
        console.log('컴백')
        for(let i=0;i<returnArr.length;i++){
            console.log(returnArr[i])
        }
        setFileList()
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