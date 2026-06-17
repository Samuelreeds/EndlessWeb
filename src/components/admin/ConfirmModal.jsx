export default function ConfirmModal({ isOpen, onClose, title, message, confirmText = "Confirm", isDestructive = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-[#E2E8F0] text-center p-8">
        
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} mb-6`}>
          {isDestructive ? (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
             <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <h3 className="text-xl font-extrabold text-[#0A1628] mb-2">{title}</h3>
        <p className="text-sm font-medium text-[#64748B] mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex justify-center gap-3">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 w-full text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors border border-[#E2E8F0]"
          >
            Cancel
          </button>
          <button 
            onClick={onClose} 
            className={`px-6 py-2.5 w-full text-sm font-bold text-white rounded-xl shadow-md transition-all ${
              isDestructive 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' 
                : 'bg-[#2563EB] hover:bg-[#1E4D99] shadow-blue-500/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}