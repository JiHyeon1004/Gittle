import React from "react";
import {Link} from "react-router-dom"
import styles from "./Button.module.css"


function Buttons(props){

    const root ="/"+props.page;
    
    return(
        <div 
            className={props.selPage === props.page ? styles.selectedPage : styles.unSelectedPage}
            onClick={()=>{props.whenClick(props.page)}}>
            <Link to={root} className={styles.text}>{props.page}</Link>
        </div>
    )


}


export default Buttons
