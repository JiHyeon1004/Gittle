// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

//컴포넌트
//무조건 앞은 대문자
function Header(props){
  return(
    <header>
        <h1><a href='/' onClick={(event)=>{
          event.preventDefault()
          props.onChangeMode()
        }}>{props.title}</a></h1>
    </header>
  )
}



function Nav(props){
  const list=[]
  for(let i=0;i<props.topics.length; i++){
    let t=props.topics[i];
    list.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      event.preventDefault()
      
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return(
    <nav>
        <ol>
          {list}
        </ol>
      </nav>
  )
}

function Article(props){
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault()
        const title =event.target.title.value
        const body = event.target.body.value
        props.onCreate(title,body)
      }}>
        <p><input name="title" placeholder='title'></input></p>
        <p><textarea name="body" placeholder='body'></textarea></p> 
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article>
  )
}

function Update(props){
  const [title,setTitle]=useState(props.title)
  const [body,setBody]=useState(props.body)
  return(
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault()
        const title =event.target.title.value
        const body = event.target.body.value
        props.onUpdate(title,body)
      }}>
        <p><input name="title" placeholder='title' value={title} onChange={event=>{

          setTitle(event.target.value)
          //onChange는 값을 바꿀때마다 호출한다!
        }}></input></p>
        <p><textarea name="body" placeholder='body' value={body} onChange={event=>{

          setBody(event.target.value)
          //onChange는 값을 바꿀때마다 호출한다!
        }}></textarea></p> 
        <p><input type="submit" value="Update"></input></p>
      </form>
    </article>
  )
}

function App() {

  const [nextId,setNextId]=useState(4)
  const [topics,setTopics]=useState([
    {id:1, title:'html', body:'my html'},
    {id:2, title:'css', body:'my css'},
    {id:3, title:'javascript', body:'my javascript'}
  ])


  //const mode = useState('WELCOME');
  const [mode,setMode] = useState('WELCOME')
  const [id,setId] = useState(null)

  let content = null;
  let title,body=null;
  let contextControl=null;
  if(mode ==='WELCOME'){
    content=<Article title="WELCOME" body="Hello, WEB"></Article>
  }else if(mode ==='READ'){
    for(let i=0;i<topics.length;i++){
      
      if(topics[i].id === id){
        title=topics[i].title;
        body=topics[i].body;
      }
    }


    content=<Article title={title} body={body}></Article>
    contextControl=<><li><a href={'/update/'+id} onClick={(event)=>{
      event.preventDefault()
      setMode('UPDATE')
    }}>UPDATE</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics=[]
      for(let i=0;i<topics.length;i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i])
        }
      }
      setTopics(newTopics)
      setMode('WELCOME')
    }}></input></li>
    </> 
  }else if(mode ==='CREATE'){
    content=<Create onCreate={(title,body)=>{
      const newTopic = {id:nextId,title:title,body:body}
      const newTopics=[...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setId(nextId)
      setNextId(nextId+1)
      setMode('READ')
    }}></Create>


  }else if(mode ==='UPDATE'){
    let title,body=null;
    for(let i=0;i<topics.length;i++){
      
      if(topics[i].id === id){
        title=topics[i].title;
        body=topics[i].body;
      }
    }
    content=<Update title={title} body={body} onUpdate={(title,body)=>{
      const updatedTopic = {id:id , title:title, body:body}
      const newTopics=[...topics]
      for(let i=0;i<newTopics.length;i++){
        if(newTopics[i].id === id){
          newTopics[i]=updatedTopic
          break;
        }
      }
      // newTopics[id]=updatedTopic

      setTopics(newTopics)
      setMode('READ')
    }}></Update>
  }



  return (
    <div className="App">
      <Header title="REACT" onChangeMode={()=>{
        // mode = 'WELCOME'
        setMode('WELCOME')
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        // mode = 'READ'
        setMode('READ')
        setId(_id)
      }}></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={(event)=>{
          event.preventDefault()
          setMode('CREATE')
        }}>CREATE</a></li>
       {contextControl}
      </ul>
      
    </div>
  );
}

export default App;
