import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const Orders = () => {
  const [filter, setFilter] = useState("all");

  const orders = [
    {
      id: "#ORD-001",
      customer: "Sarah Wilson",
      email: "sarah@email.com",
      items: ["Handwoven Basket Set", "Ceramic Vase"],
      total: 246.49,
      status: "Delivered",
      date: "2025-11-07",
      paymentStatus: "Paid",
    },
    {
      id: "#ORD-002",
      customer: "Mike Johnson",
      email: "mike@email.com",
      items: ["Wooden Wall Art"],
      total: 245.0,
      status: "Shipped",
      date: "2025-11-06",
      paymentStatus: "Paid",
    },
    {
      id: "#ORD-003",
      customer: "Emily Davis",
      email: "emily@email.com",
      items: ["Macrame Plant Hanger", "Rustic Table Lamp"],
      total: 162.99,
      status: "Processing",
      date: "2025-11-05",
      paymentStatus: "Paid",
    },
    {
      id: "#ORD-004",
      customer: "David Brown",
      email: "david@email.com",
      items: ["Ceramic Vase Collection"],
      total: 156.5,
      status: "Pending",
      date: "2025-11-04",
      paymentStatus: "Pending",
    },
    {
      id: "#ORD-005",
      customer: "Lisa Garcia",
      email: "lisa@email.com",
      items: ["Handwoven Basket Set", "Wooden Wall Art", "Table Lamp"],
      total: 462.99,
      status: "Cancelled",
      date: "2025-11-03",
      paymentStatus: "Refunded",
    },
  ];

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
    revenue: orders
      .filter((o) => o.paymentStatus === "Paid")
      .reduce((sum, o) => sum + o.total, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-gray-100 text-gray-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter);

  return (
    <div className="p-6 bg-gradient-to-br from-warmGray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warmGray-900 mb-2">
            Orders Management
          </h1>
          <p className="text-warmGray-600">
            Track and manage all customer orders
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Icon icon="mdi:download" className="w-5 h-5" />
          Export Orders
        </Button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Total Orders</p>
              <p className="text-2xl font-bold text-warmGray-900">
                {orderStats.total}
              </p>
            </div>
            <Icon icon="mdi:receipt" className="w-8 h-8 text-craft-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {orderStats.pending}
              </p>
            </div>
            <Icon
              icon="mdi:clock-outline"
              className="w-8 h-8 text-yellow-500"
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {orderStats.delivered}
              </p>
            </div>
            <Icon icon="mdi:check-circle" className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Revenue</p>
              <p className="text-2xl font-bold text-craft-600">
                ${orderStats.revenue.toFixed(2)}
              </p>
            </div>
            <Icon icon="mdi:currency-usd" className="w-8 h-8 text-craft-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {[
            "all",
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === status
                  ? "bg-craft-500 text-white"
                  : "bg-white text-warmGray-600 hover:bg-warmGray-50 border border-warmGray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === "all" && ` (${orderStats.total})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-warmGray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-warmGray-600">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 font-medium text-warmGray-600">
                  Customer
                </th>
                <th className="text-left py-4 px-6 font-medium text-warmGray-600">
                  Items
                </th>
                <th className="text-left py-4 px-6 font-medium text-warmGray-600">
                  Total
                </th>
                <th className="text-left py-4 px-6 font-medium text-warmGray-600">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-medium text-warmGray-600">
                  Date
                </th>
                <th className="text-left py-4 px-6 font-medium text-warmGray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-warmGray-100 hover:bg-warmGray-25"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-warmGray-900">
                      {order.id}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-warmGray-900">
                        {order.customer}
                      </div>
                      <div className="text-sm text-warmGray-500">
                        {order.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="max-w-xs">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="text-sm text-warmGray-700">
                          {item}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-xs text-warmGray-500">
                          +{order.items.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-warmGray-900">
                      ${order.total}
                    </div>
                    <div
                      className={`text-xs ${
                        order.paymentStatus === "Paid"
                          ? "text-green-600"
                          : order.paymentStatus === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-warmGray-700">
                      {order.date}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon icon="mdi:eye" className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon icon="mdi:pencil" className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Orders;
