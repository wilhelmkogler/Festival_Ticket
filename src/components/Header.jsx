import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, AlignLeft, X, User } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-md transition font-semibold ${
    isActive ? "bg-sotet text-white" : ""
  }`;

function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ✅ Asztali navigáció */}
      <div className="hidden lg:flex absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className={`${
            darkMode ? "bg-sotet text-white" : "bg-white text-black"
          } rounded-full px-4 py-2 mt-4 flex items-center gap-4 shadow-md  justify-between`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center justify-center w-12 h-12 rounded-full ${
                isActive ? "bg-sotet text-white" : "hover:text-vilagos"
              }`
            }
          >
            <img
              className="w-30 h-30 rounded-full object-contain"
              src="img/logo2.png"
              alt="Logo"
            />
          </NavLink>

          <NavLink to="/festivals" className={navLinkClass}>
            Browse
          </NavLink>
          <NavLink to="/prices" className={navLinkClass}>
            Prices
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/account" className={navLinkClass}>
            Account
          </NavLink>

          <button
            onClick={toggleDarkMode}
            className="px-2 py-2 rounded-full transition hover:text-vilagos"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobil menü ikon */}
      <div className="lg:hidden flex justify-between items-center px-4 py-4">
        <button onClick={() => setMenuOpen(true)}>
          <AlignLeft
            size={30}
            className={`${darkMode ? "text-white" : "text-black"} `}
          />
        </button>

        <NavLink
          to="/"
          className={`${
            darkMode ? "text-white" : "text-black"
          } text-xl font-bold`}
        >
          <img
              className="w-100 h-10 rounded-full object-contain"
              src="img/logo2.png"
              alt="Logo"
            />
        </NavLink>

        <button onClick={() => setMenuOpen(true)}>
          <User
            size={30}
            className={`${darkMode ? "text-white" : "text-black"} `}
          />
        </button>
      </div>

      {/* ✅ Mobil oldalsó menü */}
      <div
        className={`fixed top-0 right-0 h-full w-full z-50 transform transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${
            darkMode ? "/img/walld.png" : "/img/wall.png"
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <X
              size={30}
              className={`${darkMode ? "text-white" : "text-black"} `}
            />
          </button>
        </div>
        <nav
          className={`${
            darkMode ? "text-white" : "text-black"
          } flex flex-col items-center gap-6 mt-10 text-lg font-semibold`}
        >
          <NavLink
            to="/festivals"
            className={`${
              darkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-full text-lg transition font-semibold`}
            onClick={() => setMenuOpen(false)}
          >
            Browse
          </NavLink>
          <NavLink
            to="/menu"
            className={`${
              darkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-full text-lg transition font-semibold`}
            onClick={() => setMenuOpen(false)}
          >
            Prices
          </NavLink>
          <NavLink
            to="/about"
            className={`${
              darkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-full text-lg transition font-semibold`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={`${
              darkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-full text-lg transition font-semibold`}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/delivery"
            className={`${
              darkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-full text-lg transition font-semibold`}
            onClick={() => setMenuOpen(false)}
          >
            Account
          </NavLink>

          <button
            onClick={toggleDarkMode}
            className="mt-4 px-4 py-2 rounded-full"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </>
  );
}

export default Header;
