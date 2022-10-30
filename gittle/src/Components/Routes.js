import React from "react";
import { BrowserRouter as Router , Route, Routes,Link } from "react-router-dom";
import First from '../Screens/First'
import Second from '../Screens/Second'
import Third from '../Screens/Third'
import MainPage from './Main/MainPage'
// import Header from "./Header";

const routers = () =>(
    <Router>
        <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path='/first' element={<First/>}></Route>
            <Route path="/second" element={<Second/>}></Route>
            <Route path="/third" element={<Third/>}></Route>
        </Routes>
    </Router>
)


export default routers;