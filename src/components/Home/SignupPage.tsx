import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Card, CardContent } from "../ui";
import { Icon } from "@iconify/react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        alert("Account created successfully!");
      }, 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmGray-50 via-craft-50 to-sage-50 py-12 px-4">
      <div className="container-craft">
        <Card
          variant="elegant"
          size="xl"
          className="max-w-6xl mx-auto shadow-large"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
            {/* Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-craft-600 to-sage-600 text-white">
              <div className="absolute inset-0 opacity-20">
                <img
                  src="/welcome.jpg"
                  alt="Craftopia Welcome"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative z-10 flex flex-col justify-center h-full p-8 lg:p-12">
                <div className="max-w-md">
                  <h1 className="text-heading-1 mb-6 font-serif text-white">
                    Join the Craftopia Family
                  </h1>
                  <p className="text-body-large mb-8 text-white/90">
                    Discover a world of handcrafted beauty. Create your account
                    to access exclusive artisan collections, personalized
                    recommendations, and connect with our community of craft
                    enthusiasts.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                      <span className="text-body">
                        Exclusive access to new collections
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                      <span className="text-body">
                        Personalized product recommendations
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                      <span className="text-body">
                        Early access to artisan workshops
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col justify-center">
              <CardContent spacing="lg">
                <div className="text-center mb-8">
                  <h2 className="text-heading-2 mb-4 text-warmGray-900">
                    Create Your Account
                  </h2>
                  <p className="text-body text-warmGray-600">
                    Start your journey with handcrafted excellence
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      variant="elegant"
                      size="lg"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      errorMessage={errors.firstName}
                      leftIcon={<Icon icon="mdi:account" className="w-5 h-5 text-craft-500" />}
                    />

                    <Input
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      variant="elegant"
                      size="lg"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      errorMessage={errors.lastName}
                      leftIcon={<Icon icon="mdi:account" className="w-5 h-5 text-craft-500" />}
                    />
                  </div>

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    variant="elegant"
                    size="lg"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    errorMessage={errors.email}
                    leftIcon={<span className="text-craft-500">✉</span>}
                    helperText="We'll never share your email with anyone else"
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Create a secure password"
                    variant="elegant"
                    size="lg"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    errorMessage={errors.password}
                    leftIcon={<span className="text-craft-500">🔒</span>}
                    helperText="At least 8 characters with letters and numbers"
                  />

                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    variant="elegant"
                    size="lg"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    errorMessage={errors.confirmPassword}
                    leftIcon={<span className="text-craft-500">🔒</span>}
                  />

                  <div className="flex items-start gap-3 py-4">
                    <input
                      type="checkbox"
                      id="terms"
                      className="form-checkbox h-5 w-5 text-craft-500 rounded border-warmGray-300 focus:ring-craft-500 mt-0.5"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-body-small text-warmGray-600 leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-craft-600 hover:text-craft-700 font-medium"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-craft-600 hover:text-craft-700 font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="elegant"
                    size="lg"
                    fullWidth
                    loading={loading}
                    loadingText="Creating Account..."
                    className="mt-8"
                  >
                    Create Account
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-body text-warmGray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-craft-600 hover:text-craft-700 font-medium transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-warmGray-200">
                  <div className="text-center">
                    <p className="text-body-small text-warmGray-500 mb-4">
                      Or sign up with
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" size="md" className="flex-1">
                        <span className="mr-2">📧</span> Google
                      </Button>
                      <Button variant="outline" size="md" className="flex-1">
                        <span className="mr-2">📘</span> Facebook
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
