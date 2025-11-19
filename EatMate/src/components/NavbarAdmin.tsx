import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

interface NavbarAdminProps {
  onLogout: () => void;
}

const NavbarAdmin: React.FC<NavbarAdminProps> = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();         
    navigate("/");      
  };

  return (
    <nav className="flex items-center justify-between h-20 px-4 md:px-10 bg-black shadow-md fixed w-full top-0 z-50">
      <Link to="/" className="font-bold text-xl text-red-600">EatMate</Link>

      <div className="hidden md:flex space-x-8 items-center">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white font-semibold"
          >
            Admin
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 max-w-[90vw] bg-black/95 rounded-lg shadow-xl border border-red-500/30">
              <Link to="/restaurantadmin" className="block px-4 py-3 text-white hover:bg-red-600">
                 Restaurant Admin
              </Link>
              <Link to="/partyadmin" className="block px-4 py-3 text-white hover:bg-red-600">
                 Party Admin
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-white font-semibold text-lg"
        >
          <GiHamburgerMenu />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-20 right-4 w-48 bg-black/95 rounded-lg shadow-xl flex flex-col border border-red-500/30">
            <Link to="/restaurantadmin" className="block px-4 py-3 text-white hover:bg-red-600">
               Restaurant Admin
            </Link>
            <Link to="/partyadmin" className="block px-4 py-3 text-white hover:bg-red-600">
               Party Admin
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-white hover:bg-red-600"
            >
               Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarAdmin;
