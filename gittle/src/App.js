import { Link, Route, Routes, useLocation } from "react-router-dom";
import Main from "./Pages/MainPage";
import Add from "./Pages/AddPage";
import Oauth from "./Pages/OauthPage";
import React from "react";


function App() {
  const location = useLocation();





  return (
    <div>
      <Link to="/main">main</Link> | <Link to="/add">add</Link> | <Link to="/oauth">oauth</Link>
      <Routes location={location}>
        <Route path="/main" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/oauth" element={<Oauth />} />
      </Routes>




    </div>
  );
}

export default App;
