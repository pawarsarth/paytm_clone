import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">Paytm Clone</h1>

        <div className="flex gap-4">
          <Link
            to="/signin"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow px-8 py-12">

        {/* Left Side Text */}
        <div className="flex flex-col items-start max-w-xl mb-12 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Fast, Secure & Simple Digital Payments
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Transfer money instantly with complete security using our Paytm Clone.
            Manage your wallet, check balance, and pay seamlessly.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/signin"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl text-lg hover:bg-gray-300 transition"
            >
              Already a user?
            </Link>
          </div>
        </div>

        {/* Right Side Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
          alt="Payment Illustration"
          className="w-72 md:w-96"
        />
      </div>
    </div>
  );
}
