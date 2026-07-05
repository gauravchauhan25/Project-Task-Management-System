import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-56 bg-gray-200 h-screen p-4">

      <h2 className="text-lg font-bold mb-5">
        Menu
      </h2>

      <ul>

        <li className="mb-3">
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/projects">
            Projects
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/tasks">
            Tasks
          </Link>
        </li>

      </ul>

    </div>
  );
}
