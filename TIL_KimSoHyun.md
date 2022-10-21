## 2022-10-11

## 오픈 소스 기여하는 방법에 대하여

- [기존 프로젝트 활용](https://www.notion.so/4fa695823c344885b149499458264e48)
- [새로운 프로젝트 시작](https://tech.osci.kr/2021/03/16/오픈소스에-기여하는-방법에-대하여-2-새로운-프로젝/)

### 1. 기존 프로젝트 활용하기

- 내가 사용 중인 오픈 소스에 대한 관심과 그것이 가진 기능 활용해 보기
- 어떤 시스템 또는 소프트웨어를 개발하려는 경우 개발하고자 하는 기능에 대한 충분한 분석 뒤, 이미 존재하는 오픈 소스 프로젝트라면 내가 원하는 요구 사항을 만족하는 것이 있는지 확인

1. **오픈 소스 프로젝트 검색 방법**

   1. 구글링
   2. 오픈 소스 저장소 내 검색

   - 예) GitHub, SourceForge, Bitbucket, Google Code 등

   1. 오픈 소스 재단 내 검색

   - 예) 아파치 재단, 리눅스 재단, 모질라 대단

   1. 그 외

   - https://www.findbestopensource.com/home
   - https://www.openhub.net/

2. **오픈 소스 프로젝트 참여**

   - 커뮤니티 활동 통한 의견 교류, 프로젝트 문서 수정 또는 번역, 한글 번역
   - 기능 등록 및 수정 요청, 패치 요청, 커미터 또는 컨트리뷰터 활동, 버그 리포트
     - 커미터(committer): 프로젝트 내 직접 코드 push 권한
     - 컨트리뷰터(contributter): 패치 등 소스 코드 제공

### 2. 새로운 프로젝트 시작하기

- 위험 요인 분석 필요
  - 새 프로젝트가 기존 프로젝트에 비해 경쟁력을 가지는지
  - 개발과 추후 관리 위한 충분한 자원자를 확보할 수 있는지
  - 개발에 필요한 장비가 확보 가능한지

1. **프로토타입 구현**

   - 고품질의 프로토타입을 완성하는 일의 중요성
   - 최초의 요구 사항이 일부 수정되고 그 결과가 설계의 변경을 필요로 함
   - 구성원 사이 의사소통과 문서화 필요
   - 오픈 소스 개발의 가장 중요한 특징인 분산 개발을 효과적으로 수행하고, 소스 코드의 재사용 가능서을 높이기 위하여 모듈화, 계층화된 소프트웨어 설계를 하는 것이 중요

   **a-1. 내부 시험의 필요성**

   - 프로토타입 배포 이전 내부 시험 필요
   - 주로 모듈 단위로 설계, 구현되는 소프트웨어 구조 때문에 오픈 소스 프로젝트에서는 기존의 라이브러리 적극적으로 활용
   - 배포 전 호환성, 가이드, 편의성 문제 해결에 많은 노력 필요
   - 다양한 빌드 도구 활용해 다른 개발자들이 손쉽게 SW를 개발하고 테스팅할 수 있는 환경 조성 필요

2. **결과물 배포**

   - BitBucket, GitHub 등의 오픈소스 프로젝트 사이트 이용
   - OSI(Open Source Initiative)의 오픈 소스 정의가 오픈 소스에 대한 명확한 가이드라인으로 사용

3. **개발자 간 의사소통**

   - 커뮤니티 참여자의 성격(개발자, 관리자, 사용자 등)에 따른 메일링 리스트
   - 포럼과 그들의 아카이브
   - 버그 리포트: 사용자와 개발자의 공식적인 통신 방법
     - 별도의 홈페이지 이용한다면 Bugzilla, Trac, Redmine, 아틀라시아의 JIRA를 버그 트래킹 시스템으로 활용
     - 버그 트래킹 시스템은 버그 등록, 담당자, 처리 상태, 의견 교환 등 버그 발생부터 해결까지 전 과정에 대한 관리 방법 제공
   - 프로젝트 관련 문서, FAQ
   - 소스 코드의 경우 배포 버전, 베타 버전(외부용 시험 버전), 소스 코드 스냅샷(현재 개발 진행 중) 3가지 모두 공개
   - 소스 코드의 공개는 오픈소스 소프트웨어의 가장 큰 미덕으로 누구나 쉽게 다운로드, 리뷰, 빌드 후 패치하여 프로젝트 관리자에게 보낼 수 있어야 함

4. **커뮤니티 기반 개발**

----

## 2022-10-12

## GITHUB 기반 온라인 코드 리뷰 방법

![Untitled](C:\Users\kiwio\AppData\Roaming\Typora\typora-user-images\image-20221012225930965.png)

1. 브랜치 생성 요청

2. fork

3. clone -b A 브랜치 —single-branch 주소

4. checkout -b 작업용 브랜치

5. local의 작업용 브랜치에서 add/commit

6. push로 remote branch에서 반영

7. pull request로 작업용 브랜치에서 A 브랜치로 코드 리뷰 요청

   피드백받으면 해당 브랜치에서 다시 작업

8. 리뷰 후 merge

9. checkout A 브랜치

10. remote add upstream 주소 (원격 저장소 추가)

    git remote -v로 원격 브랜치 확인

    - 원격 브랜치와 로컬 브랜치 확실히 구분

11. fetch upstream A 브랜치 → remote 브랜치에서 local 브랜치로 가져옴

12. rebase upstream A 브랜치 → remote 브랜치 코드 가져옴 (동기화)

13. checkout -b 작업용 브랜치 2

---

## 2022-10-13

## 오늘 한 일

1. **계획서 작성**

   - 계획서를 작성하다 보니 프로젝트의 목표, 방향성이 보다 구체적으로 바뀌었다

   - 계획서를 너무 빠르게 기재한다고 생각해서 불만이 좀 있었는데, 어떤 아이디어를 구상화하고 싶다면 문서로 먼저 특징이나 기능에 대해 정리하는 것도 괜찮은 방법 같다

   - 추가적으로 기능 명세서를 확실히 정리할 필요성을 느꼈다

   - 와이어프레임은 Figma를 보고 참고해 왔는데, 아직 구체적인 디자인이 떠오르지 않는다 조금 더 고민이 필요할 듯싶다

   - GIT 시각화를 주제로 삼은 만큼 팀원들 모두가 GIT의 사용법에 대해 완벽하게 숙지하고 있어야 할 것 같은데, 이 부분에 대해 내일 같이 이야기해 봐야 할 것 같다

     -> 서비스 개발자도 해당 서비스에 대해 잘 알지 못한다면 사용자는 더욱 더 혼란스러울 것이기 때문이다

   - 서비스 대상자를 아예 초보 개발자로 설정하는 것은 좋은 아이디어라고 본다

2. **교보재 신청서 작성**

   - 세상에는 정말 많은 강의와 교재가 있다
   - 그중에 어떤 것이 더 우리에게 잘 맞고, 이해가 잘되고, 뛰어난 것인지 선별하는 것은 상당히 힘든 일이다
   - 그래서 계획서 작성보다 교보재 신청이 더 오래 걸렸다
   - 사실 교보재 신청을 1회로 제한하는 이유를 잘 모르겠다
   - 보통 예산을 미리 정해 주고, 예산 내에서 명확한 사유가 있다면 활용은 자유롭게 하는 것으로 알고 있는데 말이다
   - 처음부터 예산 한도와 제약 사항을 명확히 밝혀 주었다면 더 좋았을 것 같다
   - 교보재 신청이 받아들여져서 프로젝트에 잘 활용되기를 바란다

----

## 2022-10-14

## 컨설턴트님 피드백

- 처음에는 주니어 대상 → 시간적으로 한정적: 나중에는 나아간 버전도
  - 아예 주니어만을 대상이라고 한정 짓기 x, 점점 나아갈 것
- 아이디어를 넘어서 코드 관련하여 품질도 신경 써야 할 것
- 오픈소스: 각종 라이브러리 패킹 해 놓은 것들 생각, 개발자들이 쓸 수 있는 도구
- 이용하는 오픈소스에 컨트리뷰트를 도전하는 것도 나쁘지 않다
- 기획이 쉽지 않겠다, **완성도**가 높아야 한다, 볼륨을 확인해야 한다
- 오픈소스를 살펴볼 사람을 정해야 한다 → 오픈소스에서 사용하는 용어 통일할 필요
  - 이게 우리 서비스에 어디까지 이용 가능한지 살펴봐야 한다
- 깃 중에서 어떤 게 기준인지? 깃헙이라고 답변
  - 관련 api나 점검 필요
- 정/부는 꼭 정해 둬야 한다 → 협업에서 오는 이로움이 있기 때문
- 서버가 꼭 2가지일 필요가 있을까?
  - 프론트 서버를 CDN
- electron → native틱하게 웹에서 돌아갈 수 있게 제공 (속도가 빠름)
- 타깃 자체를 과제로 만들어서 하나씩 역할을 정해 뒀으면 좋겠다
  - 예) 깃허브 체크할 사람, 마인드맵 체크할 사람

## 멘토님 피드백

### 단체 미팅

- 주제가 겹친다면 우리 팀만의 차별화가 필요할 것
- 누가 쓸 것인가, 어떻게 쓸 것인가에 대해 생각 → 입사 인터뷰 할 때 할 말이 많아짐
- 컨트리뷰터 포기
- Chaos monkey 참고
- 기능 구현 & 가이드는 오픈소스의 양대 산맥 → 둘 다 힘줘야 됨
  - 어떤 이유 때문에 만들었는지 설득력 있게 전달할 수 있어야 한다
- 개발자 문서 작성해 보기 → 이것 자체를 하면서 많이 정리됨
- 평가는 반별로 (확정 X)
- 서버 운영 ⇒ 가용 리소스가 두 배로 늘어난다, 할 만한 퍼포먼스가 훨씬 늘어난다
  - 프로세스적인 최적화까지 이루어진다면 +a로 효용 가치가 커진다
  - 각 영역별로 전문성을 띄기 위해 나온 MSA가 있다
- 대용량 프로젝트라면 언젠가는 MSA를 사용할 수밖에 없다 (굿)
  - 그 과정에서 얻게 되는 부산물이 많다
- EC2 두 개라고 가정 (16GB)
  - 프론트는 이중 4GB도 쓰지 못한다 / 8GB가 남는다
  - MSA를 적용하여 백으로 이동하면 이쪽만 타고 있다
  - 구성을 하려면 EC2 중 일부는 웹으로 구현, 일부는 백엔드 서버로 쓰게 될 확률이 높다
  - MSA의 목적: 포인트를 명확히 해서 어떤 요소만 빠르고 작게 배포
    - 관리 포인트가 힘들다 → 고민 필요
    - 구글링 통해 매칭
- 처음 해 보는 언어를 사용할 때? 프로그램 이용할 때? (예: 일렉트론)
  - 아무 생각 않고 각 잡고 앉아서 공식 홈페이지에 있는 설명 읽고 코드 다 짜 보기
  - 6기에서도 4주 만에 진행해서 2등까지 한 사례 있음

------

### 개인 팀 미팅

- **MSA**

  - MSA 배경: Service Oriented Arcitecture의 부산물
  - MSA의 기본

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3fafad07-aff9-4ef6-9655-f5fafead4de4/Untitled.png)

  - EC2의 제약 때문에 실제로 구현하기는 힘듦, 해 봐야 DB 두 개 정도

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb614989-307a-4963-a064-9a54ba100cdb/Untitled.png)

  - BFF: Back For Front
  - 설계: 서버가 바라보는 DB
  - 각각 바라보는 DB가있어야 한다

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2417026a-ea0b-4109-b570-3db5f1f099f7/Untitled.png)

  - 스프링 부트의 비즈니스 로직과 몹시 유사하다

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e0d2a693-9b24-4328-be4a-2ca2e1e02c36/Untitled.png)

  - 복잡하고 제약 사항이 많다

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/19d71a08-8df8-4fd8-82a7-139034cc43c9/Untitled.png)

  - 복잡성의 문제와 항상 직면하게 될 것
  - 인공신경망의 모습과 유사하다

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24330b88-1819-433a-9fc1-3bd018a61fe5/Untitled.png)

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7447fea9-8b27-4ae0-91be-efc33e1fd8c4/Untitled.png)

  - MSA 프로젝트에는 Kafka가 필수적으로 사용됨
  - 직면하는 두 번째 이슈: EC2 서버의 가용 메모리 부족
  - 어떻게 연결되고 기능적으로 가능한지 뽑아서 진행
  - 애자일, TDD, DDD, 서킷 브레이커

- Automation 필요

- JPA, History 조회, 마우스 우클릭 시 메뉴가 등장하고 CLI

  - 명령어를 미리 만들어 놓고 사용자는 프로세스를 쉽게 이용할 수 있도록 → 스텝을 줄이는 방향, 부분 자동화, 버튼 클릭으로 해결
  - 소스트리 api 가져다 쓰기 ^^

- 데스크톱 앱: 코틀린 네이티브, 리액트 네이티브, 플러터(어려움), 일렉트론(가장 쉽다)

- 아키텍처 구현: 6주 안에 가능? / 5주 만에 한 팀은 있다~ ㅎㅎ

- 지금 해 보기~

- GIT 시각화 → 정말 핵심적인 기능이 하나 있어야 함

  - 이 주제만으로 힘이 좀 약함

  1. 누가 봐도 예쁘게  2. 기능적으로 정말 편리하게  3. 어떤 새롭고 특별한 기능을

- 오픈소스 프로그램들 정리해서 장점 취합, 섞어 보기

- 버튼으로도 기능 구현이 가능하지만 CLI도 함께 보여 줘서 교육 용도로 기능을 특화하고 싶다

  - 개발자들을 위한 오픈 소스
  - 우리 서비스가 정상적으로 돌고 있다는 것을 보여 주기 위해 CLI나 동작 로그를 제시하는 게 좋다

## 해야 할 일

1. 콘셉트를 주니어 대상으로 확실히 → 주니어들이 어떻게 쉽게 접근할 수 있을지
2. 웹 vs 프로그램 → 함께 고민
3. GIT에 대해 잘 알아야 한다
   1. 여유가 있을 때 GIT 책 읽어 보시고, 강의 보시면서 GIT 완벽히 이해
   2. 어떤 기능이 필요할지, 어떤 기술이 필요할지
4. 깃 관련 오픈소스가 많다
   1. 깃 관련 오픈소스들 종류
      1. 깃헙 데스크탑, 소스트리 → 6명 모두
      2. 깃크라켄 → 김소현
      3. 스마트깃 → 이선호, 정지현
      4. 깃콜라 →  김정현
      5. 깃포스 → 정유송
      6. Gitg → 허상
   2. 어떤 기능 참고할 수 있고, 어떤 코드 가져올 수 있는지
   3. 장단점 이거는 가져오고, 이거는 우리가 고치자
5. 틈틈이 Figma에 틀 만들어 놓기
6. Figma UI/UX 참고할 것 있으면 링크랑 캡처
7. GIT BASH → GIT 자체
   - 버튼에 action을 줘서 키워드와 명령어를 자동으로 GIT BASH에 넣어서 로딩해 주는 형태로 생각
   - GIT BASH에 타이핑을 해 줘서 하는?
8. 서버 여러 개 굴리는 일에 대해서도 조사
   1. 서버 쪽 공부 → MSA
9. 머지 & 푸시 → 드래그 앤 드롭 (좋은 의견)
10. 오류가 발생할 경우 버튼을 통해 해결 방안 몇 가지 제시
    1. 제안한 버튼을 클릭 시 입력이 되어서 진행되도록

# GIT 공부

## 깃의 쓰임새

### 1. 버전 관리

- 문서 수정 시 언제 수정했는지, 어떤 것을 변경했는지 편하고 구체적으로 기록하기 위한 버전 관리 시스템

### 2. 백업하기

- 현재 컴퓨터에 있는 자료를 다른 컴퓨터에 복제
- 깃의 원격 저장소, 온라인 저장소 → 깃허브

### 3. 협업하기

- 여러 사람이 함께 일할 수 있다
- 누가 어느 부분을 어떻게 수정했는지 기록이 남아서 나중에 오류가 생겼을 시 파악하기 쉽다

## 깃 프로그램 종류

- 깃을 편리하게 사용할 수 있도록 하는 프로그램 (=깃 클라이언트 프로그램)

### 깃 데스크탑

- 복잡한 깃 사용법을 GUI로 구현
- 장점: 사용이 쉬워서 누구나 배울 수 있음
- 단점: 기본적인 기능 위주여서 고급 사용자에게는 아쉬움

### 토터스깃

- 윈도우 전용 프로그램

### 소스트리

- 깃 기본 기능부터 고급 기능까지 사용 가능
- 기능이 많아 사용법 복잡하지만 익숙해지면 자유롭게 활용 가능

## 커맨드 라인 인터페이스 (CLI)

- 터미널 안에 직접 명령 이용해 사용하는 방식
- 기본적인 리눅스 명령+깃 명령 알아야 해서 더 어렵다

---

## 2022-10-17

# 객체 지향 공부

[1장](https://www.notion.so/01e0a7570fe94bd0af37a8f874c80abe)

[2장](https://www.notion.so/01e0a7570fe94bd0af37a8f874c80abe)

[3장](https://www.notion.so/01e0a7570fe94bd0af37a8f874c80abe)

[4장](https://www.notion.so/01e0a7570fe94bd0af37a8f874c80abe)

[5장](https://www.notion.so/01e0a7570fe94bd0af37a8f874c80abe)

[6장](https://www.notion.so/01e0a7570fe94bd0af37a8f874c80abe)

7장

# 1장

### 객체 지향의 본질

- **객체지향**: 시스템을 상호작용하는 **자율적인 객체들읙 공동체**로 바라보고, 객체를 이용해 시스템 분할
- **자율적인 객체**: **상태**와 **행위**를 함께 지니며 스스로 자기 자신을 책임짐
- **협력**: 객체는 시스템 행위를 구현하기 위해 다른 객체와 **협력**
- **역할**: 각 객체는 협력 내 정해진 역할 수행, 관련된 **책임**의 집합
- **메시지**: 다른 객체와 협력하기 위해 전송
- **메서드**: **메시지** 수신한 객체가 메시지 처리하는 데 적합한 **메서드** 자율적으로 선택

### 객체를 지향하라

<aside> 💡 메시지를 주고받는 객체의 관점으로 사고의 중심을 전환

</aside>

- 클래스는 객체들의 협력 관계를 코드를 옮기는 도구에 불과하다
- 중요한 것은 클래스들의 정적인 관계가 아니라 `메세지를 주고받는 객체들의 동적인 관계`

------

# 2장

## 상태

- **객체**: 식별 가능한 객체 또는 사물

- 객체는 구별 가능한 `식별자`, 특징적인 `행동`, 변경 가능한 `상태`를 가진다

- 프로퍼티:

   객체의 상태를 구성하는 모든 특징

  - 변경되지 않고 고정되기 때문에 `정적`
  - `속성` + `링크`

- **프로퍼티 값**: 시간이 흐름이 따라 변경 → `동적`

- 링크

  : 객체와 객체 사이 의미 있는 연결

  - 링크를 통해서만 메시지 주고받기 가능
  - 객체가 다른 객체를 `참조`할 수 있음
  - 한 객체가 다른 객체의 식별자를 알고 있음

- **속성**: 객체를 구성하는 `단순한 값`

- 상태: 특정 시점에 객체가 가지고 있는 정보의 집합 → 객체의 구조적 특징 표현

  - 정적인 프로퍼티 + 동적인 프로퍼티 값

## 행동

- 행동은 다른 객체로 하여금 간접적으로 객체 상태를 변경하는 것을 가능하게 한다

- **부수 효과(side effect): 객체의 행동에 의해 객체의 상태가 변경됨**

- 객체의 행동은 객채의 상태를 변경시키지만, 행동의 결과는 객체의 상태의 의존적

  - 객체의 행동은 상태에 영향을 받는다
  - 객채의 행동은 상태를 변경시킨다

  1. 상호작용이 현재의 상태에 어떤 방식으로 의존하는가
  2. 상호작용이 어떻게 현재의 상태를 변경시키는가

- 객체가 다른 객체와 협력하는 유일한 방법 → `요청`을 보내는 것, `메시지`를 통해서만 의사소통

<aside> 💡 객체의 행동으로 발생하는 결과

1. 객체 자신의 상태 변경
2. 행동 내에서 협력하는 다른 객체에 대한 메시지 전송

</aside>

- 행동

  : 외부의 요청 또는 수신된 메시지에 응답하기 위해 동작하고 반응하는 활동

  - 행동의 결과로 객체는 자신의 상태를 변경하거나 다른 객체에게 메시지를 전달할 수 있음
  - 객체는 행동을 통해 다른 객체와의 협력에 참여하므로 행동은 외부에 가시적이어야 함

## 캡슐화

- 캡슐화

  : 객체는 상태를 캡슐 안에 감춰둔 채 외부로 노출하지 않는다

  - 객체가 외부에 노출하는 것 = 외부에서 객체에 접근할 수 있는 유일한 방법 = 행동
  - 객체의 `자율성`을 높임 → 스스로 판단하고 결정 → 협력이 유연하고 간결해짐

## 식별자

- 객체? 인간의 인지 능력을 이용해 식별 가능한 경계를 가진 모든 사물

- 객체가 식별 가능하다? 객체를 서로 구별할 수 있는 특정 프로퍼티가 객체 안에 존재

- ```
  식별자
  ```

  (=프로퍼티): 객체를 

  구별

  하게 만드는 것

  - 값은 식별자를 가지지 않는다

- 값(value):

   숫자, 문자열, 날짜, 시간, 금액 등 불변 상태의 양을 모델링

  - **동등성(equality): 값이 같은지 여부는 상태가 같은지를 이용해 판별**
  - 상태가 같으면 두 인스턴스가 동일하다

- 객체: 시간에 따라, 행동을 통해 변경되는 상태 포함 → 

  ```
  가변 상태
  ```

  - 타입이 같은 두 객체의 상태가 완전히 똑같더라도 독립적인 별개의 개체로 다뤄야 함
  - **동일성(identical): 식별자를 기반으로 객체가 같은지를 판단**
  - 두 객체의 상태가 다르더라도 식별자가 같으면 두 객체는 같은 객체

<aside> 💡 **식별자: 어떤 객체를 다른 객체와 구분하는 데 사용하는 객체의 프로퍼티**

값: 식별자 X, `상태` 이용한 동등성 검사로 두 인스턴스 비교

객체: 상태가 변경될 수 있어 `식별자`를 이용한 동일성 검사로 두 인스턴스 비교

</aside>

- 참조 객체(reference object) = 엔티티(entity): 식별자를 지닌 객체
- 값 객체(value object): 식별자를 가지지 않는 값

```
1. 객체는 상태를 가지며 상태는 변경 가능하다.
2. 객체의 상태를 변경시키는 것은 객체의 행동이다.
	- 행동의 결과는 상태에 의존적이며 상태를 이용해 서술할 수 있다.
	- 행동의 순서가 실행 결과에 영향을 미친다.
3. 객체는 어떤 상태에 있더라도 유일하게 식별 가능하다.
```

## 기계로서의 객체

- **쿼리(query)**: 객체의 상태 조회
- **명령(command):** 객체의 상태 변경

## 행동이 상태를 결정

- 객체가 적합한지를 결정하는 것은 그 객체의 상태가 아니라 `행동`
- 객체 지향 설계
  1. 애플리케이션에 필요한 협력 생각
  2. 협력에 참여하는 데 필요한 행동 생각
  3. 행동을 수행할 객체를 선택
- 협력 안에서의 객체의 행동 → 객체가 협력에 참여하면서 완수해야 하는 책임
  - 어떤 책임이 필요한가를 결정하는 과정이 전체 설계 주도

------

# 3장

- 추상화

  : 어떤 양상, 세부 사항, 구조를 좀 더 명확하게 이해하기 위해 특정 절차나 물체를 의도적으로 생략하거나 감춤으로써 복잡도를 극복하는 방법

  1. 구체적인 사물들 간 공통점을 취하고 차이점을 버리는 일반화를 통해 단순하게 만듦
  2. 중요한 부분을 강조하기 위해 불필요한 세부 사항을 제거함으로써 단순하게 만듦

- 객체지향 패러다임: 객체라는 추상화를 통해 현실의 복잡성 극복

## 개념

- 개념(concept)

  : 공통점을 기반으로 객체들을 묶기 위한 그릇

  - 일반적으로 우리가 인식하고 있는 다양한 사물이나 객체에 적용할 수 있는 아이디어나 관념

- **분류(classification)**: 개념을 이용해 객체를 여러 그룹으로 나누는 것

<aside> 💡 객체: 특정한 개념을 적용할 수 있는 구체적인 사물

인스턴스: 개념이 객체에 적용됐을 때 `객체를 개념의 인스턴스`라고 함

</aside>

## 타입

- 타입(type):

   공통점을 기반으로 객체들을 묶기 위한 틀 (=개념)

  1. 데이터가 어떻게 사용되느냐
  2. 타입에 속한 데이터를 메모리에 어떻게 표현하는지

- 데이터 타입: 메모리 안에 저장된 데이터 종류를 분류하는 데 사용하는 메모리 집합에 관한 메타 데이터

  - 데이터에 대한 분류는 어떤 종류의 연산이 해당 데이터에 대해 수행될 수 있는지를 결정

## 객체와 타입

1. 어떤 객체가 어떤 타입에 속하는지를 결정하는 것은 객체가 수행하는 

   ```
   행동
   ```

   1. 어떤 객체들이 동일한 행동을 수행할 수 있다면 그 객체들은 동일 타입으로 분류

   2. 동일한 타입에 속한 객체는 내부의 데이터 표현 방식이 다르더라도 동일한 메시지를 수신하고 이를 처리할 수 있음

   3. 내부 표현 방식이 다르기 때문에 동일 메시지를 

      처리하는 방식은 다름

      - 다형성

        : 동일한 요청에 대해 서로 다른 방식으로 응답할 수 있는 능력

        - 다형적인 객체는 동일 메시지를 수신해야 하므로 동일 타입에 속하게 된다

2. 객체의 내부적인 표현은 외부로부터 철저하게 감춰진다

   1. 객체의 행동을 가장 효과적으로 수행할 수 있다면 객체 내부의 상태를 어떤 방식으로 표현하더라도 무방
   2. 외부에 행동만을 제공하고 데이터는 행동 뒤로 감춘다 → `캡슐화`

## 일반화/특수화

- 객체지향에서 일반화/특수화 관계를 결정하는 것은 `행동`(상태, 데이터 X)

## 슈퍼타입/서브타입

- **슈퍼타입(Supertype)**: 좀 더 일반적인 타입
- **서브타입(Subtype)**: 좀 더 특수한 타입
- 어떤 타입이 다른 타입의 서브타입이 되기 위해서는 행위적 호환성을 만족시켜야 한다
- 서브타입은 슈퍼타입의 행위와 호환
  - 서브타입은 슈퍼타입을 대체할 수 있어야 함

## 동적 모델과 정적 모델

- 스냅샷(snapshot)

  : 객체가 특정 시점에 구체적으로 어떤 상태를 가지느냐

  - UML에서는 **객체 다이어그램(object diagram)**
  - 객체가 살아 움직이는 동안 상태가 어떻게 변하고 행동하는지 → **동적 모델(dynamic model)**

- 타입 모델(type diagram)

  : 객체가 가질 수 있는 모든 상태와 행동을 시간에 독립적으로 표현

  - **정적 모델(static model)**

⇒ 객체 지향 애플리케이션을 설계하고 구현하기 위해서는 객체 관점의 동적 모델과 객체를 추상화한 타입 관점의 정적 모델을 적절히 혼용해야 함

## 클래스

- 객체지향 프로그래밍 언어에서 정적인 모델은 클래스를 이용해 구현

- 타입: 객체를 분류하기 위해 사용하는 개념

- 클래스: 단지 타입을 구현할 수 있는 여러 구현 메커니즘 중 하나

  cf) 자바스크립트 같은 프로토타입 기반 언어에는 클래스가 존재하지 X

  타입 구현 외에도 코드를 재사용하는 용도로도 사용

<aside> 💡 객체 지향에서 중요한 것: 동적으로 변하는 객체의 `상태`와 상태를 변경하는 `행위`

</aside>

# 4장

- 객체 지향 설계: 단순성(simplicity), 유연성(flexibility),  재사용성(reusability)
  - 역할의 대체 가능성 = 행위 호환성 = 동일한 책임의 수행

## 객체 지향 설계 기법

<aside> 💡 1. 책임-주도 설계(Responsibility-Driven Design) 2. 디자인 패턴(Design Pattern) 3. 테스트-주도 개발(Test-Driven Development)

</aside>

### 책임 주도 설계

- 객체의 책임을 중심으로 시스템을 구축
- 시스템의 기능은 더 작은 규모의 책임으로 분할되고, 각 책임은 수행할 적절한 객체에게 할당
- 객체개 책임 수행 도중에 스스로 처리할 수 없는 정보나 기능이 필요한 경우 적절한 객체 찾아 필요한 작업 요청 → 객체 간 협력 관계 생성
- 개별적인 객체의 상태가 아닌 객체의 책임과 상호작용에 집중
- 역할, 책임, 협력에 집중 → 유연하고 견고한 객체 지향 시스테 만드는 데 기여

### 디자인 패턴

- 책임-주도 설계의 결과 표현
- 패턴: 모범이 되는 설계(example design), 특정 상황에서 설계 돕기 위해 모방, 수정할 수 있는 과거의 설계 경험
- 반복적으로 발생하는 문제와 그 문제에 대한 해법의 쌍

### 테스트 주도 개발

- 애자일 방법론의 한 종류인 XP의 기본 프랙티스로 소개
- 실패하는 테스트를 작성하고, 테스트를 통과하는 가장 간단한 코드를 작성한 후, 리팩터링을 통해 중복 제거
- 책임을 수행할 객체 또는 클라이언트가 기대하는 객체의 역할이 메시지를 수신할 때 어떤 결과를 반환하고 그 과정에서 어떤 객체와 협력할 것인지에 대한 기대를 코드의 형태로 작성
- 책임-주도 설계의 기본 형태 따름

# 5장

## 메시지와 메서드

### 메시지

- 메시지 전송: **수신자 + 메시지 이름(message name) + 인자(argument)**
- 객체들의 속성과 행위를 식별하는 것이 먼저
- 클래스는 객체의 속성과 행위를 담는 틀일 뿐
- 객체 지향 설계의 중심

### 메서드

- 객체가 메시지에 대한 응답으로 요청을 만족시키기 위하여 수행하는 것

### 다형성

- 서로 다른 유형의 객체와 동일 메시지에 대해 서로 다르게 반응하는 것
- 객체들의 대체 가능성을 이용해 설계를 유연하고 재사용 가능하게 만듦
- 송신자가 수신자의 종류를 모르더라도 메시지 전송 가능 → 수신자 종류 캡슐화
- 유연한 협력과 확장 가능한 구조와 높은 재사용성

### 책임 주도 설계

1. 객체가 어떤 메시지를 수신하고 처리할 수 있느냐가 객체의 책임 결정
2. 어떤 메시지가 필요한지 결정
3. 메시지를 수신하기에 적합한 객체 선택
4. 메시지가 수신자의 책임 결정

## 객체 인터페이스

### 인터페이스

- 어떤 두 사물이 마주치는 경계 지점에서 서로 상호작용할 수 있게 이어 주는 방법이나 장치

<aside> 💡 1. 인터페이스의 사용법을 익히기만 하면 내부 구조나 동작의 방식을 몰라도 쉽게 대상을 조작하거나 의사를 전달할 수 있음 2. 인터페이스 자체는 변경하지 않고 단순 내부 구성이나 작동만을 변경하는 것은 인터페이스 사용자에게 어떤 양향도 미치지 않는다 3, 대상이 변경되더라도 동일한 인터페이스를 제공하기만 하면 아무런 문제 없이 상호작용 가능

</aside>

- 공용 인터페이스: 객체의 구현

### 구현

- 객체를 구성하지만 공용 언터페이스에 포함되지 않는 것

1. 객체는 `상태`를 가짐

- 상태는 객체에 포함되지만 객체 외부에 노출되는 공용 인터페이스의 일부는 아님
  - 객체의 구현: 상태를 어떻게 표현할 것인가

1. 객체는 `행동`을 가짐

- 행동은 메시지를 수신했을 때만 실행되는 일종의 메시지 처리 방법 → 

  ```
  메서드
  ```

  - 메서드: 객체 외부에 노출되는 공용 인터페이스 X, 객체의 구현

- 객체의 외부와 내부를 분리: 객체의 공용 인터페이스와 구현을 명확하게 분리

### 인터페이스와 구현의 분리 원칙

- 객체 설계 시 객체 외부에 노출되는 인터페이스와 객체 내부에 숨겨지는 구현을 명확하게 분리하여 고려
- 객체 `내부`: 상태, 메서드 구현
- 객체 `외부`: 객체의 공용 인터페이스 수정

## 캡슐화

- 객체의 자율성을 보존하기 위해 구현을 외부로부터 감추는 것
- **정보 은닉(information hiding)**

### 상태와 행위의 캡슐화

- 객체는 스스로 자신의 상태를 관리하며 상태를 변경하고 외부에 응답할 수 있는 행동을 내부에 함께 보관 → `데이터 캡슐화`
- 데이터 캡슐화: 인터페이스와 구현을 분리하기 위한 전제 조건
- 전통적: 데이터와 프로세스 엄격하게 구분

**↔ 객체 지향: 데이터와 프로세스를 객체라는 하나의 틀 안으로 함께 묶어 객체의 자율성 보장**

### 사적인 비밀의 캡슐화

- 외부에서 객체와 의사소통할 수 있는 고정된 경로 → `공용 인터페이스`
- 공용 인터페이스: 외부에서 전송 가능한 메시지의 집합
  - 개인적인 비밀은 공용 인터페이스 뒤에 감춤
  - 외부의 불필요한 공격과 간섭으로부터 내부 상태 격리: 최대한 자율성 보장
- **외부의 객체는 공용 인터페이스에만 의존해야 하고 구현 세부 사항에 대해 직접적으로 의존해서는 안 됨**

<aside> 💡 객체의 외부와 내부를 명확하게 구분 → 설계가 단순, 유연, 변경하기 쉬워짐

</aside>

- 책임이 자율적일수록 적절하게 `추상화`되며, `응집도`가 높아지고, `결합도`가 낮아지며, `캡슐화`가 증진되고, `인터페이스와 구현이 명확히 분리`되며, 설계의 `유연성`과 `재사용성` 향상

# 6장

## 기능과 구조

<aside> 💡 객체 지향: 기능이 아니라 `안정적인 구조`를 바탕으로 시스템 분할

</aside>

- 기능: 사용자가 자신의 목표를 달성하기 위해 사용할 수 있는 시스템의 서비스
- 기능 설계: 제품이 사용자를 위해 무엇을 할 수 있는지 (충분조건)
- 구조: 시스템의 기능을 구현하기 위한 기반, 기능 변경을 수용할 수 있도록 안정적
- 구조 설계: 제품의 형태가 어떠해야 하는지 (필요조건)

→ 기능과 구조라는 두 가지 측면을 함께 녹여 조화를 이루도록 만들기

- 객체 지향은 객체의 구조에 집중해 기능이 구조를 따르게 만듦
  - 시스템 기능은 더 작은 책임으로 분할되고 적절한 객체에게 분배되기 때문에 기능이 변경되더라도 객체 간의 구조는 그대로 유지

```
구조: 사용자나 이해관계자들이 도메인(domain)에 관해 생각하는 개념과 개념들 간 관계로 표현
기능: 사용자의 목표를 만족시키기 위해 책임을 수행하는 시스템의 행위
```

- `도메인 모델링`: 구조를 수집하고 표현
- `유스케이스 모델링`: 기능을 수집하고 표현

## 도메인 모델링

- 도메인: 사용자가 프로그램을 사용하는 대상 분야

- 모델: 대상을 단순화하여 표현하고 의식적으로 구조화한 것

  - 복잡성의 바다에서 길을 잃지 않고 중요한 문제에 집중할 수 있도록 필요한 지식만 재구성
  - 현재 문제와 관련된 것만 추상화하고 그 밖의 관련 없는 세부 사항에 대해서는 무시
  - 복잡성을 추상화하고 관리하기 위해 사용하는 기본적인 도구

- ```
  도메인 모델
  ```

  : 사용자가 프로그램을 사용하는 대상 영역에 관한 지식을 선택적으로 단순화하고, 의식적으로 구조화한 형태

  - 소프트웨어가 목적하는 영업 내 개념과 개념 간 관계, 다양한 규칙이나 제약 등을 주의 깊게 추상화한 것
  - 이해관계자들이 바라보는 멘탈 모델(Mental Model)
  - 멘탈 모델: 사람들이 자기 자신, 다른 사람, 환경, 자신이 상호 작용하는 사물들에 대해 갖는 모형
  - 도메인에 대한 사용자 모델, 디자인 모델, 시스템 이미지를 포괄하도록 추상화한 소프트웨어 모델

- 설계자는 디자인 모델을 기반으로 만든 시스템 이미지가 사용자 모델을 정확하게 반영하도록 노력해야 함

### 도메인과 객체 지향의 관계

- 애플리케이션이 도메인 모델을 기반으로 설계되어야 함 → 객체 지향
- 객체 지향은 사람들이 만지고 느끼고 볼 수 있는 실체를 시스템 안의 객체로 재창조할 수 있게 함
  - 동적인 객체가 가진 복잡성을 극복하기 위해 정적인 타입을 이용해 세상을 단순화할 수 있으며 클래스라는 도구를 이용해 타입을 코드 안으로 옮길 수 있음
  - 객체 지향 패러다임은 사용자의 관점, 설계자의 관점, 코드의 모습을 모두 유사한 형태로 유지할 수 있게 하는 유용한 사고 도구와 프로그래밍 기법 제공
  - 이를 `연결 완전성` 또는 `표현적 차이`라고 부름

### 표현적 차이

- 소프트웨어 객체와 현실 객체 차이 → **은유를 기반으로 재창조**
- 사이의 이미적 거리 → `표현적 차이`, `의미적 차이`
- 소프트웨어 객체를 창조하기 위해 은유해야 하는 대상은 도메인 모델

### 도메인 모델의 안정성

- 도메인 모델이 제공하는 구조는 상대적으로 안정적
- 사용자 모델에 포함된 개념과 규칙은 비교적 변경될 확률이 적음
  - 기반으로 설계와 코드를 만들면 변경에 쉽게 대처할 가능성 커짐
  - 변경에 유연하게 대응할 수 있는 탄력적인 소프트웨어를 만들 수 있음

## 기능

### 유스케이스

- 훌륭한 기능적 요구사항을 얻기 위해서는 목표를 가진 사용자와 사용자의 목표를 만족시키기 위해 일련의 절차를 수행하는 시스템 간의 **상호작용** 관점에서 시스템을 바라봐야 함

- ```
  유스케이스
  ```

  : 사용자의 목표를 달성하기 위해 사용자와 시스템 간에 이뤄지는 상호작용의 흐름을 텍스트로 정리

  - 사용자들의 목표를 중심으로 시스템의 기능적인 요구사항들을 이야기 형식으로 묶을 수 있음
  - 산발적으로 흩어진 기능에 사용자 목표라는 문맥을 제공함으로써 각 기능이 유기적인 관계

### 유스케이스의 특성

1. 사용자와 시스템 간의 상호작용을 보여주는 ‘텍스트’
2. 하나의 시나리오가 아니라 여러 시나리오들의 집합
   - **시나리오**: 유스케이스를 통해 시스템을 사용하는 하나의 특정한 이야기 또는 경로
   - 시나리오 = 유스케이스 인스턴스(use case instance)
3. 유스케이스는 단순한 피처 목록과 다름
   - 피처: 시스템이 수행해야 하는 기능의 목록을 단순 나열
4. 유스케이스는 사용자 인터페이스와 관련된 세부 정보를 포함하지 말아야 한다
   - 자주 변경되는 사용자 인터페이스 요소는 배제하고 사용자 관점에서 시스템 행위에 초점
   - **본질적인 유스케이스(essential use case)**
5. 유스케이스는 내부 설계와 관련된 정보를 포함하지 않는다
   - 유스케이스에서 객체 설계로의 전환은 공학적인 규칙과 원칙을 기반으로 한 변환 작업이 아니라 경험과 상식과 의사소통을 기반으로 한 창조 작업
   - 시스템의 내부 구조나 실행 매커니즘에 대한 관한 어떤 정보도 제공하지 않음
   - 단지 사용자가 시스템을 통해 무엇을 얻을 수 있고 어떻게 상호작용할 수 있느냐에 관한 정보만 기술

<aside> 💡 **객체 설계** 요구 사항들을 식별하고 도메인 모델을 생성한 후, 소프트웨어 클래스에 메서드들을 추가하고, 요구 사항을 충족시키기 위해 객체들 간 메시지 전송을 정의

</aside>

- 유스 케이스 → 사용자에게 제공할 기능을 시스템의 책임으로 보게 함으로써 객체 간 안정적 구조에 책임을 분배할 수 있는 출발점 제공

- 도메인 모델 → 기능을 수용하기 위해 은유할 수 있는 안정적 구조 제공

- 책임-주도 설계 → 유스케이스로부터 첫 번째 메시지와 사용자가 달성하려는 목표를, 도메인 모델로부터 기능을 수용할 수 있는 안정적인 구조를 제공받아 실제로 동작하는 객체들의 협렺=ㄱ적인 공동체 창조

  - 책임-주도 설계: 시스템의 기능을 역할과 책임을 수행하는 객체들의 협력 관계로 바라보게 함
  - 유스케이스와 도메인 모델 통합

- 견고한 객체지향 애플리케이션을 개발하기 위해서는 `사용자의 관점에서 시스템의 기능을 명시`하고, 사용자와 설계자가 공유하는 `안정적인 구조를 기반으로 기능을 책임으로 변환`하는 체계적인 절차를 따라야 함

- ```
  연결 완전성
  ```

  : 도메인을 모델링하기 위한 기법과 도메인을 프로그래밍 하기 위해 사용하는 기법이 동일

  - 코드의 변경으로부터 도메인 모델의 변경 사항을 유추할 수 있다 → 연결 완전성의 역방향도 성립: `가역성`

- 도메인 모델은 문서나 다이어그램이 아니고 사람들 머릿속에 들어 있어 공유된 멘탈 모델

- 도메인 모델의 목표: 사람들이 동일한 용어와 동일한 개념을 이용해 의사소소통하고 코드로부터 도메인 모델을 유추

<aside> 💡 1. 안정적인 도메인 모델을 기반으로 시스템 기능을 구현하라. 2. 도메인 모델과 코드를 밀접하게 연관시키기 위해 노력하라. 3. 유지보수하기 쉽고 유연한 객체지향 시스템을 만드는 첫걸음.

</aside>

# 7장

- 인터페이스에 포함된 오퍼레이션 역시 외부에서 접근 가능하도록 공용(public)으로 선언되어 있어야 한다
- `인터페이스와 구현을 분리하기`

## 추상화 기법

- **분류**: 객체의 구체적인 세부 사항을 숨기고 인스턴스 간 공유하는 공통적인 특성을 기반으로 범주 형성
- **인스턴스화**: 범주로부터 객체를 생성(분류의 역)
- **일반화**: 범주 사이 차이를 숨기고 범주 간 공유하는 공통적인 특수 강조 ↔ **특수화**
- **집합**: 부분과 관련된 세부 사항을 숨기고 부분을 사용해서 전체를 형성하는 과정
- **분해**: 전체를 부분으로 분리 (집합의 역)
- 객체 지향의 가장 큰 장점: **동일한 추상화 기법을 프로그램의 분석, 설계, 구현 단계에 걸쳐 일관성 있게 적용 가능**

## 분류와 인스턴스화

### 개념과 범주

- 객체를 분류하고 **범주**로 묶는 것은 객체들의 특정 집합에 공통의 **개념** 적용

- 개념: 속성과 행위가 유샇나 객체에 공통적으로 적용되는 관념이나 아이디어

- 분류

  : 세상에 존재하는 객체에 개념을 적용하는 과정

  - 분류는 객체를 특정한 개념을 나타내는 집합의 구성 요소로 포함시킴
  - 사람들은 분류를 통해 복잡성을 낮추고, 개별 현상을 하나의 개념으로 다룸
  - **객체**: 수많은 개별적인 현상들
  - **타입**: 하나의 개념
  - 분류는 객체와 타입을 연관시키는 것 ↔ 인스턴스화, 예시

- **타입**: 객체 지향의 세계에서 개념을 가리키는 표준 용어 (=개념)

- 분류란 객체를 동일한 타입 또는 범주로 묶는 것

  - 객체: 타입의 **인스턴스**
  - 어떤 객체가 타입의 정의에 부합할 경우 그 객체는 해당 타입으로 분류되며 자동으로 타입의 인스턴스가 됨

### 집합과 분해

- 복잡성은 ‘계층’의 형태를 띤다
- 단순한 형태로부터 복잡한 형태로 진화하는 데 걸리는 시간은 그 사이에 존재하는 ‘안정적인 형태’의 수와 분포에 의존한다

### 패키지

- 패키지(package), 모듈(module)

  : 소프트웨어의 전체적인 구조를 표현하기 위해 관련된 클래스 집합을 하나의 논리적인 단위로 묶는 구성 요소

  - 패키지는 내부에 포함된 클래스들을 감춤으로써 시스템의 구조 추상화

---

## 2022-10-18

# GIT 정복하기

[1장: 명령들](https://www.notion.so/ddc3a0ceb17943048acfc1ea89b36ab2)

[2장: 버전 관리](https://www.notion.so/ddc3a0ceb17943048acfc1ea89b36ab2)

[3장: 깃과 브랜치](https://www.notion.so/ddc3a0ceb17943048acfc1ea89b36ab2)

[4장: 저장소](https://www.notion.so/ddc3a0ceb17943048acfc1ea89b36ab2)

[5장: 협업](https://www.notion.so/ddc3a0ceb17943048acfc1ea89b36ab2)

[6장: 깃허브로 소통](https://www.notion.so/ddc3a0ceb17943048acfc1ea89b36ab2)

[블로그 만들기](https://www.notion.so/ddc3a0ceb17943048acfc1ea89b36ab2)

------

# 1장: 필수 명령

## 깃의 쓰임새

### 1. 버전 관리

- 문서 수정 시 언제 수정했는지, 어떤 것을 변경했는지 편하고 구체적으로 기록하기 위한 버전 관리 시스템

### 2. 백업하기

- 현재 컴퓨터에 있는 자료를 다른 컴퓨터에 복제
- 깃의 원격 저장소, 온라인 저장소 → 깃허브

### 3. 협업하기

- 여러 사람이 함께 일할 수 있다
- 누가 어느 부분을 어떻게 수정했는지 기록이 남아서 나중에 오류가 생겼을 시 파악하기 쉽다

## 깃 프로그램 종류

- 깃을 편리하게 사용할 수 있도록 하는 프로그램 (=깃 클라이언트 프로그램)

### 깃 데스크탑

- 복잡한 깃 사용법을 GUI로 구현
- 장점: 사용이 쉬워서 누구나 배울 수 있음
- 단점: 기본적인 기능 위주여서 고급 사용자에게는 아쉬움

### 토터스깃

- 윈도우 전용 프로그램

### 소스트리

- 깃 기본 기능부터 고급 기능까지 사용 가능
- 기능이 많아 사용법 복잡하지만 익숙해지면 자유롭게 활용 가능

## 커맨드 라인 인터페이스 (CLI)

- 터미널 안에 직접 명령 이용해 사용하는 방식
- 기본적인 리눅스 명령+깃 명령 알아야 해서 더 어렵다

## 깃 초기 환경 설정

```
git config --global user.name "SsoHhyun"
git config --global user.email "janeqcitizen@naver.com"
```

- 사용자 이름과 이메일
- —global 옵션: 현재 컴퓨터에 있는 모든 저장소에 같은 사용자 정보 사용
- 터미널 창의 깃 명령 = 리눅스 명령

```
* 현재 위치
pwd

* 현재 디렉터리에 어떤 파일이나 디렉터리가 있는지
ls

* l : 디렉터리 상세 정보 / a : 숨긴 파일 및 디렉터리까지 표시
ls -la
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c368683d-d492-4663-8bd7-bd1f02d9c303/Untitled.png)

```
* 상위 디렉터리로 이동
cd ..

* cd + 하위 디렉터리 이름 -> 하위 디렉터리로 이동

* 홈 디렉터리로 이동
*cd ~
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/81dbe6b8-0dca-4c96-9bf9-e763122b7c5a/Untitled.png)

```
* test라는 이름의 디렉터리 만들기 (=make directory)
mkdir test

* test라는 이름의 디렉터리 및 하위 디렉터리와 파일까지 함께 삭제 (=remove)
rm -r test

* 해당 이름 파일이 없다면 파일을 생성하고, 있다면 파일을 여는 명령
vim test.txt
```

- 처음에는 ex 모드로 열려서 입력 모드로 전환해야 수정 가능
- `I`(=insert)나 `A` (=add)버튼으로 입력 보드로 전환
- 입력 후 `ESC`로 ex 모드로 돌아감
- `:`을 통해 텍스트 입력 가능
- `:wq`(=저장,  종료) 명령 입력 후 `Enter` 누르면 저장

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f14a3b2e-c946-498d-a7f5-648ad960ed99/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6c7679d-940e-4f54-b7e4-bea83dd646cd/Untitled.png)

------

# 2장: 버전 관리

```
git init
```

- 깃 사용할 수 있도록 디렉터리 초기화

## 버전 만들기

- 깃에서 버전이란?
  - 문서를 수정하고 저장할 때마다 생기는 것
  - 깃에서 버전 관리 시 파일 이름 그대로 유지하며 파일에서 무엇어ㅡㄹ 변경했는지 변경 시점마다 저장할 수 있음
  - 버전마다 작업했던 내용을 확인할 수 있고, 그 버전으로 돌아갈 수도 있음

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/468883da-06a9-4280-b905-c73bae51e2fa/Untitled.png)

- untracked files: 깃에서 한 번도 버전 관리하지 않은 파일들이라는 뜻
- git add

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e3af2b3-5f38-4d91-b6c5-55845ea49693/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cb0d7531-93c3-4fb7-ba5a-66b484f50814/Untitled.png)

- git commit

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/750ec14d-cec2-4f4a-a800-667b72693d69/Untitled.png)

- git log: 저장소에 저장된 버전 확인

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74186121-a4df-4fb9-a0fd-7b15727f0b6e/Untitled.png)

- git commit -am “test 1”: 한번 commit한 파일이라면 add와 commit 한꺼번에 처리

## 커밋 내용 확인하고 수정하기

- git log

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2208c702-2b26-4d32-8b92-4ce263a66423/Untitled.png)

- git diff: 변경 사항 확인하기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/72643fbc-65a0-43ce-bf83-d3cde4fbe2f0/Untitled.png)

- git log —stat: 커밋 관련된 파일까지 함께 살펴보기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1acdc13f-fb5f-4a21-a0d2-8c7e7e898b99/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/33df2f04-164a-4bfb-bbb9-91de37363818/Untitled.png)

- .gitignore 파일로 버전 관리에서 제외

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3ae4503-922d-4a81-9a37-a7f572f4aa64/Untitled.png)

- git status 3단계

<aside> 💡 working tree clean → unmodified: 수정되지 않은 상태 Changes not stage for commit → modified: 파일이 수정만 된 상태 Changes to be committed → 커밋 직전의 staged 상태

</aside>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6eadbebb-146d-4929-953c-28d9f0763748/Untitled.png)

- commit 메시지 수정

```
git commit --amend
```

- `I` 버튼으로 입력 모드로 바꿔 메시지 수정

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77347318-d088-4f08-a598-1d874a6334bf/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/26fce273-9530-4cf6-94fc-b8c7661174e2/Untitled.png)

## 작업 되돌리기

- vim에서 수정 후 git checkout으로 내용 되돌리기 가능

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8f429bf2-d795-4377-a3dd-9cf148398fba/Untitled.png)

### 스테이징 되돌리기

```
git reset HEAD 파일 이름
```

### 최신 커밋 되돌리기

```jsx
git reset HEAD^
```

- HEAD^: 현재 HEAD가 가리키는 브랜치의 최신 커밋
- commit 취소와 unstage 동시 진행

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1cab1c76-1f16-4860-8be1-f723a25428b1/Untitled.png)

### 특정 커밋으로 되돌리기

```
git reset 커밋 해시
```

<aside> 💡 주의: 그냥 reset A라고 해 버리면, A commit을 reset하겠다는 게 아니라 최근 commit을 A로 reset **A commit 이후에 만들었던 commit들이 삭제**되고 A commit으로 이동

</aside>

- git log 명령으로 commit 해시들 확인

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a07e6b12-1bba-455f-ab0f-fc254d082f14/Untitled.png)

### 커밋 삭제하지 않고 되돌리기

```jsx
git revert 복사한 commit 해시
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/292af71b-3edc-4895-bd25-02a46c17cf4c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea05da11-1b79-4c07-b91c-20a1b7b4bf7a/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3d32ab76-92c1-4357-8005-04bdd87e5580/Untitled.png)

# 3장: 깃과 브랜치

## 분기와 병합

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a76026a8-c7a3-4320-a6de-5106cf7d6e79/Untitled.png)

## 브랜치 만들기

```
# 현재 작업 중인 branch 및 branch 목록 확인
git branch

# branch 새로 만들기
git branch 새 브랜치 이름
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b569fb62-ef29-448a-8f48-7edd1a2f718b/Untitled.png)

### 브랜치 이동하기 - git checkout

```
# 한 커밋씩 확인하기 (커밋 간략히 확인)
git log --oneline

# branch 이동하기
git checkout 브랜치 이름
```

## 브랜치 정보 확인하기

```
# 각 브랜치 커밋 함께 확인하기
git log --online --branches

# 그래프 형태로 표시하기
git log --online --branches --graph

# 브랜치 사이 차이점 확인
git log 기준 브랜치..비교할 브랜치
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1e01f2ed-159d-4807-9430-e880b7acf737/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24457c0f-9eb3-48b1-9878-5b946ed31087/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a42c2e00-62ca-46cf-aaf3-9d94943cb671/Untitled.png)

## 브랜치 병합하기

```
git checkout master
git merge 가져올 브랜치 이름
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/da960e0b-ed60-40a7-8523-913c1f04f41c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/efbc26e8-4bc6-4149-83db-322aa0f5fad9/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ba4faf0e-ad02-469b-af40-ed9f3601a306/Untitled.png)

- 브랜치 충돌(conflict): 각 브랜치에 같은 파일 이름을 가지고 같은 줄을 수정했을 때 브랜치 병합 시 발생

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bf91c2a8-23f6-4582-bd8c-d0cb468b4eeb/Untitled.png)

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff24b6b2-8930-4379-a6d2-d933b2b02958/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e75f7af2-8073-4b33-af2b-46896e4747d0/Untitled.png)

### 병합 끝난 브랜치 삭제하기

```
# 브랜치 삭제
git branch -d 삭제할 브랜치 이름
```

- 삭제한 브랜치는 같은 이름으로 다시 만들면 예전에 작업했던 내용이 나타남
- 즉, 브랜치를 삭제한다는 것은 완전히 저장소에서 없애는 것이 아닌 git의 흐름 속에서 감추는 것

### 수정 중인 파일 감추기 및 되돌리기 — git stash

- git stash 명령 사용하려면 파일이 tracked 상태여야 함 → 한 번은 commit을 했어야 함

```
# 수정 중인 파일 감추기
git stash

# 감춰진 파일 목록 확인하기
git stash list

# 파일 다시 꺼내오기
git stash pop
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/07d26ac8-73f0-46f9-9417-7f7ab09de046/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4af4ad0f-74da-42b7-95c4-236f69973811/Untitled.png)

# 4장: 저장소

### 원격 저장소에 연결하기

```
# 연결하기
git remote add origin 깃허브 주소

# 연결됐는지 확인하기
git remote -v

# 지역 저장소 브랜치를 원격 저장소 브랜치로 푸시하기
# 처음에만 이렇게 쓰고 그 다음에는 그냥 push라고만 해도 된다
git push -u origin 원격 브랜치 이름

# 원격 저장소에서 파일 내려받기
git pull origin 브랜치 이름
```

## 깃허브에 SSH 원격 접속하기

- ```
  SSH(Secure Shell)
  ```

  : 보안이 강화된 안전한 방법으로 정보 교환하는 방식

  - 프라이빗 키 + 퍼블릭 키
  - 일반적으로는 아이디와 비밀번호를 입력해 저장소 주인임을 인증
  - 자동 로그인을 통해 번거로움 줄일 수 있음

### SSH 키 생성하기

- 터미널에서 홈 디렉터리로 이동
- `ssh-keygen` 입력 → SSH 키 저장 디렉터리 확인 후 엔터
- 두 번 더 엔터 클릭 후 비밀번호 생성

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/146dbed3-7544-40be-a5db-072545d9cd6f/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf41b63c-488f-4f85-8551-fd4c620f94bf/Untitled.png)

### 깃허브에 퍼블릭 키 전송

- 사용자 컴퓨터에서 깃허브 저장소에 접속하면, 사용자 컴퓨터에 있는 프라이빗 키와 깃허브 서버에 있는 퍼블릭 키 비교하여 서로 맞으면 저장소 연결

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6606e12a-1dbe-4d03-979f-55a65321c495/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7529b1e-90de-4f3c-982c-c1a429359721/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/57716619-2f8a-41bb-a737-b6f60b42d59c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a4a8943-fd2c-49d5-b62e-89b89f839c40/Untitled.png)

### SSH 주소로 원격 저장소 연결

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/57dce7f5-07da-43c5-a762-164a51c925a3/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/65a6dbb6-f02f-4066-88a6-0a0ec9b540c5/Untitled.png)

# 5장: 협업하기

## 원격 저장소 함께 사용하기

### 원격 저장소 복제하기 — git clone

```
$ git clone 복사한 주소 디렉터리 이름
```

### 원격 브랜치 정보 가져오기 — git fetch

- 원격 브랜치에 어떤 변화가 있는지 그 정보만 가져온다

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77a49c54-f739-475a-a5e6-7244695801f5/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ccff6fe5-b553-4ee5-ae56-cf54f9e62c9b/Untitled.png)

- git pull → git fetch + git merge FETCH_HEAD

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e521e03-2ea5-4c32-8512-63ab9f3511dd/Untitled.png)

## 협업의 기본

- 저장소 화면 - [Settings] - [Collaborators] - 메일 주소 입력 - [Add Collaborator] - 깃허브 화면에서 [Accept Invitation]

- 각 컴퓨터에 지역 저장소 만든 후, 공동 작업에서 이용할 이름과 이메일 주소 저장

  - 저장소마다 다른 이름과 메일 주소 만들기 위해 `--global` 옵션 제외

  ```
  $ git init workplace
  $ cd workplace
  $ git config user.name "이름"
  $ git config user.email 메일 주소
  ```

## 협업에서 브랜치 사용

### 새로 만든 브랜치 푸시하기

```
# 브랜치 생성 후 바로 체크아웃하기
$ git checkout -b 브랜치 이름

# 원격 저장소(origin)에 브랜치까지 함께 푸시
$ git push origin 브랜치 이름
```

- pull request로 브랜치 병합
- [New pull request] - [Create pull request] - [Merge pull request] - commit message 입력 - [Confirm merge]

------

# 6장: 깃허브로 소통하기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f473c95d-e0f2-4928-8d08-c9a46833d79a/Untitled.png)

- 마크다운 문법 도입하기
- 링크

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc4e7642-0733-4ed7-a65b-47587feef188/Untitled.png)

- 이미지

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b13ecaf5-ce2f-4d46-b64a-e82399d3be33/Untitled.png)

### 깃허브에 이미지 올리고 README에 삽입

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3d96a522-11dd-4f08-a0b6-3e6043b8acfd/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b05bee41-da6e-42a1-a588-c947edcd1130/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/72be028a-b791-45b1-afc3-b14d59cbb6b2/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0ac843df-81ff-4dd6-b189-74e14f318160/Untitled.png)

## 오픈 소스 프로젝트에 기여하기

- README 파일 한국어로 번역
  - 먼저 메일 보내서 번역해도 되는지 물어보기
  - 분량 적은 것부터 천천히 시작
- 소스, 문서의 오타 수정
- 개발 소스 코드 수정

### 오픈 소스 저장소 복제하기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2b8ff37b-9d2d-4cd8-a511-beac5db16b34/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/59fb11bc-c494-45cb-b33a-fb8ad22e2f61/Untitled.png)

- 이후 포크한 저장소 지역 저장소로 CLONE

## 깃허브에 개인 블로그 만들기

### 1. 홈페이지 파일이 있을 때

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7082d36c-7d5f-4f66-b11c-49ff27c36916/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aac61d6c-25c3-4ac8-afb7-493517401757/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/32486017-7d86-411e-9585-c9bc89a056cd/Untitled.png)

### 2. 홈페이지 파일이 없을 때

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/470e7c6c-372f-465e-a8a0-7c553a73f184/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0ff3575b-a1af-473a-ac80-ae0438d8feee/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/64a3b1fc-7bf0-4ac8-9da5-b39bdfacb028/Untitled.png)

### 블로그 만들고 기본 환경 설정하기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9e5a1971-b9a4-4260-8b91-9be0ac93aa5e/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3936ada9-4b6d-4c52-a312-893a2fe455d4/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5328e1da-644d-45fa-b0b1-b79d3b32173f/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/424da52e-3d9c-4385-96b8-4f6253cdd8a9/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/23c8c5ab-6cbf-4d87-9f11-6907c377b554/Untitled.png)

------

# VSC에서 GIT 활용하기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed84afd6-ffc0-41e3-ba1b-445ec6da7e0a/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/69197552-637d-4ac3-9bd0-1b0043831498/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/05f6fff1-200e-47a2-a921-1a1adc7b5b25/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/48070eea-f3d2-4c09-9f88-d2c2a866cb0f/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ade4ecd9-ab67-40fa-8bd0-6b1e70e04cbf/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/90b1ed2f-1584-4f29-a991-6ac7e123b002/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4b5bf6b5-b4c0-4b5a-8181-d0e9bcad3864/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/83ce243d-45a8-4568-9fc6-b9796f70b630/Untitled.png)

---

## 2022-10-19

# 기능 분류하기

- **이야기 나온 기능들**

  - 브랜치 구조를 보기 좋게 나타내 줬으면 좋겠다
    - IDE 보면 폴더 구조를 쉽게 보기 가능
    - 가시성 있게 나타내기
    - 만들고, 병합
    - branch를 merge 하고 나눠진 log를 가시적으로
  - revert 버튼 하나로 간단하게 할 수 있게 하기
    - 해당 commit만 취소하는 건지
    - 해당 commit의 앞의 모든 commit을 취소하는 건지
    - 해당 commit을 삭제하지 않고 변경만
    - 사용자가 직관적으로 알 수 있게 간단하게
    - commit 해시를 쉽게 확인할 수 있도록 (git log 쓰지 않아도)
  - stage별로 나누어서 취소 중인 것 알려 주기
    - 워킹 디렉토리, 스테이지, 레파지토리 등
    - 내가 작업 중인 게 어디쯤 있는지 알려 주었으면 좋겠다
  - add, commit, push, stash, pull, fetch
  - .gitignore 폴더로 올리지 않을 파일 넣기 → 드래그 앤 드랍
  - commit 내역에서 commit 메시지 바로 수정 가능하게끔 하기
  - 해당 branch에서 누가 작업하고 있는지
    - 마지막으로 commit한 사람?
  - merge 시 충돌된 부분에 대해 프로그램 자체에서 수정할 수 있게
  - pull 할 사항이 있으면 알려 주기
  - commit, push 할 사항 알려 주기
  - 명령어(영어), 기능별로 설명(한국어) on/off → 학습 용도로 확장
  - commit 검색

- **소스트리**

  - 파일 한 줄 한 줄 관리
    - 변경 사항 중 몇 줄만 관리 가능

- **레퍼런스들**

  - 데스크탑

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/58565c60-7881-4ff9-afe7-8eaefc932da8/Untitled.png)

    - 크라켄

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ea3b470-c451-413a-951b-1efeb8b93052/Untitled.png)

    - 소스트리

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/85abe09c-5a0c-4f11-a3e1-b6870c37f820/Untitled.png)

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6bafe6a-1d98-46f8-98d8-3303eb471895/Untitled.png)

- **필수 기능**

  - GIT 기본 기능
    - GIT DESKTOP에 있는 모든 기능들
      - add, commit, push, pull, merge, branch 생성-병합-삭제, local 및 remote 저장소 생성, fetch, push undo, history 탭에서 작업 내용 확인
      - cherry-pick, clone, revert, fork, pull request ⇒ 서비스 자체에서 다 할 수 있도록
      - commit, push 할 사안 있으면 알려 주기
    - branch 구조 시각화 ⇒ directory 구조처럼
      - 그래프에서 바로 branch 관련 정보 찾아볼 수 있게
    - 기능에 대한 설명 + 명령어 도움말
    - commit 규칙 컨벤션
      - 팀에서 템플릿 입력하면 JIRA 라벨 사용하듯 제공
    - 마우스 클릭으로 pull request, branch 이동
    - 기억에 남는 이름과 확실한 앱 콘셉트와 디자인
    - terminal 기능

- **추가 기능**

  - GIT 심화 기능
    - git-flow, rebase, stash
  - merge 한 경우 branch history를 보기 좋게 시각화
  - 기본 프로필 제공
  - github 외 연동할 수 있는 사이트들 알려 주기
  - clone을 프로그램 자체에서 할 수 있게 하기 (링크 복사할 필요 X)
  - cmd + -로 프로그램 확대/축소
  - squash (여러 개 commit을 하나의 commit으로 묶기)
  - stage별로 commit 내용 나누어서 보여 주기
  - 파일구조를 인텔리제이 형태의 폴더 구조로(vsCode 식으로 바꾸는것도 괜찮을듯)
  - commit 메시지 프로그램 내에서 바로 수정
  - merge 시 발생한 충돌 프로그램 자체에서 바로 수정
  - commit convention 설정 + 라벨처럼 클릭하여 사용
  - commit 내용 (변경 사항) 확인
  - 브랜치를 폴더 형식으로
  - 도움말, 한국어 설명
  - 브랜치 작업자 표기
  - 폰트 설정 등을 여기서 넣어줄수도?
  - 디렉토리에서 바로 접근
  - log 출력
  - 캐릭터 같은 사용자 친화적인 기능 (귀여울듯ㅎㅎ + 그래프 볼 때 편할듯 + 이름도 아예 그 컨셉으로 잡아도 좋을듯 깃크라켄처럼)
  - 튜토리얼 모드 → 깃허브 데스크탑처럼 사용법을 자연스럽게 알려줄 수 있는 기능 있으면 좋을듯

- **기능 위치**

  **[1페이지]**

  - 메인 페이지

    - Git clone / 도움말

      - 기존에 있는 저장소 / 새로운 저장소

        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c39049bb-3a0b-4549-945b-446f741683c7/Untitled.png)

        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea69fa14-e7b2-4040-9cf1-08f3703aa5b4/Untitled.png)

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/11c66297-194b-439e-bb4e-b8b1a8fbb2fa/Untitled.png)

  **[2페이지]**

  - 위쪽 (nav-bar)

    - 도움말 버튼(페이지 전체에 대해on/off 가능하게)

      → on 한 경우 잘 보일 수 있게 배치

      - 자유롭게 펼쳤다 닫았다 할 수 있게

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/25909cfe-6193-4ac0-9a22-83482c129e4e/Untitled.png)

    - Staging 여부 화면에 표시

      - 두꺼운 header로 commit 규칙 컨벤션 표시
      - commit으로 향하는 화살표 클릭 시 팝업창처럼 노출

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2ec3f199-c1ca-4742-b628-f47642a390f7/Untitled.png)

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/015b5b1b-dd81-4fc1-b308-bedd7cafa4ae/Untitled.png)

      - 마지막 동그라미에는 comm it 리스트(버전 관리)가 있어도 좋을 것 같다
        - revert, reset
      - work tree, stage, repository

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/919cc046-6979-42e8-8924-6cb587dc2271/Untitled.png)

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6389c48-531e-4bb5-ae48-ade9f0a74d1d/Untitled.png)

    - pull, push, fetch, merge, branch

      - branch 클릭 시 drop down으로 branch 변경 가능하게 하기

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b2be9f4-ab8f-47a6-9da9-14a1ecebd3db/Untitled.png)

    - 멀티탭으로 원격/로컬 branch 따로 표시

      - branch 헷갈리지 않게 하기 위함, 정확한 위치 다시 정하기

  - 왼쪽 (drawer)

    - 하위 디렉터리 구조 보여 주듯 branch 구조도 보여 주기

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84b2c43a-4717-48a0-ad70-2861298e1477/Untitled.png)

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/19e359e4-e1a3-40c2-bc67-621948199ab5/Untitled.png)

      - 왼쪽 아래에 브랜치 디렉토리 요약을 보여주기
      - 기존 브랜치 구조에 드래그 앤 드랍으로 pull request나 branch 이동
        - 버튼을 하나 두고, 버튼을 누르면 브랜치 상새보기 페이지로 이동
        - 상세보기 페이지
          - 왼쪽에 브랜치 디렉토리 풀버전
          - 가운데에 브랜치를 마인드맵으로 보여주기

  - 중앙

    - local에 변화가 있는데 commit 할 거냐고 친절하게 알려 주기

      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0960122f-1f04-47fb-96b2-2a0eb5f7b567/Untitled.png)

    - 전체적인 branch 흐름도

    - branch 내부를 자세히 보여 줬으면 좋겠다

  - 아래

    - 버튼 클릭 시 한두 줄 정도로 어떤 명령인지 보여 주기

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/988730c5-384e-4de3-a958-40f95cbf1038/Untitled.png)

    - drop-down 형식이나 버튼을 화면 크기 형태로 길게 (서랍 형식)
    - GIT BASH 버튼 클릭 시 터미널 노출 → 설명 한국어

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a75524e6-e0c9-432a-8e87-4a8c134d6315/Untitled.png)
    
    

## 2022-10-20

## 컨설턴트님 팀 미팅 내용

- 의도는 명확하게 오지만 수정이 필요

- 파일 목록 관리가 필요하다

  - 누가 언제 어디서 무슨 정보를 push했는지가 서버 입장에서 필요

  - git history에서 log를 못 들고 오기 때문에 git commit message를 가져올 수가 없음 (최신 20건 정도만 롤백 가능)

    - push 하는 시점에 어딘가에 데이터를 추가로 저장 필요/이력 관리
      - MongoDB 같은 곳에 그 시점의 push log 보관 (보여 주기 위한 log를 어떻게 저장할 것인가)
      - 로컬 커밋 메시지는 로컬만 가지고 있어도 됨
      - ‘너무 오래돼서 지원되지 않는다~’
    - 이력 관리가 중요… 그래야 파일 관리도 가능
    - 깃 크라켄도 log limit이 있을 것 → 아니라면 데스크탑 자체나 그런 데서 보관하고 있을 듯

  - tree 구조: 파일 위치가 어디인지, 파일을 어디에서 수정해야 하는지를 궁금해함

    - 언제 누가 어느 시점에 push 했는지에 대한 정보가 필요
      - 뒷단에서 thread로 버전 매칭하는 방법도 있음 (알림 정도만 띄워 주기)
      - branch 단위로 관리
      - 수정할 때마다 다 알려 줄 수 없으니까
    - 사용자용 script, description이 필요 → 바로 설명 추가할 수 있는 기능이 있어야 됨

    예) 00 data와 연동되는 JPA, object, dao, dto, controller 등등 설명이 있어야 함  → 사용자가 mapping 해 주는 UI 필요 / 한번에 여러 개의 파일을 할 수 있게

    - 일종의 해시태그 → 내가 작업한 파일이 아닌데 손을 대야 하는 경우
    - ‘이것을 왜 해야 되는지에 대한 분명한 목적’
    - **서치 가능(선호님)**
    - 개발자는 어떤 파일에 무슨 기능이 있는지 알고 있지만 다른 사람은 알 수 없기 때문

  - commit message 보다는 code convention이 더 중요한 문제 (convention이라는 용어를 사용했을 때)

    - 코드 포맷터 → 내가 쓴 코드를 format 형식에 맞게 convert 해서 다른 사람들에게 보여 줌

    예) 줄 바꿈, 중괄호 개수

    - 수십, 수백이 개발해도 한 명이 한 것 같은 consensus가 갖추어진 코드

  - prefix set, commit message rule

  - 메시지 단위로 code version이 명시가 되어야 한다

    예) user controller가 언제/누가/몇 번의/push가 있었는지

    - git은 최신 20여 개(fix 아님)를 가지고 있음 → 실제 파일 로딩 가능
    - 이력은 존재하나 실제 파일은 git에서 지원해 주지 않아 볼 수 없습니다

  [![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46bd6bf3-7d64-4a53-96d5-1c74dcdd7271/Untitled.png)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46bd6bf3-7d64-4a53-96d5-1c74dcdd7271/Untitled.png)

  - push된 쪽에 push version 표기와 왼쪽 tree 구조에도 (클릭 시) 버전이 표기되어야 함
    - 버전을 언제 fetch를 받을 것인지
    - 최신화시키기 위해서 데스크탑 켜졌을 때 버전 체크 필요
    - 자동 fetch는 최악
      - 변경된 최신 버전이 있는데 확인하시겠냐는 메시지 (거절 가능하게)

  [![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/10527a39-41c1-4def-b7d1-bcb95438e652/Untitled.png)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/10527a39-41c1-4def-b7d1-bcb95438e652/Untitled.png)

  - commit 누르는 순간 local에서 remote로 UI가 부드럽게 화면이 전환되는 느낌
  - 이 콘셉트 자체를 계속 가져가기 (샤샤샥 넘기기)
    - tree 구조 조금 더 상세하게 보여 주기
  - 누가 언제 무엇을 개발할지에 대해서 명확한 기준점/일정표 필요
    - 스스로 빡세게 꼭 다 만들기 (믿는다)
    - 기능 명세서 반드시 필요
  - git flow에 대한 설명이 필요 (branch)
    - backup과 branch는 성격이 다르다
    - 마이너 업데이트: branch (패치)
    - 메이저 업데이트: 새로운 master
    - branch가 많을 필요가 없음
  - 기능들을 어떻게 잘 녹여 낼 것인지, 오픈소스들 어떻게 분석해서 가져다 쓸 것인지…
  - git CLI에 에러 처리도 보여 주기
  - 정말 초보자를 위한 것이라면 툴팁 필요 → 영어..에 대한 설명이 필요
    - 구현할 경우 튜토리얼 필요 없음
    - hover로 설명을 노출하는 것도 설명이 필요..
    - 명시적으로 tool tip에 몰아넣는 것도 중요
  - github 외 연동할 수 있는 사이트들 알려 주기
    - 깃 프로토콜 사용할 수 있는 사이트가 많다
    - 아틀라시안 회사에서 밀고 있는 배포 툴 뱀부(↔ 젠킨스) → 얘도 깃 프로토콜 사용
    - 빗버킷, 깃랩(고사양 요구, api O), 깃티(저사양, api O) 등등.. **(주말에 조사)**
  - 튜토리얼 모드 → 깃허브 데스크탑처럼 사용법을 자연스럽게 알려줄 수 있는 기능 있으면 좋을듯
    - 예쁜데 큰 쓸모는 X
  - 팀을 갈아넣으면 electron으로 개발 충분히 가능하다
    - exe, msi 파일
    - 단, 이력 관리 위한(캡처해 줄) MongoDB 같은 서버가 필요
  - 오픈 소스로서 방점을 찍는 작업: 마이크로사이트
    - 메인 페이지에 document 있는 소개 사이트
    - 최종 릴리즈 버전 다운받을 수 있게 하는 간단한 사이트 (별도의 비용 X)
    - 깃허브 블로그 활용하는 방법이 있다 → 도메인 비용

----

## 2022-10-21

## 오늘 한 일

1. 컨설턴트님 피드백 반영하여 와이어프레임 수정
   - 굉장히 많은 시간이 소요되었다
2. 기능 명세서 작성
3. 중간 발표 준비
4. 팀 미팅 및 중간 보고
5. 팀과 서비스 이름 정하기
6. 주말 동안 해 올 일 생각하기

----
