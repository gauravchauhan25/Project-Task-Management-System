import { useEffect, useState } from "react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { useProfileContext } from "../contexts/ProfileContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { userProfile } = useProfileContext();

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/projects", projectData);

      setProjectData({
        userId: userProfile._id,
        title: "",
        description: "",
        deadline: "",
      });

      setShowForm(false);

      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);

      // Refresh the list
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">My Projects</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium"
          >
            + Add Project
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-5">
        {showForm && (
          <form
            onSubmit={handleAddProject}
            className="bg-gray-800 p-5 rounded-lg mb-6 space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={projectData.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white"
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={projectData.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white"
            />

            <input
              type="date"
              name="deadline"
              value={projectData.deadline}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white"
            >
              Add Project
            </button>
          </form>
        )}

        {/* Projects */}
        <div className="space-y-5">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                projectId={project._id}
                title={project.title}
                description={project.description}
                deadline={project.deadline}
                handleDeleteProject={handleDeleteProject}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">No projects available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
