import { Link, Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/MainPage";
import Add from "./pages/AddPage";
import Log from "./pages/LogPage";
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Link to="/main">main</Link> | <Link to="/add">add</Link> |{" "}
      <Link to="/log">log</Link>
      <Routes location={location}>
        <Route path="/main" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </div>
  );
}

export default App;
