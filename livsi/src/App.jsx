import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Photographer from "./pages/Photographer";
import Result from "./pages/Result"; 
import "./App.css";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/photographer" element={<Photographer />} /> 
        <Route path="/result" element={<Result />} /> 
      </Routes>
    </div>
  );
}

export default App;
