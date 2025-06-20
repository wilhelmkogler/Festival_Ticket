import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, AlignLeft, X, User } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-md transition hover:scale-110 ${
    isActive ? "underline font-bold" : ""
  }`;

function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      {/* ✅ Asztali navigáció */}
      <div className="hidden lg:flex absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className={`${
            darkMode ? "bg-sotet text-white" : "bg-white text-black"
          } rounded-full px-4 py-2 mt-4 flex items-center gap-4 shadow-md justify-between`}
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

          <NavLink to="/festivals" className={navLinkClass}>Browse</NavLink>
          <NavLink to="/prices" className={navLinkClass}>Prices</NavLink>
          <NavLink to="/cities" className={navLinkClass}>Locations</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/account" className={navLinkClass}>Account</NavLink>

          <button
            onClick={toggleDarkMode}
            className="px-2 py-2 rounded-full transition hover:scale-110"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobil menü ikonok */}
      <div className="lg:hidden flex justify-between items-center px-4 py-4">
        <button onClick={() => setMenuOpen(true)}>
          <AlignLeft size={30} className={darkMode ? "text-white" : "text-black"} />
        </button>

        <NavLink to="/" className={darkMode ? "text-white" : "text-black"}>
          <img className="w-100 h-10 rounded-full object-contain" src="img/logo2.png" alt="Logo" />
        </NavLink>

        <button onClick={() => setLoginOpen(true)}>
          <User size={30} className={darkMode ? "text-white" : "text-black"} />
        </button>
      </div>

      {/* ✅ Mobil navigációs menü - BALRÓL JOBBRA */}
      <div
        className={`fixed top-0 left-0 h-full w-full z-50 transform transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${darkMode ? "/img/walld.png" : "/img/wall.png"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <X size={30} className={darkMode ? "text-white" : "text-black"} />
          </button>
        </div>
        <nav className={`${
          darkMode ? "text-white" : "text-black"
        } flex flex-col items-center gap-6 mt-10 text-lg font-semibold`}>
          <NavLink to="/festivals" className={navLinkClass} onClick={() => setMenuOpen(false)}>Browse</NavLink>
          <NavLink to="/prices" className={navLinkClass} onClick={() => setMenuOpen(false)}>Prices</NavLink>
          <NavLink to="/cities" className={navLinkClass} onClick={() => setMenuOpen(false)}>Locations</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/account" className={navLinkClass} onClick={() => setMenuOpen(false)}>Account</NavLink>
          <button onClick={toggleDarkMode} className="mt-4 px-4 py-2 rounded-full">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>

      {/* ✅ Mobil login/register panel - JOBBRÓL BALRA */}
      <div
        className={`fixed top-0 right-0 h-full w-full z-50 transform transition-all duration-300 ease-in-out ${
          loginOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${darkMode ? "/img/walld.png" : "/img/wall.png"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setLoginOpen(false)}>
            <X size={30} className={darkMode ? "text-white" : "text-black"} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center px-8 mt-20">
          <h2 className="text-2xl font-bold mb-4">Login or Register</h2>
          <input type="text" placeholder="Email" className="mb-4 px-4 py-2 rounded-xl w-full max-w-md" />
          <input type="password" placeholder="Password" className="mb-4 px-4 py-2 rounded-xl w-full max-w-md" />
          <button className="bg-blue-600 text-white py-2 px-6 rounded-xl">Continue</button>
        </div>
      </div>
    </>
  );
}

export default Header;
