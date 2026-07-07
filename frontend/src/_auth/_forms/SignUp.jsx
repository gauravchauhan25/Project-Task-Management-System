import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
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

  const submit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/sign-in");
      }
    } catch (err) {
      if (err.res) {
        switch (err.res.status) {
          case 400:
            toast.error(err.res.data.message || "Invalid input.");
            break;

          case 401:
            toast.error(err.res.data.message || "Unauthorized.");
            break;

          case 409:
            toast.error(err.res.data.message || "User already exists.");
            break;

          case 500:
            toast.error("Internal Server Error. Please try again later.");
            break;

          default:
            toast.error(err.res.data.message || "Something went wrong.");
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
      <form onSubmit={submit} className="space-y-5">
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
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border"
          />
        </div>

        <div>
          <label
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
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border"
          />

        </div>

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
              placeholder="Enter password"
              className="w-full px-4 py-3 pr-14 rounded-lg bg-gray-800 text-gray-100 border" />

          </div>

        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
  
    </div>
  );
};

export default SignUp;
