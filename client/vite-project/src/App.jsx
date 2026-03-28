import { useState, useEffect } from "react";
import EScoreboard from "./Components/Scoreboard-update.jsx";
import AdminLogin from "./Components/admin-login.jsx";
import Scoreboard from "./Components/Scoreboard.jsx";
import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";
function App() {
  const [token,settoken]=useState(
    localStorage.getItem("token")
  );
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Scoreboard/>}/>
      <Route
      path="/admin"
      element={token?<EScoreboard/>:<Navigate to="/login" replace/>}
      />
      <Route path="/login"
      element={<AdminLogin setToken={settoken}/>}
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;