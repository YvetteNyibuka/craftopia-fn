import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "mdi:view-dashboard",
    },
    {
      name: "Decors",
      path: "/dashboard/decors",
      icon: "mdi:flower-tulip",
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: "mdi:truck-delivery",
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: "mdi:account-group",
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: "mdi:chart-line",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: "mdi:cog",
    },
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    onClose();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-64 bg-gradient-to-b from-craft-800 to-craft-900 text-white fixed top-16 left-0 flex-col shadow-xl z-40">
        <div className="text-xl font-bold text-center py-6 border-b border-craft-700">
          <Icon
            icon="mdi:hammer-screwdriver"
            className="inline-block w-6 h-6 mr-2"
          />
          Admin Panel
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-craft-600 text-white shadow-lg"
                        : "hover:bg-craft-700 text-craft-100 hover:text-white"
                    }`}
                  >
                    <Icon
                      icon={item.icon}
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-craft-700">
          <div className="flex items-center gap-3 p-3 bg-craft-700 rounded-lg">
            <div className="w-8 h-8 bg-craft-600 rounded-full flex items-center justify-center text-white font-medium">
              {user?.firstName?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="text-sm">
              <div className="font-medium text-white">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-craft-300 capitalize">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-16 left-0 h-full w-64 bg-gradient-to-b from-craft-800 to-craft-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="text-lg font-bold text-center py-4 border-b border-craft-700">
            <Icon
              icon="mdi:hammer-screwdriver"
              className="inline-block w-5 h-5 mr-2"
            />
            Admin Panel
          </div>

          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-craft-600 text-white shadow-lg"
                          : "hover:bg-craft-700 text-craft-100 hover:text-white"
                      }`}
                    >
                      <Icon icon={item.icon} className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-craft-700">
            <div className="flex items-center gap-3 p-3 bg-craft-700 rounded-lg">
              <div className="w-8 h-8 bg-craft-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user?.firstName?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="text-xs">
                <div className="font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-craft-300 capitalize">{user?.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
