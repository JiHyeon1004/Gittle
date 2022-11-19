import React,{ useEffect, useState } from "react";
import styles from "./LoginButton.module.css"
const { ipcRenderer } = window.require("electron");




// const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID

// const ACCESS_TOKEN_API_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/getAccessToken?code=`
const USER_DATA_API_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/getUserData`
const DEVICE_FLOW_START = `${process.env.REACT_APP_SERVER_BASE_URL}/getUserCode`
const DEVICE_FLOW_TOKEN = `${process.env.REACT_APP_SERVER_BASE_URL}/getDeviceAccessToken?code=`


function Login(){

    const [rerender, setRerender] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [userData, setUserData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  
    const  nonHover= <span><img className={styles.logo} src={process.env.PUBLIC_URL + '/icons/github-logo-silhouette-in-a-square.png'} alt="gittle-Logo" /></span>
    const  hovered = <span><img className={styles.logo} src={process.env.PUBLIC_URL + '/icons/github3.png'} alt="gittle-Logo" /></span>
    

    //기존방식 (web flow github oauth)

    // useEffect(() => {
    //         const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    //   const codeParam = urlParams.get("code");
      

    // if (codeParam && localStorage.getItem("accessToken") === null) {
    //   async function getAccessTokenAndData() {
    //     await fetch(`${ACCESS_TOKEN_API_URL}` + codeParam, {
    //       method: "GET",
    //     })
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((data) => {
    //         if (data.access_token) {
    //           localStorage.setItem("accessToken", data.access_token);
    //           setRerender(!rerender);
    //         }
    //       });
    //       await fetch(`${USER_DATA_API_URL}`, {
    //         method: "GET",
    //         headers: {
    //           Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //         },
    //       })
    //         .then((response) => {
    //           return response.json();
    //         })
    //         .then((data) => {
    //           //데이터를 object로
    //           setUserData(data);
    //           localStorage.setItem("userInfo", data.login);
    //         });
    //     }
    //   getAccessTokenAndData();
    //   }
    // },[])




 //device flow github oauth

  async function loginWithGithub() {

    //user_code 받기
    await fetch (`${DEVICE_FLOW_START}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("여기는 로그인 버튼의 loginWithGithub 콘솔데이터");
        console.log(data);
        console.log(data.user_code)
        localStorage.removeItem("userCode");
        localStorage.removeItem("deviceCode");
        localStorage.setItem("userCode", data.user_code);
        localStorage.setItem("deviceCode", data.device_code);
        console.log("데이터 출력 완료")
        window.open("https://github.com/login/device");
        alert(data.user_code);
        // const theDialog = ipcRenderer.sendSync("show-open-dialog", data.user_code)
        // console.log(theDialog);
        console.log('제발요한번만요');

        console.log("이건 방금 받은 데이터 : " + data.device_code);
        console.log("이건 로컬스토리지 : " + localStorage.getItem("deviceCode"));
      
      });

      //accessToken 요청
      await fetch (`${DEVICE_FLOW_TOKEN}` + localStorage.getItem("deviceCode"), {
        method: "GET",
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("여기는 로그인 버튼의 엑세스토큰정보이지롱");
        console.log(data);
        console.log(data.access_token)
        localStorage.setItem("accessToken", data.access_token);
        console.log("데이터 출력 완료료료엑세스끝")
        setRerender(!rerender);
      });

      //user data 요청
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