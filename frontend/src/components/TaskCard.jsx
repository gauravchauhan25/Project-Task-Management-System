export default function TaskCard(props) {
  return (
    <div className="lg:w-1/2 w-full m-auto mb-4 bg-gray-900 text-gray-200 rounded-2xl shadow-lg p-8">
      <h2 className="font-bold text-2xl">{props.title}</h2>

      <p>Description: {props.description}</p>

      <p>Status: {props.status}</p>

      <p>Priority: {props.priority}</p>

      <p>Due Date: {props.dueDate}</p>

      <button
        className="bg-red-500 text-white px-3 py-1 rounded mt-3"
        onClick={() => props.handleDeleteTask(props.taskId)}
      >
        Delete
      </button>
    </div>
  );
}