import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const profileRef = useRef(null);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboards", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Tasks", href: "/tasks" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href) => location.pathname === href;

  const defaultImage =
    "https://pathwayactivities.co.uk/wp-content/uploads/2016/04/Profile_avatar_placeholder_large-circle-300x300.png";

  // function handleLogout() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   navigate("/");
  // }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/sign-in");
  };
  
  return (
    <nav className="bg-white/95 dark:bg-gray-900 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Project Manager
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 gap-3">
            {!isAuthenticated && (
              <div className="hidden md:block">
                <Link to="/sign-in">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Login
                  </button>
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileMenuOpen((p) => !p)}
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 focus:outline-none cursor-pointer"
                  aria-haspopup="menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  <img
                    src={defaultImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>

                {isProfileMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100 dark:border-gray-700 py-2 z-50"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      {/* <User className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" /> */}
                      My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {/* <LogOut className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" /> */}
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {/* {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )} */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
