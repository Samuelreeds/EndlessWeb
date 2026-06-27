import { useState, useEffect } from 'react';

export default function PricingManager() {
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    tier: '',
    name: '',
    priceMonthly: '',
    priceYearly: '',
    tagline: '',
    features: '', // We will split by newline
    terms: '',    // We will split by newline
    isPopular: false,
    isActive: true
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  const fetchPlans = () => {
    fetch(`${API_URL}/pricing/admin`, { headers: { 'Authorization': `Bearer ${token}` }})
      .then(res => res.json())
      .then(data => setPlans(data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => fetchPlans(), []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (plan) => {
    setFormData({
      id: plan.id,
      tier: plan.tier,
      name: plan.name,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
      tagline: plan.tagline,
      features: plan.features.join('\n'), // Convert array back to text block
      terms: plan.terms.join('\n'),
      isPopular: plan.isPopular,
      isActive: plan.isActive
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pricing plan?')) return;
    await fetch(`${API_URL}/pricing/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchPlans();
  };

  const handleMove = async (index, direction) => {
    const newPlans = [...plans];
    if (direction === 'up' && index > 0) {
      [newPlans[index], newPlans[index - 1]] = [newPlans[index - 1], newPlans[index]];
    } else if (direction === 'down' && index < newPlans.length - 1) {
      [newPlans[index], newPlans[index + 1]] = [newPlans[index + 1], newPlans[index]];
    } else {
      return;
    }
    
    setPlans(newPlans);
    const orderedIds = newPlans.map(p => p.id);
    
    await fetch(`${API_URL}/pricing/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ orderedIds })
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert text blocks back to clean arrays
    const payload = {
      ...formData,
      priceMonthly: parseInt(formData.priceMonthly) || 0,
      priceYearly: parseInt(formData.priceYearly) || 0,
      features: formData.features.split('\n').map(f => f.trim()).filter(f => f),
      terms: formData.terms.split('\n').map(t => t.trim()).filter(t => t),
      orderIndex: isEditing ? plans.find(p => p.id === formData.id).orderIndex : plans.length
    };

    const method = isEditing ? 'PUT' : 'POST';
    const endpoint = isEditing ? `${API_URL}/pricing/${formData.id}` : `${API_URL}/pricing`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    setFormData({ id: null, tier: '', name: '', priceMonthly: '', priceYearly: '', tagline: '', features: '', terms: '', isPopular: false, isActive: true });
    setIsEditing(false);
    fetchPlans();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0A1628]">Pricing Plans</h1>
        <p className="text-[#64748B] mt-1">Manage, reorder, and update your public pricing tiers.</p>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] space-y-4">
        <h3 className="font-bold text-lg mb-4">{isEditing ? 'Edit Plan' : 'Add New Plan'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" name="tier" placeholder="Tier Name (e.g. Growth)" value={formData.tier} onChange={handleInputChange} className="p-3 border rounded-xl" required />
          <input type="text" name="name" placeholder="Subtitle (e.g. Option 2)" value={formData.name} onChange={handleInputChange} className="p-3 border rounded-xl" required />
          <input type="text" name="tagline" placeholder="Tagline description" value={formData.tagline} onChange={handleInputChange} className="p-3 border rounded-xl" required />
          <input type="number" name="priceMonthly" placeholder="Monthly Price ($)" value={formData.priceMonthly} onChange={handleInputChange} className="p-3 border rounded-xl" required />
          <input type="number" name="priceYearly" placeholder="Yearly Price ($)" value={formData.priceYearly} onChange={handleInputChange} className="p-3 border rounded-xl" required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Features (One per line)</label>
            <textarea name="features" rows="4" placeholder="12 Posters&#10;4 Videos" value={formData.features} onChange={handleInputChange} className="w-full p-3 border rounded-xl"></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Terms/Add-ons (One per line)</label>
            <textarea name="terms" rows="4" placeholder="Content Schedule&#10;Videos up to 60s" value={formData.terms} onChange={handleInputChange} className="w-full p-3 border rounded-xl"></textarea>
          </div>
        </div>

        <div className="flex gap-6 py-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleInputChange} className="w-5 h-5" />
            <span className="font-semibold text-sm">Mark as "Most Popular"</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5" />
            <span className="font-semibold text-sm">Active (Visible on site)</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-[#2563EB] text-white px-6 py-3 rounded-xl font-bold">{isEditing ? 'Update Plan' : 'Create Plan'}</button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, tier: '', name: '', priceMonthly: '', priceYearly: '', tagline: '', features: '', terms: '', isPopular: false, isActive: true })}} className="px-6 py-3 border rounded-xl font-bold">Cancel</button>}
        </div>
      </form>

      {/* Plans List */}
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <div key={plan.id} className={`flex items-center justify-between p-4 bg-white rounded-xl border ${plan.isActive ? 'border-[#E2E8F0]' : 'border-red-200 opacity-60'} shadow-sm`}>
            <div>
              <h4 className="font-bold text-lg">{plan.tier} <span className="text-gray-400 text-sm font-normal">({plan.name})</span> {plan.isPopular && <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Popular</span>}</h4>
              <p className="text-sm text-gray-500">${plan.priceMonthly}/mo • ${plan.priceYearly}/mo (Yearly)</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="p-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-30">▲</button>
                <button onClick={() => handleMove(index, 'down')} disabled={index === plans.length - 1} className="p-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-30">▼</button>
              </div>
              <button onClick={() => handleEdit(plan)} className="text-blue-600 font-bold px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100">Edit</button>
              <button onClick={() => handleDelete(plan.id)} className="text-red-600 font-bold px-4 py-2 bg-red-50 rounded-lg hover:bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}