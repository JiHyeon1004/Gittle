import { Route, Routes, useLocation } from "react-router-dom";

import Main from "./pages/MainPage";
import Add from "./pages/AddPage";
import React from "react";
import Log from "./pages/LogPage";
import MergeReady from "./pages/MergeReadyPage";
import Push from "./pages/GitPush";
import Merge from "./pages/MergePage";
import Header from "./components/common/header/Header";
import SideBar from "./components/common/sidebar/SideBar";
import MergeRequestList from "./pages/MergeRequestListPage";
import MergeDetail from "./pages/MergeDetailPage";
import Graph from "./pages/GraphPage";

import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Popper from "popper.js";

function App() {
  // const location = useLocation();

  return (
    <>
      <div className="container-padding">
        <Header />
        <div className="App">
          <div className="sidebar">
            <SideBar />
          </div>
          {/* <Routes location={location}> */}
          <div className="routes">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/add" element={<Add />} />
              <Route path="/log" element={<Log />} />
              <Route path="/push" element={<Push />} />
              <Route path="/merge/ready" element={<MergeReady />} />
              <Route path="/merge" element={<Merge />} />
              <Route path="/merge/request" element={<MergeRequestList />} />
              <Route path="/merge/detail" element={<MergeDetail />} />
              <Route path="/graph" element={<Graph />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
