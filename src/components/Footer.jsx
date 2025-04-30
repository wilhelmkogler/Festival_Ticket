import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-gray-300 py-4 font-nicer">
      <div className="max-w-6xl mx-auto px-32 lg:px-4 flex flex-row md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col justify-center gap-4 lg:gap-8">
          

          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Festival. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 text-sm">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-white transition">
            Menu
          </Link>
          <Link to="/restaurant" className="hover:text-white transition">
            Restaurant
          </Link>
          <Link to="/delivery" className="hover:text-white transition">
            Delivery
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;