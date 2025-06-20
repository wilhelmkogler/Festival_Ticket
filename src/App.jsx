import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Festivals from "./pages/Festivals";
import FestivalPage from "./pages/FestivalPage";
import Checkout from "./pages/Checkout";
import Summary from "./pages/Summary";
import Prices from "./pages/Prices";
import Cities from "./pages/Cities";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${
      darkMode ? "/img/walld.png" : "/img/wall.png"
    })`;
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  return (
    <Router>
      <div
        className={`fixed top-0 left-0 w-full h-full -z-10 bg-cover bg-center transition-all duration-300`}
        style={{
          backgroundImage: `url(${
            darkMode ? "/img/walld.png" : "/img/wall.png"
          })`,
          backgroundAttachment: "fixed",
        }}
      ></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/prices" element={<Prices darkMode={darkMode} />} />
            <Route path="/cities" element={<Cities darkMode={darkMode} />} />
            <Route path="/about" element={<About darkMode={darkMode} />} />
            <Route
              path="/festivals"
              element={
                <Festivals
                  darkMode={darkMode}
                  setSelectedFestival={setSelectedFestival}
                />
              }
            />
            <Route
              path="/festival_details"
              element={
                <FestivalPage
                  selectedFestival={selectedFestival}
                  darkMode={darkMode}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
            <Route
              path="/checkout"
              
              element={<Checkout cart={cart}
              setCart={setCart} darkMode={darkMode} />}
            />
            <Route
              path="/summary"
              
              element={<Summary darkMode={darkMode} />}
            />
          </Routes>
        </main>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}
