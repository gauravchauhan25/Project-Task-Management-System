import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Project & Task Management System
        </h1>

        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Organize your projects, assign tasks to your team.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/projects"
            className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg transition"
          >
            View Projects
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              📁 Project Management
            </h3>

            <p className="text-gray-400">
              Create multiple projects and organize all your work efficiently.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              ✅ Task Tracking
            </h3>

            <p className="text-gray-400">
              Add tasks, update their status, and monitor overall progress.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              👥 Team Collaboration
            </h3>

            <p className="text-gray-400">
              Assign tasks to team members and collaborate effectively.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;