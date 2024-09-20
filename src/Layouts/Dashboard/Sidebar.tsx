import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiFlowerPot } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";



const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed top-16 left-0 flex flex-col">
      <div className="text-2xl font-bold text-center py-4">Admin Dashboard</div>
      <nav className="flex-1 px-6">
        <ul className="space-y-4">
          <li>
           
            <div className="flex gap-2 items-center" >
            <MdDashboard className="text-2xl" />
            <Link to="#" className="hover:bg-gray-700 py-2 px-4 block rounded">
              Dashboard
            </Link>
            </div>
          
          </li>
          <li>
          <div>
            <div className="flex gap-2 items-center" >
            <GiFlowerPot className="text-2xl" />
            <Link to="#" className="hover:bg-gray-700 py-2 px-4 block rounded">
              Decors
            </Link>
            </div>
          </div>
          </li>
          <li>
        
            <div className="flex gap-2 items-center" >
            <MdCategory className="text-2xl" />
            <Link to="#" className="hover:bg-gray-700 py-2 px-4 block rounded">
              Categories
            </Link>
            </div>
          </li>
          <li>
            <div className="flex gap-2 items-center" >
            <CiDeliveryTruck className="text-2xl" />
            <Link to="#" className="hover:bg-gray-700 py-2 px-4 block rounded">
              Orders
            </Link>
            </div>
          </li>
          <li>
            <div className="flex gap-2 items-center" >
            <FaUsers className="text-2xl" />
            <Link to="#" className="hover:bg-gray-700 py-2 px-4 block rounded">
              Users
            </Link>
            </div>
          </li>
          <li>
            <div className="flex gap-2 items-center" >
            <IoSettingsSharp className="text-2xl" />
            <Link to="#" className="hover:bg-gray-700 py-2 px-4 block rounded">
              Settings
            </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
