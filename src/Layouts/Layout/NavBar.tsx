import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#EFEBE8] shadow-lg fixed w-full top-0 h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="Craftopia Logo" className=" w-10 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Craftopia</h1>
          </div>
          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 cursor-pointer flex items-center gap-2"
              href="/#hero"
            >
              <Icon icon="mdi:home" className="w-4 h-4" />
              Home
            </a>
            <Link
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 flex items-center gap-2"
              to="/craft"
            >
              <Icon icon="mdi:store" className="w-4 h-4" />
              Shop
            </Link>
            <a
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 cursor-pointer flex items-center gap-2"
              href="/#about"
            >
              <Icon icon="mdi:information" className="w-4 h-4" />
              About
            </a>
            <a
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 cursor-pointer flex items-center gap-2"
              href="/#contact"
            >
              <Icon icon="mdi:email" className="w-4 h-4" />
              Contact
            </a>
            <Link
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300"
              to="/showcase"
            >
              Showcase
            </Link>
            <Link
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hover:text-[#C39B7E] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300"
              to="/dashboard"
            >
              Admin
            </Link>
          </div>
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#C39B7E]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium flex items-center gap-2"
              href="/#hero"
            >
              <Icon icon="mdi:home" className="w-4 h-4" />
              Home
            </a>
            <Link
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium flex items-center gap-2"
              to="/craft"
            >
              <Icon icon="mdi:store" className="w-4 h-4" />
              Shop
            </Link>
            <a
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium flex items-center gap-2"
              href="/#about"
            >
              <Icon icon="mdi:information" className="w-4 h-4" />
              About
            </a>
            <a
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium flex items-center gap-2"
              href="/#contact"
            >
              <Icon icon="mdi:email" className="w-4 h-4" />
              Contact
            </a>
            <Link
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium flex items-center gap-2"
              to="/login"
            >
              <Icon icon="mdi:account" className="w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
