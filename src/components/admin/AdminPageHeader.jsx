export default function AdminPageHeader({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">{title}</h1>
      {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}