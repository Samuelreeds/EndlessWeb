export default function CaseStudyCard({ study, onEdit, onDelete }) {
  // Handle parsing the JSON results safely
  let metrics = [];
  try {
    if (typeof study.results === 'string') {
      metrics = JSON.parse(study.results);
    } else if (Array.isArray(study.results)) {
      metrics = study.results;
    }
  } catch (e) {
    console.error("Error parsing metrics JSON", e);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
      {/* Image Header */}
      <div className="h-48 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden flex-shrink-0 flex items-center justify-center">
        {study.imageUrl ? (
          <img src={study.imageUrl} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-[#94A3B8] flex flex-col items-center">
            <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-bold">No Image Provided</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#2563EB] rounded-full shadow-sm border border-white/20">
            {study.tag}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-extrabold text-[#0A1628] leading-tight mb-3 line-clamp-2">
          {study.title}
        </h3>
        <p className="text-sm font-medium text-[#64748B] mb-6 line-clamp-3">
          <span className="font-bold text-[#334155]">Challenge:</span> {study.challenge}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
          {metrics && metrics.slice(0, 2).map((metric, idx) => (
            <div key={idx} className="bg-[#F1F5F9] rounded-xl p-3 border border-[#E2E8F0]">
              <div className="text-lg font-black text-[#0A1628]">{metric.value || metric.num}</div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wide truncate">{metric.label || metric.lbl}</div>
            </div>
          ))}
          {metrics && metrics.length > 2 && (
             <div className="col-span-2 text-xs font-bold text-[#94A3B8] text-center pt-1">
               + {metrics.length - 2} more results
             </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-[#F1F5F9] flex justify-between items-center">
          <span className="text-xs font-bold text-[#94A3B8]">
            {new Date(study.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="space-x-3">
            <button onClick={() => onEdit(study)} className="text-[#64748B] hover:text-[#2563EB] font-bold text-sm transition-colors">Edit</button>
            <button onClick={() => onDelete(study.id)} className="text-[#64748B] hover:text-red-500 font-bold text-sm transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}