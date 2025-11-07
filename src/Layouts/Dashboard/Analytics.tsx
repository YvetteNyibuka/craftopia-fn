import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("7d");

  const salesData = {
    "7d": { revenue: 12580, orders: 89, customers: 67, growth: 15.2 },
    "30d": { revenue: 45720, orders: 324, customers: 245, growth: 12.8 },
    "90d": { revenue: 128400, orders: 892, customers: 634, growth: 18.5 },
    "1y": { revenue: 487300, orders: 3247, customers: 1892, growth: 22.3 },
  };

  const currentData = salesData[timeframe as keyof typeof salesData];

  const topProducts = [
    { name: "Handwoven Basket Set", sales: 145, revenue: 12905, growth: 23 },
    { name: "Ceramic Vase Collection", sales: 128, revenue: 20032, growth: 18 },
    { name: "Wooden Wall Art", sales: 96, revenue: 23520, growth: 15 },
    { name: "Macrame Plant Hangers", sales: 87, revenue: 3043, growth: 31 },
    { name: "Rustic Table Lamps", sales: 72, revenue: 9216, growth: 12 },
  ];

  const categoryPerformance = [
    { category: "Wall Art", sales: 245, percentage: 28, color: "bg-craft-500" },
    {
      category: "Vases & Pottery",
      sales: 189,
      percentage: 22,
      color: "bg-sage-500",
    },
    {
      category: "Textiles",
      sales: 167,
      percentage: 19,
      color: "bg-terracotta-500",
    },
    {
      category: "Wood Crafts",
      sales: 134,
      percentage: 15,
      color: "bg-forest-500",
    },
    {
      category: "Lighting",
      sales: 98,
      percentage: 11,
      color: "bg-warmGray-500",
    },
    {
      category: "Plants & Planters",
      sales: 45,
      percentage: 5,
      color: "bg-craft-300",
    },
  ];

  const customerInsights = {
    newCustomers: 124,
    returningCustomers: 89,
    averageOrderValue: 142.5,
    customerLifetimeValue: 485.3,
  };

  return (
    <div className="p-6 bg-gradient-to-br from-warmGray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warmGray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-warmGray-600">
            Insights and performance metrics for your business
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white border border-warmGray-200 rounded-lg">
            {["7d", "30d", "90d", "1y"].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "primary" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(period)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg"
              >
                {period === "1y" ? "1 Year" : period.toUpperCase()}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            leftIcon={<Icon icon="mdi:download" className="w-5 h-5" />}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-craft-500 to-craft-600 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:currency-usd" className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Icon icon="mdi:trending-up" className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{currentData.growth}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-warmGray-900">
              ${currentData.revenue.toLocaleString()}
            </p>
            <p className="text-sm text-warmGray-600">Total Revenue</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-sage-500 to-sage-600 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:receipt" className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Icon icon="mdi:trending-up" className="w-4 h-4" />
              <span className="text-sm font-medium">+8.5%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-warmGray-900">
              {currentData.orders}
            </p>
            <p className="text-sm text-warmGray-600">Total Orders</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:account-group" className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Icon icon="mdi:trending-up" className="w-4 h-4" />
              <span className="text-sm font-medium">+12.3%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-warmGray-900">
              {currentData.customers}
            </p>
            <p className="text-sm text-warmGray-600">Active Customers</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-forest-500 to-forest-600 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:cart" className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Icon icon="mdi:trending-up" className="w-4 h-4" />
              <span className="text-sm font-medium">+5.7%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-warmGray-900">
              ${customerInsights.averageOrderValue}
            </p>
            <p className="text-sm text-warmGray-600">Avg. Order Value</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-warmGray-900">
              Top Performing Products
            </h2>
            <Icon icon="mdi:star" className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-warmGray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-craft-100 rounded-full flex items-center justify-center text-xs font-bold text-craft-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-warmGray-900">
                      {product.name}
                    </p>
                    <p className="text-sm text-warmGray-600">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-craft-600">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 text-green-600">
                    <Icon icon="mdi:trending-up" className="w-3 h-3" />
                    <span className="text-xs">+{product.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-warmGray-900">
              Sales by Category
            </h2>
            <Icon icon="mdi:chart-pie" className="w-5 h-5 text-craft-500" />
          </div>
          <div className="space-y-4">
            {categoryPerformance.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-warmGray-900">
                    {category.category}
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-warmGray-900">
                      {category.sales}
                    </span>
                    <span className="text-sm text-warmGray-600 ml-2">
                      ({category.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-warmGray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-warmGray-900 mb-6">
            Customer Insights
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {customerInsights.newCustomers}
              </div>
              <div className="text-sm text-green-700">New Customers</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {customerInsights.returningCustomers}
              </div>
              <div className="text-sm text-blue-700">Returning</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-craft-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-craft-600">
                ${customerInsights.customerLifetimeValue}
              </div>
              <div className="text-sm text-craft-700">Avg. Customer LTV</div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6">
          <h2 className="text-xl font-bold text-warmGray-900 mb-6">
            Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-warmGray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon
                    icon="mdi:chart-line"
                    className="w-8 h-8 text-green-500"
                  />
                  <div>
                    <p className="font-medium text-warmGray-900">
                      Revenue Growth
                    </p>
                    <p className="text-sm text-warmGray-600">vs. last period</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    +{currentData.growth}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-warmGray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:target" className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-warmGray-900">
                      Conversion Rate
                    </p>
                    <p className="text-sm text-warmGray-600">
                      Orders / Visitors
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">3.2%</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-warmGray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:repeat" className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="font-medium text-warmGray-900">Return Rate</p>
                    <p className="text-sm text-warmGray-600">
                      Customer retention
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-600">68%</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-warmGray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon
                    icon="mdi:clock-outline"
                    className="w-8 h-8 text-orange-500"
                  />
                  <div>
                    <p className="font-medium text-warmGray-900">
                      Avg. Order Time
                    </p>
                    <p className="text-sm text-warmGray-600">Processing time</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-orange-600">2.4h</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
