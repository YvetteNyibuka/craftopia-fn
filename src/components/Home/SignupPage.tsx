import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg h-full w-full md:w-[70%] flex flex-col md:flex-row">
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src="/welcome.jpg"
            alt="Signup Image"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 px-8 py-8 md:py-0 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign up to get started.
          </p>

          <form className="space-y-6 w-full">
            <div>
              <label className="block text-gray-700 font-medium" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
              />
            </div>

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

            <div>
              <label className="block text-gray-700 font-medium" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-teal-700 text-white font-bold py-3 rounded-md hover:bg-teal-500 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
