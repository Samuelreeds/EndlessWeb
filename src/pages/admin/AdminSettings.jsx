export default function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out] pb-12">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md py-4 z-10 border-b border-transparent">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Settings</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage your company profile and website preferences.</p>
        </div>
        <button className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2">
          <span>💾</span> Save Changes
        </button>
      </div>

      {/* 1. Logo Upload Section */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Brand Logo</h2>
          <p className="text-sm text-[#64748B] font-medium mt-1">Upload your primary logo to be used across the site.</p>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-[#F1F5F9] border border-[#E2E8F0] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="font-extrabold text-2xl text-[#0A1628] tracking-tighter">ENDLESS<span className="text-[#2563EB]">.</span></span>
            </div>
            <div className="flex-1 w-full border-2 border-dashed border-[#CBD5E1] rounded-2xl p-8 text-center hover:bg-[#F8FAFC] transition cursor-pointer group">
              <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">🖼️</span>
              <span className="text-[14px] text-[#0A1628] font-bold block mb-1">Click to upload new logo</span>
              <span className="text-[12px] text-[#64748B] font-medium">SVG, PNG, or JPG (Recommended size: 400x100px)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Company Information */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Company Information</h2>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Company Name</label>
              <input 
                type="text" 
                defaultValue="Endless OS"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Website Tagline</label>
              <input 
                type="text" 
                defaultValue="We build digital experiences."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Company Description (SEO)</label>
            <textarea 
              rows="3"
              defaultValue="Endless is a premium creative agency specializing in social media growth, branding, and digital transformations for businesses."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm resize-none" 
            />
          </div>
        </div>
      </div>

      {/* 3. Contact Information */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Contact Information</h2>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Public Email Address</label>
              <input 
                type="email" 
                defaultValue="hello@endless.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Phone Number</label>
              <input 
                type="tel" 
                defaultValue="+855 12 345 678"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#334155] mb-2">Office Address</label>
              <input 
                type="text" 
                defaultValue="Phnom Penh, Cambodia"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Social Media Links */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Social Media Links</h2>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Instagram URL</label>
              <input 
                type="url" 
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Facebook URL</label>
              <input 
                type="url" 
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">TikTok URL</label>
              <input 
                type="url" 
                placeholder="https://tiktok.com/@..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">LinkedIn URL</label>
              <input 
                type="url" 
                placeholder="https://linkedin.com/company/..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Footer Settings */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Footer Settings</h2>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Footer Description Text</label>
            <textarea 
              rows="2"
              defaultValue="Helping brands scale through data-driven content and modern design strategies."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm resize-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Copyright Text</label>
            <input 
              type="text" 
              defaultValue="© 2024 Endless OS. All rights reserved."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
            />
          </div>
        </div>
      </div>

    </div>
  );
}