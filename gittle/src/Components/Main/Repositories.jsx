import React,{useState,useEffect} from "react";
import styles from "./Repositories.module.css"
import Repo from "./Repo"
import { useNavigate } from "react-router";

function Repoes(){
    const navigate=useNavigate()
    const {ipcRenderer} = window.require('electron')
    const [arr,setArr]=useState([])
    // const [count,setCount]=useState(0)

    useEffect(()=>{
        callMyRepo()
    },[])


    const callMyRepo=()=>{
        setArr(ipcRenderer.sendSync('call-my-repo'))
        console.log('돌아왔습니다')
        console.log(arr)
    }

    const repoFiles=()=>{
        
        console.log(arr)
        arr.map((item,idx)=>{
        return(
            <>
            <Repo id={idx} branch={item.branch} root={item.root} startGittle={()=>{
                navigate("/add",{state:{name:"",root:item.root}})
            }}/>
            </>
        )
    })}
    


    return(
        <div className={styles.repo}>
            최근 repo
            {repoFiles}
        </div>
    )
}

export default Repoes;
