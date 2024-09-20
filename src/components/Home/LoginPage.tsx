
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <div className="bg-white shadow-lg h-[90%] w-[90%] md:w-[70%] flex">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 items-center justify-center">
          <img
            src="/login.jpg" 
            alt="Login Image"
            className="object-cover w-full h-full "
          />
        </div>

        <div className="w-full md:w-1/2 py-8 md:p-8 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please login to continue.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="inline-flex items-center text-gray-600">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-500" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-indigo-500 text-sm">
                Forgot password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-teal-700 text-white font-bold py-3 rounded-md hover:bg-teal-500 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
