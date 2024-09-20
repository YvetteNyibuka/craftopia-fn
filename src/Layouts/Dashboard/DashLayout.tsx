import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const DashLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <Topbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 ml-64 mt-16 p-4">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashLayout;
