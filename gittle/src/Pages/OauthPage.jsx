import React from "react";
import { useEffect, useState } from "react";
import styles from "./OauthPage.module.css";

const CLIENT_ID = "Iv1.922f79c332120ced";

function OauthPage() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        //데이터를 object로
        setUserData(data);
        localStorage.setItem("userInfo", data.login);
      });
  }

  return (
    <div className={styles.container}>
      {localStorage.getItem("accessToken") ? (
        <>
          <h1>We have the access token</h1>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userInfo");
              setRerender(!rerender);
            }}
          >
            Log out
          </button>
          <h3>Get user data from github api</h3>
          <button onClick={getUserData}>get User Data</button>
          {Object.keys(userData).length !== 0 ? (
            <>
              <h4>Hey there {userData.login}</h4>
              <img
                width="100px"
                height="100px"
                src={userData.avatar_url}
                alt=""
              />
              <a href={userData.html_url} style={{ color: "white" }}>
                Link to the Github profile
              </a>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <h3>User is not logged in</h3>
          <button onClick={loginWithGithub}>Login with Github</button>
        </>
      )}
    </div>
  );
}

export default OauthPage;
