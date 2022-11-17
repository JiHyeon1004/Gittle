import React from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router";
import styles from "./Button.module.css"


function Buttons(props){
    const navigate = useNavigate()
    const root ="/"+props.page;
    let page;
    if(props.page==='merge/request'){
        page=`merge \n request`
    }else{
        page=props.page
    } 
    
    return(
        <div 
            className={props.selPage === props.page ? styles.selectedPage : styles.unSelectedPage}
            onClick={()=>{
                props.whenClick(props.page)
                navigate(root)
            }}>
            {page}
        </div>
    )


}


export default Buttons
