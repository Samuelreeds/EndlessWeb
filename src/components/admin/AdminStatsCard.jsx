export default function AdminStatsCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-blue-900 mt-2">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">{icon}</div>
      </div>
      {trend && <p className="text-xs text-green-600 mt-4 font-medium">{trend}</p>}
    </div>
  );
}