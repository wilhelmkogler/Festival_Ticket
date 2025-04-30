import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";


export default function App() {
  return (
    <Router>
      

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>

      <Footer />
    </Router>
  );
}
