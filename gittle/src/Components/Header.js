import React from "react";
import {Link} from 'react-router-dom'

function Header(){
    return(
        <div>
            <Link to='/second'>Second!!</Link>
        </div>
    )
}

export default Header;