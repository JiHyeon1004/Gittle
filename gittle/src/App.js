import { Link, Route, Routes, useLocation } from "react-router-dom";
import Main from "./Pages/MainPage";
import Add from "./Pages/AddPage";
import Oauth from "./Pages/OauthPage";
import React from "react";
import Log from "./Pages/LogPage";
import MergeReady from "./pages/MergeReadyPage";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Link to="/main">main</Link> | <Link to="/add">add</Link> |{" "}
      <Link to="/oauth">oauth</Link> | <Link to="/log">log</Link> |{" "}
      <Link to="/merge">merge</Link>
      <Routes location={location}>
        <Route path="/main" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/log" element={<Log />} />
        <Route path="/merge" element={<MergeReady />} />
      </Routes>
    </div>
  );
}

export default App;
