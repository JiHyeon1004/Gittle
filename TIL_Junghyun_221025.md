# 2022-10-24

## 리액트 학습

### CSR (클라이언트 사이드 렌더링)

- 리액트의 시작 ⇒ **index.js**
  - root에 첫 번째로 렌더링되는 것은 App
    - **App.js** ⇒ 시작 포인트

### JSX 문법 정리

- html과 유사
- **html과 다른 점**
  1. 꼭 하나의 태그만 반환해야 한다.
     - 부모 태그로 감싸주기!
     - 텅 빈 태그로 감싸줘도 된다 (`<> </>`)
  2. class 대신 **`className=''`**
     - `<h1 **className='orange'**>Hello</h1>`
  3. javascript 코드 사용이 가능하다.

     - 중괄호 사용할 것

     - 태그 내에서 style을 입힐 때 중괄호를 두 쌍 사용한다.
       - `style=**{{** width: ‘200px’, height: ‘200px’ **}}**`
     - 일반 문자열 안에 변수를 넣을 때

     - 반복되는 태그를 사용할 때

     - html to jsx

     [HTML to JSX](https://transform.tools/html-to-jsx)

### 컴포넌트 만드는 꿀팁

- 컴포넌트일 때는 js 파일보다 jsx 파일로 명시하는 것이 좋다.
- src/components 폴더 안에 넣어준다.
- 다음 두 코드는 똑같이 동작한다.

```jsx
function Profile() {
  return <h1>profile</h1>;
}

export default Profile;
```

```jsx
export default function Profile() {
  return <h1>profile</h1>;
}
```

- rfc를 치고 엔터를 치면 기본적인 틀을 완성시켜준다.

### props 사용해보기

컴포넌트의 내용을 개별로 바꿔서 사용해야 할 때

- 부모 요소
  ```jsx
  function AddProfile() {
    return (
      <>
        <Profile image="a" name="aa" title="aaa" />
        <Profile image="b" name="bb" title="bbb" />
      </>
    );
  }
  ```
- 컴포넌트
  ```jsx
  export default function Profile(**props**) {
  	return (
  		<div>
  			<img
  				src={**props.image**}
  			/>
  			<h1>{**props.name**}</h1>
  			<p>{**props.title**}</p>
  		</div>
  	)
  }
  ```
  또는
  ```jsx
  export default function Profile({ **image, name, title** }) {
  	return (
  		<div>
  			<img
  				src={**image**}
  			/>
  			<h1>{**name**}</h1>
  			<p>{**title**}</p>
  		</div>
  	)
  }
  ```
- if 문이 true일 때만 특정 요소가 보이게
  ```jsx
  export default function Profile({ image, name, title, **isNew** }) {
  	return (
  		<div>
  			<img
  				src={image}
  			/>
  			**{ isNew && <span>New</span> }**
  			<h1>{name}</h1>
  			<p>{title}</p>
  		</div>
  	)
  }
  ```
- 컴포넌트를 요소로 사용할 때 (반복 사용)
  - Avartar.jsx
    ```jsx
    export default function Avartar({ image, isNew }) {
      return (
        <div>
          <img src={image} />
          **{isNew && <span>New</span>}**
        </div>
      );
    }
    ```
  - Profile.jsx
    ```jsx
    export default function Profile({ image, name, title, ****isNew }) {
    	return (
    		<div>
    			<Avartar image={image} isNew={isNew} />
    			<h1>{name}</h1>
    			<p>{title}</p>
    		</div>
    	)
    }
    ```

### Event 처리하기

- javascript랑 똑같음
- 특정 이벤트가 발생했을 때 실행할 함수를 중괄호 안에 넣어주기
  - 이 때, 함수의 반환값이 아닌 함수 자체를 실행하도록 하기!

### 내부 상태관리 State

- UI와 밀접한 관련이 있는 요소는 state로 관리해줘야 한다.
  ⇒ **useState**
- **useState**
  - 변경이 가능한 값 return
  - 초기값을 지정해서 전달
  - `const [count, setCount] = useState(0)`
    - 초기값은 count에 저장된다.
    - 값의 update는 setCount를 통해서 한다.
      - `setCount(count + 1)`
      - count가 변경될 때마다(setCount가 실행될 때마다) 리액트 내부적으로 count가 속한 함수를 다시 실행시킨다.

### useEffect 생애주기

- 딱 한번만 네트워크 요청을 보내고 싶을 때 (fetch)
- `useEffect(() ⇒ {콜백함수}, [dependency])`
  - `useEffect(() ⇒ {콜백함수}, [])` : 컴포넌트가 처음 보여질 때만 콜백함수 호출
  - `useEffect(() ⇒ {…return () ⇒ {}}, [])` : 컴포넌트가 unmounted 될 때 반환 값에 있는 콜백함수 호출
