import { Route, Routes, useLocation } from "react-router-dom";

import Main from "./pages/MainPage";
import Add from "./pages/AddPage";
import React from "react";
import Log from "./pages/LogPage";
import MergeReady from "./pages/MergeReadyPage";
import Header from "./components/common/header/Header";
import SideBar from "./components/common/sidebar/SideBar";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="App">
        <SideBar />
        <Routes location={location}>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
          <Route path="/log" element={<Log />} />
          <Route path="/merge" element={<MergeReady />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
