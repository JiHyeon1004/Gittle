# 2022-10-27

## 리액트 심화 학습

### 배열 상태 관리

- 배열 안에 있는 내용의 변경이 필요할 때
  - map으로 배열을 돌면서 새로운 객체를 만들어 useState를 사용하여 state에 저장
  - 원래 있던 객체 자체에 접근해서 내용을 변경할 수 없다.
    ⇒ **리액트는 변경 사항이 있어야 업데이트를 하기 때문!**
    ⇒ **리액트에서 사용하는 모든 state는 불변성을 유지해야 한다**

### useReducer

- 객체의 내용에 변경사항이 있는 경우, 외부 파일에서 함수처럼 만들어서 import 하여 사용
  ⇒ 재사용하기 좋다!

```jsx
function reducer(state, action) {
	switch (action.type) {
		case 'update':
			return ...
		case 'add':
			return ...
		default:
			throw ...
	}
}
```

```jsx
function Counter() {
	const [state, dispatch] = **useReducer**(reducer, initialState)
	return(
		<>
			<button onCLick={() => dispatch({type: 'update})}>
			</button>
		</>
	)
}
```

- state : 변경하고 싶은 객체
  action : 객체 변경 action
  dispatch : reducer를 소환할 때 사용
  initialState : 객체의 초기 값 설정
- 하지만 중첩 객체의 경우 점점 복잡해진다

### Immer

- 라이브러리
- 객체의 값에 접근해서 수정하는 것처럼 코드를 작성한다

## 깃허브 연동 코드 공부

```jsx
import "./App.css";
// import axios from "axios";
import { Octokit } from "octokit";
import React, { useEffect, useState } from "react";

async function getUser() {
  const octokit = new Octokit({
    auth: "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",
  });

  const username = await octokit.request("GET /user", {});
  console.log(username);
  console.log(username.data.login);
  return username.data.login;
}

async function getRepo(user) {
  const octokit = new Octokit({
    auth: "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",
  });

  const response = await octokit.request("GET /users/{username}/repos", {
    username: user,
  });
  console.log(response);
}

function App() {
  const [user, setUser] = useState([]);
  return (
    <div className="App">
      <>
        <button
          onClick={() => {
            console.log("111", getUser());
            setUser(getUser());
          }}
        >
          유저 정보 가져오기
        </button>
        <p>{user}</p>
      </>
    </div>
  );
}

export default App;
```
