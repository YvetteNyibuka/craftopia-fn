import { FaBell, FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar }: TopbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-md fixed w-full h-16 flex justify-between items-center px-4 z-50 border-b border-warmGray-200">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger menu */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <FaBars className="w-5 h-5 text-craft-700" />
        </button>

        <div className="text-lg lg:text-xl font-semibold text-craft-700">
          Craftopia Admin
        </div>
      </div>

      <div className="flex space-x-2 lg:space-x-4 items-center">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-md transition-colors">
          <FaBell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            3
          </span>
        </button>

        {/* User avatar and logout */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-craft-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:bg-craft-700 transition-colors"
          >
            {user?.firstName?.[0]?.toUpperCase() || "A"}
          </button>

          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
              isDropdownOpen
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-95 pointer-events-none"
            }`}
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
