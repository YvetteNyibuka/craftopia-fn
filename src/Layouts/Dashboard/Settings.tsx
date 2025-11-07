import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "Craftopia",
    siteDescription: "Handcrafted home decor for modern living",
    currency: "USD",
    timezone: "America/New_York",
    language: "en",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    inventoryAlerts: true,
    lowStockThreshold: 5,
    taxRate: 8.5,
    shippingFee: 15.0,
    freeShippingThreshold: 100,
    maintenanceMode: false,
    allowGuestCheckout: true,
    requireEmailVerification: true,
    autoApproveReviews: false,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAllChanges = () => {
    // Here you would typically make an API call to save settings
    try {
      // Simulate API call
      console.log("Saving settings:", settings);

      // Show success message
      alert("Settings saved successfully!");

      // You could also use a toast notification library like react-hot-toast
      // toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  const paymentMethods = [
    { name: "PayPal", enabled: true, icon: "mdi:paypal" },
    { name: "Stripe", enabled: true, icon: "mdi:credit-card" },
    { name: "Bank Transfer", enabled: false, icon: "mdi:bank" },
    { name: "Cash on Delivery", enabled: true, icon: "mdi:cash" },
  ];

  const shippingMethods = [
    {
      name: "Standard Shipping",
      cost: 15.0,
      time: "5-7 business days",
      enabled: true,
    },
    {
      name: "Express Shipping",
      cost: 25.0,
      time: "2-3 business days",
      enabled: true,
    },
    { name: "Overnight", cost: 40.0, time: "1 business day", enabled: false },
    { name: "Local Pickup", cost: 0.0, time: "Same day", enabled: true },
  ];

  const tabs = [
    { id: "general", name: "General", icon: "mdi:cog" },
    { id: "payment", name: "Payment", icon: "mdi:credit-card" },
    { id: "shipping", name: "Shipping", icon: "mdi:truck-delivery" },
    { id: "notifications", name: "Notifications", icon: "mdi:bell" },
    { id: "security", name: "Security", icon: "mdi:shield-check" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-warmGray-50 to-white min-h-full">
      <div className="max-w-full overflow-x-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-warmGray-900 mb-2">
              Settings
            </h1>
            <p className="text-warmGray-600">
              Manage your store configuration and preferences
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Icon icon="mdi:content-save" className="w-5 h-5" />}
            onClick={handleSaveAllChanges}
          >
            Save All Changes
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-craft-500 text-white"
                        : "text-warmGray-600 hover:bg-warmGray-50 hover:text-warmGray-900"
                    }`}
                  >
                    <Icon icon={tab.icon} className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Store Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-warmGray-700 mb-2">
                        Store Name
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) =>
                          handleSettingChange("siteName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-warmGray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) =>
                          handleSettingChange("currency", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="RWF">RWF - Rwandan Franc</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-warmGray-700 mb-2">
                        Store Description
                      </label>
                      <textarea
                        value={settings.siteDescription}
                        onChange={(e) =>
                          handleSettingChange("siteDescription", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Regional Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-warmGray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) =>
                          handleSettingChange("timezone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">
                          Pacific Time
                        </option>
                        <option value="Africa/Kigali">Kigali Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-warmGray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          handleSettingChange("language", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="rw">Kinyarwanda</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payment" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Payment Methods
                  </h2>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-warmGray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            icon={method.icon}
                            className="w-6 h-6 text-warmGray-600"
                          />
                          <span className="font-medium text-warmGray-900">
                            {method.name}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={method.enabled}
                            className="sr-only peer"
                            onChange={() => {}}
                          />
                          <div className="w-11 h-6 bg-warmGray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-craft-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-craft-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Tax Configuration
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-warmGray-700 mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.taxRate}
                        onChange={(e) =>
                          handleSettingChange(
                            "taxRate",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Shipping Methods
                  </h2>
                  <div className="space-y-4">
                    {shippingMethods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-warmGray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-warmGray-900">
                                {method.name}
                              </h3>
                              <p className="text-sm text-warmGray-600">
                                {method.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-warmGray-900">
                                ${method.cost}
                              </p>
                            </div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                          <input
                            type="checkbox"
                            checked={method.enabled}
                            className="sr-only peer"
                            onChange={() => {}}
                          />
                          <div className="w-11 h-6 bg-warmGray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-craft-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-craft-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Shipping Rules
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-warmGray-700 mb-2">
                        Free Shipping Threshold ($)
                      </label>
                      <input
                        type="number"
                        value={settings.freeShippingThreshold}
                        onChange={(e) =>
                          handleSettingChange(
                            "freeShippingThreshold",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      description: "Receive notifications via email",
                    },
                    {
                      key: "orderUpdates",
                      label: "Order Updates",
                      description:
                        "Get notified when orders are placed or updated",
                    },
                    {
                      key: "inventoryAlerts",
                      label: "Inventory Alerts",
                      description: "Alert when products are low in stock",
                    },
                    {
                      key: "marketingEmails",
                      label: "Marketing Emails",
                      description: "Receive promotional and marketing emails",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-warmGray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-warmGray-900">
                          {item.label}
                        </h3>
                        <p className="text-sm text-warmGray-600">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            settings[
                              item.key as keyof typeof settings
                            ] as boolean
                          }
                          className="sr-only peer"
                          onChange={(e) =>
                            handleSettingChange(item.key, e.target.checked)
                          }
                        />
                        <div className="w-11 h-6 bg-warmGray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-craft-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-craft-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Security Settings
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        key: "requireEmailVerification",
                        label: "Require Email Verification",
                        description:
                          "New users must verify their email address",
                      },
                      {
                        key: "allowGuestCheckout",
                        label: "Allow Guest Checkout",
                        description:
                          "Let customers checkout without creating an account",
                      },
                      {
                        key: "autoApproveReviews",
                        label: "Auto-approve Reviews",
                        description: "Automatically publish customer reviews",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-warmGray-50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-warmGray-900">
                            {item.label}
                          </h3>
                          <p className="text-sm text-warmGray-600">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              settings[
                                item.key as keyof typeof settings
                              ] as boolean
                            }
                            className="sr-only peer"
                            onChange={(e) =>
                              handleSettingChange(item.key, e.target.checked)
                            }
                          />
                          <div className="w-11 h-6 bg-warmGray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-craft-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-craft-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-warmGray-900 mb-4">
                    Maintenance Mode
                  </h2>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-warmGray-900">
                        Enable Maintenance Mode
                      </h3>
                      <p className="text-sm text-warmGray-600">
                        Temporarily disable public access to your store
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        className="sr-only peer"
                        onChange={(e) =>
                          handleSettingChange(
                            "maintenanceMode",
                            e.target.checked
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-warmGray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
      {/* Close max-w-full wrapper */}
    </div>
  );
};

export default Settings;
