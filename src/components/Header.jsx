import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col justify-stretch">
      <div
        id="navbar"
        className="text-xl text-white font-nicer font-semibold flex justify-between items-center px-8 py-2 relative"
      >
        <div id="left" className="w-2/4 flex justify-center">
          <Link to="/">
            FESTIVAL
          </Link>
        </div>

        <div className="hidden lg:flex w-2/4 justify-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="relative group">
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/#menu" className="relative group">
              Menu
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/#restaurant" className="relative group">
              Restaurant
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/delivery"
              className="bg-zold py-2 px-4 rounded-xl transition-all duration-500 hover:bg-white hover:text-black"
            >
              Delivery
            </Link>
          </div>
        </div>

        <div className="lg:hidden w-2/4 flex justify-end">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={2} /> : <Menu size={42} />}
          </button>
        </div>

        <div
          className={`fixed top-0 right-0 h-[300px] w-[300px] rounded-xl z-50 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="bg-orange-950 border-4 rounded-3xl flex flex-col items-center justify-center h-full gap-8 p-8 text-lg relative">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={32} />
            </button>

            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/#menu" onClick={() => setMenuOpen(false)}>
              Menu
            </Link>
            <Link to="/#restaurant" onClick={() => setMenuOpen(false)}>
              Restaurant
            </Link>
            <Link
              to="/delivery"
              className="bg-zold py-2 px-4 rounded-xl transition-all duration-500"
              onClick={() => setMenuOpen(false)}
            >
              Delivery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;