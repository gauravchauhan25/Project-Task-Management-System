export default function ProjectCard(props) {
  return (
    <div className="mb-4 bg-gray-900 text-gray-200 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold">{props.title}</h2>

      <p>{props.description}</p>

      <p className="mt-2">Deadline : {props.deadline}</p>

      {/* <button className="bg-green-500 text-white px-3 py-1 rounded mt-3 mr-2">
        Edit
      </button> */}

      <button
        className="bg-red-500 text-white px-3 py-1 rounded mt-3"
        onClick={() => props.handleDeleteProject(props.projectId)}
      >
        Delete
      </button>
    </div>
  );
}
