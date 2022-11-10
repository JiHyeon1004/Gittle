import { Route, Routes, useLocation } from "react-router-dom";

import Main from "./pages/MainPage";
import Add from "./pages/AddPage";
import React from "react";
import Log from "./pages/LogPage";
import MergeReady from "./pages/MergeReadyPage";
import Push from "./pages/GitPush"
import Merge from "./pages/MergePage";
import Header from "./components/common/header/Header";
import SideBar from "./components/common/sidebar/SideBar";

import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Popper from "popper.js";

function App() {
  // const location = useLocation();

  return (
    <>
      <Header />
      <div className="App">
        <SideBar />
        {/* <Routes location={location}> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
          <Route path="/log" element={<Log />} />
          <Route path="/merge" element={<MergeReady />} />
          <Route path="/push" element={<Push/>}/>
          <Route path="/merge/ready" element={<MergeReady />} />
          <Route path="/merge" element={<Merge />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
