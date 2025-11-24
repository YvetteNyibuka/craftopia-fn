import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/api";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";

const AuthDebug: React.FC = () => {
  const { user, login, logout, loading, isAuthenticated } = useAuth();
  const [testEmail, setTestEmail] = useState("admin@craftopia.com");
  const [testPassword, setTestPassword] = useState("Password123");
  const [debugInfo, setDebugInfo] = useState<any>({});

  const handleTestLogin = async () => {
    try {
      await login(testEmail, testPassword);
      updateDebugInfo();
    } catch (error) {
      console.error("Login failed:", error);
      setDebugInfo((prev: any) => ({ ...prev, loginError: error }));
    }
  };

  const handleTestLogout = async () => {
    try {
      await logout();
      updateDebugInfo();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateDebugInfo = () => {
    setDebugInfo({
      accessToken: apiService.getAccessToken(),
      cookiesInDocument: document.cookie,
      localStorage: {
        keys: Object.keys(localStorage),
        values: Object.fromEntries(Object.entries(localStorage)),
      },
      sessionStorage: {
        keys: Object.keys(sessionStorage),
        values: Object.fromEntries(Object.entries(sessionStorage)),
      },
    });
  };

  const testApiCall = async () => {
    try {
      const response = await apiService.getProfile();
      setDebugInfo((prev: any) => ({ ...prev, profileResponse: response }));
    } catch (error) {
      setDebugInfo((prev: any) => ({ ...prev, profileError: error }));
    }
  };

  React.useEffect(() => {
    updateDebugInfo();
  }, [user, isAuthenticated]);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Authentication Debug Panel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auth Status */}
          <div>
            <h3 className="font-semibold mb-2">Authentication Status</h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <div>Loading: {loading ? "Yes" : "No"}</div>
              <div>Authenticated: {isAuthenticated ? "Yes" : "No"}</div>
              <div>User ID: {user?._id || (user as any)?.id || "None"}</div>
              <div>User Email: {user?.email || "None"}</div>
              <div>User Role: {user?.role || "None"}</div>
            </div>
          </div>

          {/* Test Controls */}
          <div>
            <h3 className="font-semibold mb-2">Test Controls</h3>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleTestLogin} size="sm">
                  Test Login
                </Button>
                <Button
                  onClick={handleTestLogout}
                  variant="secondary"
                  size="sm"
                >
                  Test Logout
                </Button>
                <Button onClick={testApiCall} variant="outline" size="sm">
                  Test API
                </Button>
              </div>
            </div>
          </div>

          {/* Token Storage */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2">Token Storage Information</h3>
            <div className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
          <h4 className="font-semibold text-blue-800 mb-1">
            How Token Storage Works:
          </h4>
          <ul className="text-blue-700 space-y-1">
            <li>
              • <strong>Access Token:</strong> Stored in memory (apiService) and
              sent in Authorization headers
            </li>
            <li>
              • <strong>Refresh Token:</strong> Stored as HTTP-only cookie (not
              visible in JavaScript)
            </li>
            <li>
              • <strong>Security:</strong> Refresh token is protected from XSS,
              access token is short-lived
            </li>
            <li>
              • <strong>Persistence:</strong> Refresh token auto-refreshes
              access token when needed
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthDebug;
