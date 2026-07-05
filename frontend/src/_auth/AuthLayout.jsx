import { Outlet, Navigate, Link } from "react-router-dom";
import SignUpForm from "./_forms/SignUpForm";
import SignInForm from "./_forms/SignInForm";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthContext();
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <nav className="border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link to="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold">
                    Project Manager
                  </span>
                </Link>
              </div>
            </div>
          </nav>

          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700 ">
                <div className="flex justify-center mb-8">
                  <div className="flex bg-gray-700 rounded-lg p-1">
                    <Link to="/sign-in">
                      <button
                        onClick={() => setIsSignUp(false)}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          !isSignUp
                            ? "bg-gray-900 text-blue-600 shadow-sm"
                            : "text-gray-300 hover:text-gray-200 "
                        }`}
                      >
                        Sign In
                      </button>
                    </Link>

                    <Link to="/sign-up">
                      <button
                        onClick={() => setIsSignUp(true)}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          isSignUp
                            ? "bg-white dark:bg-gray-900 text-blue-600 shadow-sm"
                            : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                        }`}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="transition-all duration-300">
                  {isSignUp ? (
                    <SignUpForm toggleForm={toggleForm} />
                  ) : (
                    <SignInForm toggleForm={toggleForm} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
