import React,{ useState } from "react";
import styles from "./LoginButton.module.css"

function Login(){

    const [isHover, setIsHover]=useState(false);
    const  nonHover= <span><img className={styles.logo} src={process.env.PUBLIC_URL + '/icons/github-logo-silhouette-in-a-square.png'} alt="gittle-Logo" /></span>
    const  hovered = <span><img className={styles.logo} src={process.env.PUBLIC_URL + '/icons/github3.png'} alt="gittle-Logo" /></span>
    
    return(
        <div className={styles.login}>
            <button className={styles.button} onMouseOver={()=> setIsHover(true)} onMouseOut={()=>setIsHover(false)}>
                {isHover? nonHover : hovered}
                <br/>
                github 로그인
            </button>
        </div>
    )
}


export default Login;