import { NavLink, Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer({ darkMode, toggleDarkMode }) {
  return (
    <footer>
    <div className={`${darkMode ? "text-white" : "text-black"} py-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 lg:gap-8`}>
      {/* Logo + leírás */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center gap-4">
        <div className="text-2xl font-bold">LOGO</div>
        <p className="text-sm text-justify">
          Motto
        </p>

        
      </div>

      {/* Navigációs linkek */}
      <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-center justify-center gap-6 text-md">
        
        <NavLink to="/festival" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>Browse</NavLink>
        <NavLink to="/menu" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>Prices</NavLink>
        <NavLink to="/about" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>About</NavLink>
        <NavLink to="/contact" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>Contact</NavLink>
        <NavLink to="/delivery" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>Account</NavLink>
      </div>

      {/* Közösségi média ikonok */}
      <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
        <div className="flex gap-4">
          <a href="#" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>
            <Facebook />
          </a>
          <a href="#" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>
            <Instagram />
          </a>
          <a href="#" className={`${darkMode ? "hover:text-black" : "hover:text-white"} transition-all duration-500`}>
            <Twitter />
          </a>
        </div>
      </div>
    </div>
    {/* Alsó rész – jogi szöveg */}
    <div className={`${darkMode ? "text-white" : "text-black"} py-4 text-sm text-center`}>
      © {new Date().getFullYear()} FestivalApp. All rights reserved.
    </div>
  </footer>
  );
}

export default Footer;