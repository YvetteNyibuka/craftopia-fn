import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const location = useLocation();

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

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-craft-800 to-craft-900 text-white fixed top-16 left-0 flex flex-col shadow-xl z-40">
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
          <Icon icon="mdi:account-circle" className="w-8 h-8 text-craft-200" />
          <div className="text-sm">
            <div className="font-medium text-white">Admin User</div>
            <div className="text-craft-300">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
