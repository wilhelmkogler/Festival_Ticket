import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, AlignLeft, X, User } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-md transition font-semibold ${
    isActive ? "bg-black text-white" : "text-black hover:text-vilagos"
  }`;

function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ✅ Asztali navigáció */}
      <div className="hidden lg:flex justify-center">
        <div className="bg-white rounded-full px-4 py-1 mt-4 flex items-center gap-4 shadow-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-2 px-4 rounded-full text-black font-semibold text-md ${
                isActive ? "bg-black text-white" : "hover:text-vilagos"
              }`
            }
          >
            LOGO
          </NavLink>

          <NavLink to="/festivals" className={navLinkClass}>
            Festivals
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Prices
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/delivery" className={navLinkClass}>
            Account
          </NavLink>

          <button
            onClick={toggleDarkMode}
            className="px-2 py-4 rounded-full text-black transition hover:text-vilagos"
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
          LOGO
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
            Festivals
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
