import { Outlet } from "react-router-dom";
import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DashLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-warmGray-50">
      {/* Topbar - Fixed */}
      <Topbar toggleSidebar={toggleSidebar} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={closeSidebar}
        />
      )}

      {/* Main layout container */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main content area - Responsive margins */}
        <div className="flex-1 lg:ml-64 min-h-screen overflow-x-hidden">
          <div className="max-w-full p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
