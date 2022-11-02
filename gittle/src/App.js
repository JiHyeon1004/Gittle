import { Link, Route, Routes, useLocation } from "react-router-dom";
<<<<<<< HEAD
import Main from "./Pages/MainPage";
import Add from "./Pages/AddPage";
import Oauth from "./Pages/OauthPage";
import React from "react";
import Log from "./Pages/LogPage";
import "./App.css";
=======
import Main from "./pages/MainPage";
import Add from "./pages/AddPage";
>>>>>>> af0975c39be4b45ac19ba1f6a0980f4377dd8c0e

function App() {
  const location = useLocation();





  return (
    <div className="App">
      <Link to="/main">main</Link> | <Link to="/add">add</Link> | <Link to="/oauth">oauth</Link> |{" "}
      <Link to="/log">log</Link>
      <Routes location={location}>
        <Route path="/main" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/log" element={<Log />} />
      </Routes>

    </div>
  );
}

export default App;
