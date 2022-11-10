import React,{ useEffect, useState } from "react";
import styles from "./LoginButton.module.css"


const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID

const ACCESS_TOKEN_API_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/getAccessToken?code=`
const USER_DATA_API_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/getUserData`


function Login(){

    const [rerender, setRerender] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [userData, setUserData] = useState({});
  
    const  nonHover= <span><img className={styles.logo} src={process.env.PUBLIC_URL + '/icons/github-logo-silhouette-in-a-square.png'} alt="gittle-Logo" /></span>
    const  hovered = <span><img className={styles.logo} src={process.env.PUBLIC_URL + '/icons/github3.png'} alt="gittle-Logo" /></span>
    

    useEffect(() => {
            const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");
      

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessTokenAndData() {
        await fetch(`${ACCESS_TOKEN_API_URL}` + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
            }
          });
          await fetch(`${USER_DATA_API_URL}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              //데이터를 object로
              setUserData(data);
              localStorage.setItem("userInfo", data.login);
            });
        }
      getAccessTokenAndData();
      }
    },[])





    function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }


    return(
        <div className={styles.login}>

            {localStorage.getItem("userInfo") ? (
                <>
                <button className={styles.button} onMouseOver={()=> setIsHover(true)} onMouseOut={()=>setIsHover(false)} onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userInfo");
              setRerender(!rerender);
                    }}>{
                            isHover ? nonHover : hovered}
                <br/>github 로그아웃</button>
                </>
            )
                : (
            <button className={styles.button} onMouseOver={()=> setIsHover(true)} onMouseOut={()=>setIsHover(false)} onClick={loginWithGithub}>
                {isHover? nonHover : hovered}
                <br/>
                github 로그인
            </button>
        )
        }
        </div>


    )
}


export default Login;