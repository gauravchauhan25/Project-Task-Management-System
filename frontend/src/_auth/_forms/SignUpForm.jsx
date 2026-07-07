import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/sign-in");
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error(err.response.data.message || "Invalid input.");
            break;

          case 401:
            toast.error(err.response.data.message || "Unauthorized.");
            break;

          case 409:
            toast.error(err.response.data.message || "User already exists.");
            break;

          case 500:
            toast.error("Internal Server Error. Please try again later.");
            break;

          default:
            toast.error(err.response.data.message || "Something went wrong.");
        }
      } else {
        toast.error("Unable to connect to the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.name ? "border-red-500" : "border-gray-700"
            }`}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.email ? "border-red-500" : "border-gray-700"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              autoComplete="new-password"
              className={`w-full px-4 py-3 pr-14 rounded-lg bg-gray-800 text-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.password ? "border-red-500" : "border-gray-700"
              }`}
            />

          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
