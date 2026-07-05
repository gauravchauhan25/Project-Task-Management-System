export default function DashboardCard(props) {
  return (
    <div className="bg-gray-900 text-gray-200 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">

      <h2 className="text-lg font-bold">
        {props.title}
      </h2>

      <p className="text-2xl mt-2">
        {props.value}
      </p>

    </div>
  );
}