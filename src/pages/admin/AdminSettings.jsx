import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useCache } from '../../utils/useCache';

export default function AdminSettings() {
  const { data, isLoading, updateCache } = useCache('settings', '/settings');
  
  const [settings, setSettings] = useState({
    companyName: '', tagline: '', description: '', email: '', phone: '', address: '',
    instagramUrl: '', facebookUrl: '', tiktokUrl: '', linkedInUrl: '', footerDesc: '', copyright: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSettings(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.fetch('/settings', {
        method: 'POST',
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to save settings');
      
      updateCache(settings);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading && !data) return <div className="p-12 text-center text-[#64748B] font-medium">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out] pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md py-4 z-10 border-b border-transparent">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Settings</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage your company profile and website preferences.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Company Information</h2>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Company Name</label>
              <input name="companyName" value={settings.companyName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Website Tagline</label>
              <input name="tagline" value={settings.tagline} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Company Description (SEO)</label>
            <textarea name="description" value={settings.description} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Contact Information</h2>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Public Email Address</label>
              <input name="email" value={settings.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Phone Number</label>
              <input name="phone" value={settings.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#334155] mb-2">Office Address</label>
              <input name="address" value={settings.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Social Media Links</h2>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Instagram URL</label>
              <input name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Facebook URL</label>
              <input name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">TikTok URL</label>
              <input name="tiktokUrl" value={settings.tiktokUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">LinkedIn URL</label>
              <input name="linkedInUrl" value={settings.linkedInUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm mb-8">
        <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h2 className="text-lg font-bold text-[#0A1628]">Footer Settings</h2>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Footer Description Text</label>
            <textarea name="footerDesc" value={settings.footerDesc} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Copyright Text</label>
            <input name="copyright" value={settings.copyright} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}