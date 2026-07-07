import { useState, useEffect } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleAddTask(e) {
    e.preventDefault();

    try {
      await api.post("/tasks", taskData);

      setTaskData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
      });

      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      // Refresh the list
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold">My Tasks</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-5">
        {showForm && (
          <form
            onSubmit={handleAddTask}
            className="bg-gray-800 p-6 rounded-xl mb-6 space-y-4"
          >
            <div>
              <label className="block text-white mb-2 font-medium">
                Task Name
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter task name"
                value={taskData.title}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter task description"
                value={taskData.description}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Status
              </label>
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">in Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              Add Task
            </button>
          </form>
        )}

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                taskId={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                dueDate={task.dueDate}
                handleDeleteTask={handleDeleteTask}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
