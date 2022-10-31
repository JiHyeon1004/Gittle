import { Link, Route, Routes, useLocation } from "react-router-dom";
import Main from "./Pages/MainPage";
import Add from "./Pages/AddPage";

function App() {
  const location = useLocation();
  return (
    <div>
      <Link to="/main">main</Link> | <Link to="/add">add</Link>
      <Routes location={location}>
        <Route path="/main" element={<Main />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
