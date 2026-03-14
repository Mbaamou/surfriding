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
    data.append("pricePerDay", formData.price); // Changed from formData.pricePerDay to formData.price
    if (file) data.append("images", file);

    try {
      await createEquipment(data);
      setSuccess(true);
      setFormData({ name: "", description: "", price: "", category: "Surfboard" }); // Reset category as well
      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-['Inter',_sans-serif]">
      <Navbar />
      <main className="container mx-auto px-8 py-32 flex flex-col items-center">
        <header className="mb-24 w-full max-w-4xl border-b border-gray-200 pb-12 flex justify-between items-end">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-gray-900">List Gear.</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
              Asset Registration / System Protocol 01
            </p>
          </div>
          <div className="text-4xl font-light text-gray-200 italic select-none hidden md:block">// ADD_ASSET</div>
        </header>

        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-[3rem] border border-gray-100 p-12 md:p-16 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-sky-500"></div>

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 p-6 mb-12 flex items-center justify-between rounded-2xl shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest">Protocol Success: Equipment Registered</span>
              <button onClick={() => setSuccess(false)} className="text-[10px] uppercase font-black tracking-widest hover:text-emerald-800">Dismiss</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 group-focus-within:text-sky-500 transition-colors">Identification</label>
                <input
                  type="text"
                  required
                  placeholder="NAME OF EQUIPMENT"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:border-sky-500 focus:bg-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 group-focus-within:text-sky-500 transition-colors">Classification</label>
                <div className="relative">
                  <select
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:border-sky-500 focus:bg-white outline-none transition-all uppercase text-xs tracking-widest appearance-none cursor-pointer text-gray-600"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Surfboard</option>
                    <option>Wetsuit</option>
                    <option>Leash</option>
                    <option>Fins</option>
                  </select>
                  <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 group-focus-within:text-sky-500 transition-colors">Daily Valuation ($)</label>
              <input
                type="number"
                required
                placeholder="RATING SCALE"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:border-sky-500 focus:bg-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-200"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 group-focus-within:text-sky-500 transition-colors">Description</label>
              <textarea
                rows="4"
                placeholder="TECHNICAL SPECIFICATIONS"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 focus:border-sky-500 focus:bg-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-200"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Visual Documentation</label>
              <div className="relative border-2 border-dashed border-gray-100 p-16 text-center hover:border-sky-300 transition-all group-hover:bg-sky-50/20 rounded-[2rem]">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-sky-500" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{file ? file.name : "Attach High-Res Image"}</p>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-sky-500 text-white font-black uppercase tracking-[0.4em] py-8 transition-all hover:bg-sky-600 shadow-xl shadow-sky-500/20 rounded-2xl text-[11px] disabled:opacity-50"
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
