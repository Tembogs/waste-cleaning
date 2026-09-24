import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Zip from "./collector/Zip";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Houser from "./houser/Houser";
import CollectorDashboard from "./collector/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        
        <Route path="/houser" element={<Houser />} />
        <Route path="/collector" element={<CollectorDashboard/>} />
        <Route path="/zip" element={<Zip />} />
      </Routes>
    </Router>
  );
}

export default App;