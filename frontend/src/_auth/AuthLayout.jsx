import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

import SignUp from "./_forms/SignUp";
import SignIn from "./_forms/SignIn";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthContext();
  const [isSignUp, setIsSignUp] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto p-4">
          <Link to="/" className="text-xl font-bold">
            Project Manager
          </Link>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-700 rounded-lg p-1">
              <Link to="/sign-in">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`px-6 py-2 rounded-lg ${
                    !isSignUp
                      ? "bg-gray-900 text-blue-500"
                      : "text-gray-300"
                  }`}
                >
                  Sign In
                </button>
              </Link>

              <Link to="/sign-up">
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`px-6 py-2 rounded-lg ${
                    isSignUp
                      ? "bg-gray-900 text-blue-500"
                      : "text-gray-300"
                  }`}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {isSignUp ? <SignUp /> : <SignIn />}
        </div>
      </div>
    </>
  );
}