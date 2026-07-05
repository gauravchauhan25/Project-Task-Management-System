import DashboardCard from "../components/DashboardCard";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [pendingTaskCount, setPendingTaskCount] = useState(0);

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const response = await api.get("/projects/count");
        console.log(response.data.totalProjects);
        setProjectCount(response.data.totalProjects);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTaskCount = async () => {
      try {
        const response = await api.get("/tasks/count");
        setTaskCount(response.data.totalTasks);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCompletedTaskCount = async () => {
      try {
        const response = await api.get("/tasks/completed");
        setCompletedTaskCount(response.data.completedTasks);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPendingTaskCount = async () => {
      try {
        const response = await api.get("/tasks/pending");
        setPendingTaskCount(response.data.pendingTasks);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjectCount();
    fetchTaskCount();
    fetchCompletedTaskCount();
    fetchPendingTaskCount();
  }, []);

  return (
    <div>
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Dashbaord</h1>
        </div>
      </div>

      <div className="p-5 w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <DashboardCard title="Number of Projects" value={projectCount} />

          <DashboardCard title="Number of Tasks" value={taskCount} />

          <DashboardCard title="Completed Tasks" value={completedTaskCount} />

          <DashboardCard title="Pending Tasks" value={pendingTaskCount} />
        </div>
      </div>
    </div>
  );
}
