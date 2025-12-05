import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/AuthContext";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
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

  // Close mobile menu when route changes
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#EFEBE8] shadow-lg fixed w-full top-0 h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="Craftopia Logo" className="w-10 mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Craftopia
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 cursor-pointer flex items-center gap-2"
              onClick={() => scrollToSection("landing")}
            >
              Home
            </button>

            <button
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 flex items-center gap-2"
              onClick={() => scrollToSection("about")}
            >
              About Us
            </button>
            <button
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 flex items-center gap-2"
              onClick={() => scrollToSection("crafts")}
            >
              Crafts
            </button>
            <button
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 flex items-center gap-2"
              onClick={() => scrollToSection("contact")}
            >
              Contact Us
            </button>

            {/* Authentication Section */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 flex items-center gap-2"
                  to="/login"
                >
                  <Icon icon="mdi:login" className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  className="bg-[#C39B7E] text-white hover:bg-[#B38A6D] px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 flex items-center gap-2"
                  to="/signup"
                >
                  <Icon icon="mdi:account-plus" className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#C39B7E]/10 transition-colors duration-300"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-[#C39B7E] rounded-full flex items-center justify-center text-white font-medium">
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {user?.firstName}
                  </span>
                  <Icon
                    icon={
                      isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"
                    }
                    className="w-4 h-4 text-gray-500"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    {(user?.role === "admin" ||
                      user?.role === "super_admin") && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Icon icon="mdi:view-dashboard" className="w-4 h-4" />
                        Dashboard
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Icon icon="mdi:account" className="w-4 h-4" />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <Icon icon="mdi:logout" className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <div className="flex items-center gap-2 mr-4">
                <div className="w-8 h-8 bg-[#C39B7E] rounded-full flex items-center justify-center text-white font-medium">
                  {user?.firstName?.[0]?.toUpperCase() || "U"}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <button
              className="w-full text-left text-gray-700 hover:text-[#C39B7E] hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
              onClick={() => scrollToSection("landing")}
            >
              <Icon icon="mdi:home" className="w-5 h-5" />
              Home
            </button>
            <button
              className="w-full text-left text-gray-700 hover:text-[#C39B7E] hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
              onClick={() => scrollToSection("about")}
            >
              <Icon icon="mdi:information" className="w-5 h-5" />
              About Us
            </button>
            <button
              className="w-full text-left text-gray-700 hover:text-[#C39B7E] hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
              onClick={() => scrollToSection("crafts")}
            >
              <Icon icon="mdi:store" className="w-5 h-5" />
              Crafts
            </button>
            <button
              className="w-full text-left text-gray-700 hover:text-[#C39B7E] hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
              onClick={() => scrollToSection("contact")}
            >
              <Icon icon="mdi:email" className="w-5 h-5" />
              Contact Us
            </button>

            {/* Mobile Auth Section */}
            {!isAuthenticated ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  className="text-gray-700 hover:text-[#C39B7E] hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
                  to="/login"
                  onClick={handleLinkClick}
                >
                  <Icon icon="mdi:login" className="w-5 h-5" />
                  Login
                </Link>
                <Link
                  className="bg-[#C39B7E] text-white hover:bg-[#B38A6D] px-3 py-3 rounded-md text-base font-medium flex items-center gap-3 mt-2 mx-3"
                  to="/signup"
                  onClick={handleLinkClick}
                >
                  <Icon icon="mdi:account-plus" className="w-5 h-5" />
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-3 py-2 border-b border-gray-100 mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                {(user?.role === "admin" || user?.role === "super_admin") && (
                  <Link
                    className="text-gray-700 hover:text-[#C39B7E] hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
                    to="/dashboard"
                    onClick={handleLinkClick}
                  >
                    <Icon icon="mdi:view-dashboard" className="w-5 h-5" />
                    Dashboard
                  </Link>
                )}

                <Link
                  className="text-gray-700 hover:text-[#C39B7E] hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
                  to="/profile"
                  onClick={handleLinkClick}
                >
                  <Icon icon="mdi:account" className="w-5 h-5" />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    handleLinkClick();
                  }}
                  className="w-full text-left text-red-600 hover:bg-red-50 px-3 py-3 rounded-md text-base font-medium flex items-center gap-3"
                >
                  <Icon icon="mdi:logout" className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
