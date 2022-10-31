import {Link} from 'react-router-dom'
import  './CSS/Main.css'

const main = ()=>{
    return (
        <>
        
        <Link to='/first'>First!</Link>
        <div className='logo'>
            <p>main입니다</p>
        </div>
        <div className='buttons'>
            <p>버튼입니다</p>
        </div>
        <div className='recent'>
            <p>최근입니다</p>
        </div>
        </>
    )
}

export default main;