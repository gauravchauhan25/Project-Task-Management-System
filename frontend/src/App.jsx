import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import SignUpForm from "./_auth/_forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/_forms/SignInForm";
import { useAuthContext } from "./contexts/AuthContext";
import { Profile } from "./pages/Profile";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";


const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? element : <Navigate to="/sign-in" replace />;
};

const AppLayout = () => (
  <div className="min-h-screen bg-gray-900 text-gray-200 transition-colors">
    <Navbar />
    <Outlet />
  </div>
);


export default function App() {
  const { isAuthenticated } = useAuthContext();
  const Navigate = useNavigate();

  return (
     <Routes>
      <Route
        element={
          <div className="min-h-screenbg-gray-950 bg-gray-900 text-gray-200 transition-colors">
            <AuthLayout />
          </div>
        }
      >
        <Route
          path="/sign-in"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignInForm />
          }
        />
        <Route
          path="/sign-up"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignUpForm />
          }
        />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />

        <Route
          path="/tasks"
          element={<ProtectedRoute element={<Tasks />} />}
        />
        <Route
          path="/projects"
          element={<ProtectedRoute element={<Projects />} />}
        />
      </Route>
    </Routes>
  );
}
