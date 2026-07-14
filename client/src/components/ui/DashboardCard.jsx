const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
          {icon}
        </div>
      </div>

      <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;