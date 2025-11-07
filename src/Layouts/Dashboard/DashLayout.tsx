import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DashLayout = () => {
  return (
    <div className="min-h-screen bg-warmGray-50">
      {/* Topbar - Fixed */}
      <Topbar />

      {/* Main layout container */}
      <div className="flex pt-16">
        {/* Sidebar - Fixed */}
        <Sidebar />

        {/* Main content area - Scrollable with proper margins */}
        <div className="flex-1 ml-64 min-h-screen overflow-x-hidden">
          <div className="max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
