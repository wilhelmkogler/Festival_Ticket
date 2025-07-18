import { NavLink, Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer({ darkMode, toggleDarkMode }) {
  return (
    <footer>
      <div
        className={`${
          darkMode ? "text-white" : "text-black"
        } py-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 lg:gap-8`}
      >
        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center gap-4">
          <img
            className="w-20 h-20 rounded-full object-contain"
            src="img/logo2.png"
            alt="Logo"
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-center justify-center gap-6 text-md font-bold">
          <NavLink
            to="/festivals"
            className={`${
              darkMode ? "hover:text-lila" : "hover:text-white"
            } transition-all duration-100`}
          >
            Browse
          </NavLink>
          <NavLink
            to="/prices"
            className={`${
              darkMode ? "hover:text-lila" : "hover:text-white"
            } transition-all duration-100`}
          >
            Prices
          </NavLink>
          <NavLink
            to="/cities"
            className={`${
              darkMode ? "hover:text-lila" : "hover:text-white"
            } transition-all duration-100`}
          >
            Locations
          </NavLink>
          <NavLink
            to="/about"
            className={`${
              darkMode ? "hover:text-lila" : "hover:text-white"
            } transition-all duration-100`}
          >
            Questions
          </NavLink>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className={`${
                darkMode ? "hover:text-lila" : "hover:text-white"
              } transition-all duration-100`}
            >
              <Facebook />
            </a>
            <a
              href="#"
              className={`${
                darkMode ? "hover:text-lila" : "hover:text-white"
              } transition-all duration-100`}
            >
              <Instagram />
            </a>
            <a
              href="#"
              className={`${
                darkMode ? "hover:text-lila" : "hover:text-white"
              } transition-all duration-100`}
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`${
          darkMode ? "text-white" : "text-black"
        } py-4 text-sm text-center`}
      >
        © {new Date().getFullYear()} Festival. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
