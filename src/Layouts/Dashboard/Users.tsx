import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

const Users = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const users = [
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      role: "Customer",
      status: "Active",
      joinDate: "2024-03-15",
      orders: 12,
      totalSpent: 1250.75,
      avatar: "/user1.jpg",
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      role: "Customer",
      status: "Active",
      joinDate: "2024-05-22",
      orders: 8,
      totalSpent: 890.5,
      avatar: "/user2.jpg",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-01-10",
      orders: 25,
      totalSpent: 2100.0,
      avatar: "/user3.jpg",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@email.com",
      role: "Customer",
      status: "Inactive",
      joinDate: "2024-08-03",
      orders: 3,
      totalSpent: 245.25,
      avatar: "/user4.jpg",
    },
    {
      id: 5,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      role: "Moderator",
      status: "Active",
      joinDate: "2024-02-18",
      orders: 15,
      totalSpent: 1450.8,
      avatar: "/user5.jpg",
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@email.com",
      role: "Customer",
      status: "Suspended",
      joinDate: "2024-09-12",
      orders: 1,
      totalSpent: 89.99,
      avatar: "/user6.jpg",
    },
  ];

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
    suspended: users.filter((u) => u.status === "Suspended").length,
    admins: users.filter((u) => u.role === "Admin").length,
    customers: users.filter((u) => u.role === "Customer").length,
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-700";
      case "Moderator":
        return "bg-blue-100 text-blue-700";
      case "Customer":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-yellow-100 text-yellow-700";
      case "Suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesFilter =
      filter === "all" || user.status.toLowerCase() === filter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const Pagination = () => (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-warmGray-700">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} results
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Icon icon="mdi:chevron-left" className="w-4 h-4" />}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        ></Button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[2rem]"
              >
                {page}
              </Button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-2 text-warmGray-500">
                ...
              </span>
            );
          }
          return null;
        })}

        <Button
          variant="outline"
          size="sm"
          rightIcon={<Icon icon="mdi:chevron-right" className="w-4 h-4" />}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        ></Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-warmGray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warmGray-900 mb-2">
            User Management
          </h1>
          <p className="text-warmGray-600">
            Manage customer accounts and permissions
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<Icon icon="mdi:download" className="w-5 h-5" />}
          >
            Export Users
          </Button>
          <Button
            variant="primary"
            leftIcon={<Icon icon="mdi:account-plus" className="w-5 h-5" />}
          >
            Add User
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Total Users</p>
              <p className="text-2xl font-bold text-warmGray-900">
                {userStats.total}
              </p>
            </div>
            <Icon icon="mdi:account-group" className="w-8 h-8 text-craft-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {userStats.active}
              </p>
            </div>
            <Icon icon="mdi:account-check" className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Customers</p>
              <p className="text-2xl font-bold text-blue-600">
                {userStats.customers}
              </p>
            </div>
            <Icon icon="mdi:account" className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmGray-600">Admins</p>
              <p className="text-2xl font-bold text-red-600">
                {userStats.admins}
              </p>
            </div>
            <Icon icon="mdi:shield-account" className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {["all", "active", "inactive", "suspended"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warmGray-400"
              />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-warmGray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-warmGray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-warmGray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="w-10 h-10 bg-craft-100 rounded-full flex items-center justify-center">
                          <Icon
                            icon="mdi:account"
                            className="w-5 h-5 text-craft-600"
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-warmGray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-warmGray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-warmGray-900">
                    {user.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-craft-600">
                    ${user.totalSpent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-warmGray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="text-craft-600 hover:text-craft-900">
                        <Icon icon="mdi:pencil" className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Icon icon="mdi:eye" className="w-4 h-4" />
                      </button>
                      <button className="text-warmGray-600 hover:text-warmGray-900">
                        <Icon icon="mdi:dots-vertical" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination />}
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-warmGray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 h-auto"
          >
            <Icon icon="mdi:email-send" className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <div className="font-medium">Send Newsletter</div>
              <div className="text-sm text-blue-600">
                Email all active users
              </div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 h-auto"
          >
            <Icon icon="mdi:account-plus" className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <div className="font-medium">Bulk Import</div>
              <div className="text-sm text-green-600">
                Import users from CSV
              </div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 h-auto"
          >
            <Icon icon="mdi:chart-line" className="w-8 h-8 text-purple-600" />
            <div className="text-left">
              <div className="font-medium">User Analytics</div>
              <div className="text-sm text-purple-600">
                View detailed reports
              </div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Users;
