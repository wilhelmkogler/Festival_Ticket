import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Festivals from "./pages/Festivals";


export default function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkMode ? "/img/walld.png" : "/img/wall.png"})`;
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  return (

    <Router>
    {/* FIXED full-screen background */}
    <div
      className={`fixed top-0 left-0 w-full h-full -z-10 bg-cover bg-center transition-all duration-300`}
      style={{
        backgroundImage: `url(${darkMode ? "/img/walld.png" : "/img/wall.png"})`,
        backgroundAttachment: "fixed"
      }}
    ></div>

    {/* Main content */}
    <div className="relative z-10 min-h-screen flex flex-col">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/festivals" element={<Festivals darkMode={darkMode}/>} />
          <Route path="/about" element={<About darkMode={darkMode}/>} />
          
        </Routes>
      </main>
      <Footer darkMode={darkMode}/>
    </div>
  </Router>
    
  );
}
