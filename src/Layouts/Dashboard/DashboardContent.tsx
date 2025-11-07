import { Icon } from "@iconify/react";
import { Card } from "../../components/ui/Card";

const DashboardContent = () => {
  const stats = [
    {
      title: "Total Decors",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: "mdi:flower-tulip",
      color: "from-craft-500 to-craft-600",
    },
    {
      title: "Orders Today",
      value: "24",
      change: "+8%",
      trend: "up",
      icon: "mdi:cart-outline",
      color: "from-sage-500 to-sage-600",
    },
    {
      title: "Revenue",
      value: "$12,580",
      change: "+15%",
      trend: "up",
      icon: "mdi:currency-usd",
      color: "from-terracotta-500 to-terracotta-600",
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+5%",
      trend: "up",
      icon: "mdi:account-group",
      color: "from-forest-500 to-forest-600",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Sarah Wilson",
      amount: "$89.99",
      status: "Delivered",
      time: "2 hours ago",
    },
    {
      id: "#ORD-002",
      customer: "Mike Johnson",
      amount: "$156.50",
      status: "Shipped",
      time: "5 hours ago",
    },
    {
      id: "#ORD-003",
      customer: "Emily Davis",
      amount: "$245.00",
      status: "Processing",
      time: "1 day ago",
    },
    {
      id: "#ORD-004",
      customer: "David Brown",
      amount: "$78.25",
      status: "Pending",
      time: "2 days ago",
    },
  ];

  const topProducts = [
    { name: "Handwoven Basket Set", sold: 45, revenue: "$2,250" },
    { name: "Ceramic Vase Collection", sold: 38, revenue: "$1,900" },
    { name: "Wooden Wall Art", sold: 32, revenue: "$1,600" },
    { name: "Macrame Plant Hangers", sold: 28, revenue: "$1,400" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-warmGray-50 to-white min-h-full">
      <div className="max-w-full overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warmGray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-warmGray-600">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-warmGray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-warmGray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <Icon
                      icon={
                        stat.trend === "up"
                          ? "mdi:trending-up"
                          : "mdi:trending-down"
                      }
                      className={`w-4 h-4 mr-1 ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon icon={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="xl:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-warmGray-900">
                  Recent Orders
                </h2>
                <button className="text-craft-600 hover:text-craft-700 font-medium text-sm">
                  View All
                </button>
              </div>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warmGray-200">
                      <th className="text-left py-3 px-2 font-medium text-warmGray-600 text-sm">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-warmGray-600 text-sm">
                        Customer
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-warmGray-600 text-sm">
                        Amount
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-warmGray-600 text-sm">
                        Status
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-warmGray-600 text-sm">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr
                        key={index}
                        className="border-b border-warmGray-100 hover:bg-warmGray-50"
                      >
                        <td className="py-3 px-2 font-medium text-warmGray-900 text-sm">
                          {order.id}
                        </td>
                        <td className="py-3 px-2 text-warmGray-700 text-sm">
                          {order.customer}
                        </td>
                        <td className="py-3 px-2 font-medium text-warmGray-900 text-sm">
                          {order.amount}
                        </td>
                        <td className="py-3 px-2 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-warmGray-500 text-sm">
                          {order.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Top Products */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-warmGray-900">
                  Top Products
                </h2>
                <Icon icon="mdi:star" className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-warmGray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-warmGray-900 text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-warmGray-500">
                        {product.sold} sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-craft-600 text-sm">
                        {product.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-warmGray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center gap-3 p-4 bg-craft-50 hover:bg-craft-100 rounded-lg transition-colors group">
                <Icon
                  icon="mdi:plus-circle"
                  className="w-8 h-8 text-craft-600 group-hover:scale-105 transition-transform"
                />
                <span className="font-medium text-craft-700">
                  Add New Decor
                </span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors group">
                <Icon
                  icon="mdi:tag-plus"
                  className="w-8 h-8 text-sage-600 group-hover:scale-105 transition-transform"
                />
                <span className="font-medium text-sage-700">New Category</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-terracotta-50 hover:bg-terracotta-100 rounded-lg transition-colors group">
                <Icon
                  icon="mdi:chart-line"
                  className="w-8 h-8 text-terracotta-600 group-hover:scale-105 transition-transform"
                />
                <span className="font-medium text-terracotta-700">
                  View Analytics
                </span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-forest-50 hover:bg-forest-100 rounded-lg transition-colors group">
                <Icon
                  icon="mdi:cog"
                  className="w-8 h-8 text-forest-600 group-hover:scale-105 transition-transform"
                />
                <span className="font-medium text-forest-700">Settings</span>
              </button>
            </div>
          </Card>
        </div>
      </div>{" "}
      {/* Close max-w-full wrapper */}
    </div>
  );
};

export default DashboardContent;
