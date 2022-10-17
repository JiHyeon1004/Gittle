**버전관리의 본질**

- `**git init**`
  - 현재 디렉토리에 대해 버전관리를 하겠다!
- `**git add [파일명]**`
  - 이 파일에 대해 버전관리(추적) 시작!
  - 파일 수정 후 버전으로 남길 때도 해줘야 한다.
  ⇒ 커밋 대기 상태 (stage area)가 된다.
- `**git log -p**`
  - 커밋과 커밋 사이의 차이점을 확인할 수 있다.
- `**git log [커밋아이디]**`
  - 해당 커밋부터 과거의 log를 확인할 수 있다.
- **`git diff [커밋 a 아이디]..[커밋 b 아이디]`**
  - 커밋 a와 커밋 b의 차이점을 확인할 수 있다.
- **`git diff`**
  - git add 전에 어떤 부분을 변경했는지 확인할 수 있다.
  - 커밋 전 마지막 리뷰!
- **`git reset --hard [커밋아이디]`**
  - 해당 커밋 아이디의 커밋으로 되돌아간다.
  - 협업 시, 내 코드를 공유한 이후에는 reset 하면 안된다! (로컬에서만 할 것)
  - `--hard` 는 조콤 위험하다.
  - `**git reset —hard HEAD`\*\* : 가장 최신 버전의 커밋으로 되돌린다.
- **`git revert`**
  - 커밋을 취소하면서 새로운 버전을 생성한다.
- 가장 많은 빈도 수로 검색/사용하는 깃 명령어
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b26e49fd-2154-4ea8-adaf-0cdc088f4d5e/Untitled.png)
  (+reset)
- **`git commit -a`**
  - git add와 commit을 같이 해준다.
- **`git commit -am “커밋메세지”`**
  - git add와 commit을 에디터를 띄우지 않고 바로 해준다.

**Git의 원리 (add/commit)**

- `git add` 를 했을 때, 파일명이 달라도 파일의 내용이 같으면 .git 디렉토리 내부에서 같은 객체를 가리키게 되고, 같은 디렉토리에 들어가게 된다.
  - 파일의 내용 및 부가내용을 hash 함수를 사용하여 변환
  - 그 값이 디렉토리와 객체를 결정하게 된다.
- `git commit`
  - parent : 이전 커밋이 무엇인가
    tree : 커밋이 발생한 시점의 파일과 파일 내용 정보
  - object 폴더 종류
    - blob : 파일의 내용
    - tree : 디렉토리 및 파일의 내용
    - commit

**Git의 혁신-branch**

- `**git branches --decorate --graph**`
  - 브랜치가 그래프로 도식화된 모습을 확인할 수 있다.
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e29dc1b3-f989-42a2-89f4-8d838b4dc8a6/Untitled.png)
- **`git branches --decoreate --oneline`**
  - 브랜치가 그래프로 도식화된 모습을 한 줄로 확인할 수 있다.
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f43d08c-09ae-4917-b070-1c39e908cd39/Untitled.png)
- **`git log a..b`**
  - 브랜치 a에는 없고 b에는 있는 log를 보여준다.
- **fast forward**
  - 만약 hotfix 브랜치를 master 브랜치에 merge한 경우, hotfix의 최종 commit이 master의 최종 commit보다 최신이고, 병합함에 따라 master가 빨리감기되었다는 의미
- **recursive**
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ae4ba0b-32a3-42cf-916b-72a1c578770a/Untitled.png)
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3749d0e-2bf7-46b5-946b-f2cd9f862016/Untitled.png)
  iss53이 분기되어 나온 master가 현재의 master과 달라진 경우 (커밋이 진행된 경우)
  → C4와 C5의 공통 조상을 찾는다. (C2)
  → C4와 C5를 합친 후 새로운 커밋을 추가한다. (C6) ⇒ merge commit
- `**git stash**`
  - 파일의 수정이 완료되지 않아 커밋을 할 수 없는 상황에서 브랜치를 이동해야 할 때
  - 현재의 작업 상황을 숨길 수 있다.
  - `**git stash apply**` : 작업 상황을 다시 복구한다.
  - `**git stash list**` : stash 목록을 확인할 수 있다.
  - `**git stash drop**` : 가장 최신 stash를 삭제한다.
  - `git stash apply; git stash drop;` === `**git stash pop**`
  - git add가 되지 않은 내용에 대해서는 stash를 진행할 수 없다.

**Git의 원리 (branch)**

- `git init` 을 하면 HEAD라는 디렉토리가 생긴다.
  - HEAD는 refs/heads/master를 가리킨다.
  - master 안에는 가장 최신 커밋의 아이디가 저장되어있다.
  - 그 이전 커밋은 parent를 통해 접근할 수 있다.
- branch를 새로 만들면 refs/heads/[새로운 branch 이름] 의 폴더가 생긴다.
- HEAD : 현재 사용하고 있는 branch를 나타낸다.
- `**git reset --hard ORIG_HEAD`\*\* : reset 취소
  - 위험한 명령을 수행했을 때 ORIG_HEAD 폴더를 만든다.
  - 그 안에는 이전 커밋에 대한 정보가 들어있어 되돌아갈 수 있다.
- **working copy - index - repository**
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b5a27b32-a6ab-42b3-a7b9-ae2ed600f403/Untitled.png)
  - 보통 `git reset --hard` 를 가장 많이 쓴다.
- **kdiff3** → 컨플릭트 해결하기 위한 도구! (참고하면 좋을듯)
- **Merge**
  - 2 way merge : base를 보지 않고 두개의 브랜치끼리 비교하여 병합
  - 3 way merge : base를 참고하여 두개의 브랜치를 병합
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37fcc196-bc2f-477d-8b19-5ef74a375667/Untitled.png)
