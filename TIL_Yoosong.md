## 221011

---

### 오픈소스는 무엇이고 왜 하는가?

- 오픈소스 프로젝트는 누구나 어떤 목적으로든 프로젝트를 보고, 사용하고, 수정하고, 배포할 수 있다.

  - 이러한 권한은 오픈소스 라이선스를 통해 적용된다.

- 프로젝트를 오픈소스로 공개하는 이유는 크게 협업, 채택과 재가공, 투명성으로 나눌 수 있다.

  - 협업: 전 세계 누구에서든 수정 받을 수 있다.
  - 채택과 재가공: 오픈 소스 프로젝트는 거의 모든 용도로 누구나 사용할 수 있으며 그 프로젝트를 기반으로 다른 프로젝트를 만들 수도 있다.
  - 투명성: 누구나 오픈소스 프로젝트에서 오류나 불일치는 검사할 수 있다.

- 대부분의 오픈소스 프로젝트는 무료이지만, 무료는 오픈소스 정의의 일부가 아니다. 오픈소스의 공식적인 정의를 준수하면서도 이중 라이선스 또는 제한된 기능을 통해 간접적으로 오픈소스 프로젝트 사용에 비용을 청구할 수 있는 방법이 있다.

### 내 오픈소스 프로젝트 시작하기

- 프로젝트를 오픈소스화하기 위해선 다음과 같은 문서가 포함되어야 한다.

  - 오픈소스 라이선스
  - README
  - 기여 가이드라인
  - 행동 강령

- 라이선스 선택하기

  - 오픈소스 프로젝트를 시작한다면 반드시 라이선스를 포함해야 한다. 오픈소스 라이선스는 사람들이 프로젝트에 영향을 주지 않고 사용, 복사, 수정 및 기여할 수 있도록 보장한다. 또한 법적 상황으로부터 보호해준다.
  - 인기있는 오픈소스 라이선스로는 MIT, Apache 2.0, GPLv3가 있다.
  - GitHub에서 새 프로젝트를 만들면 라이선스를 선택할 수 있는 옵션이 제공된다. 오픈소스 라이선스를 포함하면 GitHub 프로젝트를 오픈소스로 만들 수 있다.

- README 파일 작성하기

  - README는 프로젝트 사용 방법을 설명하는 것 이상으로 프로젝트가 중요한 이유와 사용자가 프로젝트를 이용해 할 수 있는 작업에 대해 설명한다.
  - README를 사용해 기여 방식/여부, 프로젝트의 목표, 라이선스 및 속성에 대한 정보 등에 답할 수 있다.

- 기여 가이드라인 작성하기

  - 프로젝트에 기여하는 방법을 알려준다.
    - 버그 보고서를 제출하는 방법, 새로운 기능을 제안하는 방법, 환경 설정 및 테스트 실행 방법 등
  - 기술적 세부 사항과 더불어 어떤 기여를 기대하는지 전달할 수도 있다.
    - 원하는 기여 유형, 프로젝트 로드맵 또는 비전, 기여자가 사용할 연락 방법 등
  - 기여에 대한 구체적인 제안을 제공하는 것은 기여를 늘리는 데 도움이 된다.
  - 프로젝트 초기 단계에서는 단순할 수 있으나 시간이 지나면 자주 묻는 질문을 추가할 수도 있다.

- 행동 강령 세우기

## 221012

---

### 오픈소스 프로젝트 공개하기

- 오픈소스 프로젝트를 공개하고 운영하는 것은 단순히 소스 코드만을 공개하는 것에 그치지 않고, 같은 문제로 고민하고 있는 외부 개발자들과 소통하고 더 나은 소프트웨어를 만들기 위해 노력하는 모든 활동을 의미한다.
- 오픈소스로 프로젝트를 공개하는 이유
  - 원래 사용하던 오픈소스의 새로운 버전을 시작하거나 중단된 운영을 이어가기 위해
    - 오픈소스를 사용하다 필요한 기능을 직접 추가했을 때 그 기능을 프로젝트에 반영하고 싶어하나 추가 내용이 유용하더라도 커뮤니티 비전이나 작업 우선순위에 따라 컨트리뷰션이 받아들여지지 않을 수 있다. 이런 경우 원래 **오픈소스를 포크해서 직접 새로운 기능을 추가하고 별도의 프로젝트로 운영할 수 있다.**
    - ex. 네이버 billboard.js 프로젝트: C3 프로젝트를 포크해서 운영
  - 오픈소스 라이선스 의무를 지키기 위해
  - 더 나은 소프트웨어로 성장하기 위해
  - 사회 공헌을 위해

## 221017

---

### git add

- 단순 파일 추가에 대해선 git이 관여하지 않음
- `git add <file 1>` 후
  - objects 디렉토리에 파일이 추가 됨 `<file 1>` 의 내용이 담겨있음
  - index 파일이 추가됨 내용에 `<file 1>` 이름이 담겨있음
- `git add <file 2>` 후
  - objects에 `<file 2>` 의 내용이 담긴 새로운 파일이 추가 되고
  - index에는 `<file 2>`의 이름이 기존 파일에 추가됨
- `git add <file 3>` 후 (file 3는 file 1과 내용이 같음)
  - `<file 1>` 과 `<file 3>` 가 같은 objects가리키고 있음
    - **git은** 어떤 파일을 저장할 때 **파일의 이름이 달라도 파일의 내용이 같으면 같은 objects파일을 가리킴**
      - 어마어마한 중복을 제거하는 git의 메커니즘

### objects 파일명의 원리

- 내용을 기반으로 파일 이름이 결정되는 메커니즘 = SHA1 (해쉬 알고리즘)
- git은 SHA1을 통과해 만들어진 해쉬값의 첫 두 글자로 objects 디렉토리의 하위 디렉토리를 만들고 그 안에 나머지 해쉬값을 이름으로 한 파일을 만들어 내용을 저장함

### commit

- `git commit` 후
  - commit 한 정보가 objects안에 저장됨
    - tree
      - 커밋한 각각의 파일이 무엇인지
        - 파일의 이름과 내용이 각각 링크되어 있음
    - parent
      - 해당 커밋의 이전 커밋
      - 첫 커밋의 경우 나타나지 않음
    - author
    - commiter
    - 커밋 내용
- 버전에 적혀있는 tree를 통해 그 버전이 만들어진 시점의 프로젝트 폴더에 대한 상태를 알 수 있음
- 각각의 버전은 그 버전이 만들어진 시점의 스냅샷을 트리라는 정보구조를 통해 가지고 있음
- objects 디렉토리 안에 들어가는 object 파일은 크게 3가지로 나뉨
  - blob 파일의 내용을 담고 있음
  - tree 어떤 디렉토리의 파일명과 그 파일명의 내용인 blob에 대한 정보를 담음
  - commit 각각의 커밋은 object id를 가지고 있음

### status

- index와 가장 최근 커밋의 tree를 비교하면 커밋 할 게 있는지 없는지 알 수 있음
  - 일치한다면 커밋할 것이 없음
  - 해쉬값이 다르면 수정된 파일로 인식
  - index의 특정 파일의 해쉬값이 수정한 파일의 해쉬값과 같다면 해당 파일이 commit 대기 상태임을 알 수 있음
  - index의 내용과 최신(마지막) 커밋의 tree가 가리키는 특정 파일의 내용이 다르다면(해쉬값이 다르다면) 현재 해당 파일은 index에 add되어 commit 대기 상태임을 알 수 있음
- git commit 하면 저장소와 index와 우리의 프로젝트 폴더가 정확하게 일치하면 `git status`할 경우 `nothing to commit, working directory clean` 더 이상 커밋할 것이 없음

## 221018

---

### branch

- `git init`을 하면 생성되는 HEAD에 적혀있는 `refs/heades/master` 는 첫 번째 커밋을 한 시점부터 생성됨
- `refs/heades/master`파일의 내용은 가장 최근에 커밋한 [commit]의 object id값을 가짐
- `git log` HEAD파일 - HEAD 파일의 master 파일 - master 파일의 커밋 object id값을 통해 현재 가장 최신의 commit이 무엇인지 파악 가능 이전 커밋은 parent를 통해 탐색 가능
- git의 branch는 refs/heads 밑의 파일을 의미
- `git branch` 생성 시
  - `refs/heads/<branch>` 생성
    - master branch와 같이 최신 커밋을 가리킴
- `git checkout <branch>`
  - HEAD 파일 변경 `refs/heads/<branch>`
  - git checkout 했을 때 어떠한 파일과 디렉토리를 가지고 있어야 하는가는 tree에 적혀 있음
- HEAD는 현재 checkout된 가장 최신 commit이 무엇인가를 알려주는 역할

### reset checkout

- 과거로 돌아가는 기능
- `git reset` checkout하는 브랜치가 가리키는 최신 commit을 바꾸는 행위
- reset을 취소하고 싶다면
  - `ORIG_HEAD` 확인 삭제한 파일 정보를 가지고 있음
    - 정보를 잃어버릴 가능성이 있는 위험한 명령을 하기 전 ORIG_HEAD에 현재 브랜치의 head가 가리키고 있는 commit을 기록
      - 이를 통해 명령 취소 가능 `git reset —hard ORIG_HEAD`
  - `logs/refs/heads/master` master브랜치에 있는 사건을 기록하는 log
    - `git reflog` 행위 각각의 commit이 기록되어있음
      - `HEAD@{n}`
- `git checkout <commit id>`
  - commit id를 브랜치로 가리키게 됨
  - HEAD가 직접 commit id를 가리키게 됨
    - 특정 브랜치에 속해있는 것이 아니라 특정 commit을 직접 가리키는 detached된 상태
  - 다시 돌아가려면 `git checkout master`

## 221019

---

### git gui tools

### source tree

- branch 시각적으로 잘 보여줌
- 기본 기능(pull, push 등) 버튼이 크게 있어서 직관적임
- 커밋된 파일의 변경 사항을 각각의 줄 혹은 전체로 관리해 staging area에 올릴 수 있다
- 처음에 해당 숫자의 의미를 몰라 당황함 누르면 설명이 뜨면 좋을 듯
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/05aa0946-df00-4443-95b6-73d030e1f8b7/Untitled.png)

### github desktop

- 바로 vscode로 접근 가능
- github과 비슷해 친숙한 느낌
- branch, merge 시각화가 제공되지 않는 듯

### git extensions

- commit 정보 직관적으로 확인 가능
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0119088a-7cb1-42c8-bdaf-208a58b36578/Untitled.png)
- 마우스 우클릭으로 바로 접근 가능(git bash와 같이)
- gui 사용을 위해선 메뉴에서 한 번 더 클릭해서 접근해야 함

## 221020

---

- 기능명세서 작성
  - git을 처음 사용한다는 컨셉에 맞는 ui 고민
- 와이어 프레임 제작

## 221021

---

- 기능명세서, 와이어 프레임 수정

## 221024

---

- Electron에서 react router를 사용할 땐 BrowserRouter를 사용하면 오류가 발생한다. HashRouter나 MemoryRouter를 사용해야 한다.
- HashRouter
  - URL의 hash를 활용한 라우터로 주소에 #가 붙는다. 정적인 페이지에 적합하다.
- MemoryRouter
  - 실제로 주소는 존재하지는 않는 라우터. 리액트 네이티브나, 임베디드 웹앱에서 사용하면 유용하다.

## 221025

---

- electron 개발에서 react router를 사용할 경우 HashRouter를 사용해야 함

  ```jsx
  // **src/index.js**

  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";
  import App from "./App";
  import reportWebVitals from "./reportWebVitals";
  import { **HashRouter** } from "react-router-dom";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      **<HashRouter>**
        <App />
      **</HashRouter>**
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  ```

  ```jsx
  // **src/App.js**

  import { Route, Routes, Link } from "react-router-dom";

  import First from "./Pages/First";
  import Second from "./Pages/Second";

  function App() {
    return (
      <>
        <div>
          <Link to="/first">first</Link> | <Link to="/second">second</Link>
        </div>
        <Routes>
          <Route path="/first" element={<First />} />
          <Route path="/second" element={<Second />} />
        </Routes>
      </>
    );
  }

  export default App;
  ```

  - Route에서 path를 설정 → Link의 to로 설정된 path로 옮겨감

## 221027

---

- react-transition-group 화면 전환(transition)

  - 목표: add, commit, push 완료 시 페이지가 자연스럽게 전환되어야 함

    - TransitionGroup
    - CSSTransition
      ```css
      // mount 시작할 때
      .item-enter {
        opacity: 0;
      }
      // mount 되고 나서
      .item-enter-active {
        opacity: 1;
        transition: opacity 500ms ease-in;
      }
      // unmount 시작할 때
      .item-exit {
        opacity: 1;
      }
      // unmount 되고 나서
      .item-exit-active {
        opacity: 0;
        transition: opacity 500ms ease-in;
      }
      ```
    - 특정 페이지에만 transition 줄 경우

      - Transition
        - 기본적으로 Transition components는 렌더링하는 components의 동작을 변경하지 않으며 components의 “enter”과 “exit” 상태만을 추적한다.
        - component가 들어오거나 나갈 때 component에 스타일을 추가할 수 있다.

      ```jsx
      import { Transition } from "react-transition-group";
      import "./First.css";

      function First() {
        return (
          <Transition **in**={true} timeout={200} **appear**>
            {(status) => (
              <div className={`pageSlider pageSlider-${status}`}>
                <p>First</p>
                <div className="box">hi</div>
              </div>
            )}
          </Transition>
        );
      }

      export default First;
      ```

      - `in`: components를 표시 시작 또는 종료 상태를 트리거함
        - type: `boolean` (default: `false`)
      - `appear`: 처음 mount할 때는 `in`의 값에 상관없이 transition을 수행하지 않음 이를 원한다면 `in`과 `appear`를 동시에 설정해야 함
        - type: `boolean` (default: `false`)

      ```css
      .box {
        width: 50%;
        background-color: plum;
      }

      .pageSlider-**entering** {
        opacity: 0;
        /* transform: scale(1.1); */
        transform: translate3d(100%, 0, 0);
        background: pink;
        animation-name: slidein 4s 1s;
      }

      .pageSlider-**entered** {
        opacity: 1;
        /* transform: scale(1);
          transition: opacity 300ms, transform 300ms; */
        transform: translate3d(0, 0, 0);
        transition: all 500ms;
        /* background: black; */
        animation-name: slidein 4s 1s;
      }

      .pageSlider-**exiting** {
        opacity: 1;
        /* transform: scale(1); */
        transform: translate3d(0, 0, 0);
        background: blue;
      }

      .pageSlider-**exited** {
        opacity: 0;
        /* transform: scale(0.9);
          transition: opacity 300ms, transform 300ms;
          transform: translate3d(-100%, 0,0); */
        transition: all 700ms;
        background: purple;
      }
      ```

      - `entering`
      - `entered`
      - `exiting`
      - `exited`
