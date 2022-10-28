# 2022-10-28

## 리액트-깃허브 연동

### 깃 허브 API 사용해보기

```jsx
import "./App.css";
// import axios from "axios";
import { Octokit } from "octokit";
import React, { useState } from "react";

// 회원 정보 불러오기
async function getUser() {
  const octokit = new Octokit({
    auth: "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",
  });

  const username = await octokit.request("GET /user", {});
  console.log(username);
  console.log(username.data.login);
  return username.data.login;
}

// 레토지토리 불러오기
async function getRepo(user) {
  const octokit = new Octokit({
    auth: "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",
  });

  const repos = await octokit.request("GET /users/{username}/repos", {
    username: user,
  });
  console.log(repos.data);
  return repos.data;
}

// 레포지토리 생성하기
async function createRepo() {
  const octokit = new Octokit({
    auth: "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",
  });

  const repo = await octokit.request("POST /user/repos", {
    name: "Hello-World",
    description: "This is your first repo!",
    homepage: "https://github.com/junghyun1009",
    private: true,
  });
  console.log(repo);
}

// git diff
async function gitDiff(user) {
  const octokit = new Octokit({
    auth: "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",
  });

  const diff = await octokit.request(
    "GET /repos/{owner}/{repo}/commits/{ref}",
    {
      owner: user,
      repo: "TIL",
      ref: "011a22501c35774fd81358b4ed920a9036f84186",
    }
  );

  console.log(diff);
  console.log(diff.data.html_url);
  // return diff.data.html_url;
  return diff.data.files[1].patch;
}

function App() {
  const [user, setUser] = useState([]);
  const [repo, setRepo] = useState([]);
  const [diff, setDiff] = useState("");
  return (
    <div className="App">
      <>
        <button
          onClick={async () => {
            const fetchUser = await getUser();
            setUser(fetchUser);
          }}
        >
          내 정보 가져오기
        </button>
        <p>{user}</p>

        <button
          onClick={async () => {
            const fetchRepo = await getRepo(user);
            setRepo(fetchRepo);
          }}
        >
          내 Repository
        </button>
        <ul>
          {repo.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>

        <button
          onClick={async () => {
            await createRepo();
          }}
        >
          Repository 생성
        </button>

        <button
          onClick={async () => {
            const code = await gitDiff(user);
            setDiff(code);
            // const script = document.createElement("script");
            // console.log("1111", code);
            // script.src = code;
            // script.async = true;
            // document.body.appendChild(script);
          }}
        >
          git diff
        </button>
        <p>{diff}</p>
        <webview
          src="https://github.com/junghyun1009/TIL/commit/011a22501c35774fd81358b4ed920a9036f84186"
          style={{ width: "100%", height: "480px" }}
        ></webview>
      </>
    </div>
  );
}

export default App;
```
