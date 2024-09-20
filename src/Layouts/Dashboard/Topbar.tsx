import { FaBell } from "react-icons/fa"; 
import { AiOutlineSearch } from "react-icons/ai"; 

const Topbar = () => {
  return (
    <div className="shadow-md fixed w-full h-16 flex justify-between items-center px-4 z-50">
      <div className="text-xl font-semibold">Decors Admin</div>
      <div className="flex space-x-4 items-center">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-md"
          />
        </div>

        <button className="relative">
          <FaBell className="w-8 h-8" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            3
          </span>
        </button>

        <img
          src="/avatar.png" 
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Topbar;
