import React, { useState } from "react";
import { createEquipment } from "../services/auth.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Upload, Plus, Package } from "lucide-react";

const EquipmentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Surfboard"
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    if (file) data.append("equipmentImage", file);

    try {
      await createEquipment(data);
      setSuccess(true);
      setFormData({ name: "", description: "", price: "", category: "Surfboard" });
      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',_sans-serif]">
      <Navbar />
      <main className="container mx-auto px-8 py-32 flex flex-col items-center">
        <header className="mb-24 w-full max-w-4xl border-b border-white/10 pb-12 flex justify-between items-end">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">List Gear.</h1>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.3em]">
              Asset Registration / System Protocol 01
            </p>
          </div>
          <div className="text-4xl font-light text-white/5 italic select-none">// ADD_ASSET</div>
        </header>

        <div className="w-full max-w-4xl bg-[#0a0a0a] border border-white/5 p-16">
          {success && (
            <div className="bg-white/5 border border-white/10 text-white p-6 mb-12 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Protocol Success: Equipment Registered</span>
              <button onClick={() => setSuccess(false)} className="text-[10px] uppercase font-black tracking-widest hover:text-white/50">Dismiss</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 group-focus-within:text-white transition-colors">Identification</label>
                <input
                  type="text"
                  required
                  placeholder="NAME OF EQUIPMENT"
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-800"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 group-focus-within:text-white transition-colors">Classification</label>
                <select
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-all uppercase text-xs tracking-widest appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option className="bg-black">Surfboard</option>
                  <option className="bg-black">Wetsuit</option>
                  <option className="bg-black">Leash</option>
                  <option className="bg-black">Fins</option>
                </select>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 group-focus-within:text-white transition-colors">Daily Valuation ($)</label>
              <input
                type="number"
                required
                placeholder="RATING SCALE"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-800"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 group-focus-within:text-white transition-colors">Description</label>
              <textarea
                rows="4"
                placeholder="TECHNICAL SPECIFICATIONS"
                className="w-full bg-transparent border border-white/10 p-6 focus:border-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-800"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4">Visual Documentation</label>
              <div className="relative border border-dashed border-white/10 p-16 text-center hover:border-white/40 transition-all group-hover:bg-white/[0.02]">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-700 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">{file ? file.name : "Attach Image"}</p>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-white text-black font-black uppercase tracking-[0.4em] py-6 transition-all hover:bg-orange-500 hover:text-white text-[10px] disabled:opacity-50"
            >
              {loading ? "Processing..." : "Register Gear"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EquipmentPage;
