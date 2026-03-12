import React, { useState } from "react";
import { createEquipment } from "../services/auth.service";
import Navbar from "../components/Navbar";
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
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="container mx-auto px-6 py-12 flex justify-center">
        <div className="glass max-w-2xl w-full p-8 rounded-3xl">
          <div className="flex items-center space-x-3 mb-8">
            <Package className="text-sky-400 w-8 h-8" />
            <h2 className="text-3xl font-bold text-white">List Your Gear</h2>
          </div>

          {success && (
            <div className="bg-green-500/20 text-green-400 p-4 rounded-xl mb-8 flex items-center justify-between">
              <span>Equipment listed successfully!</span>
              <button onClick={() => setSuccess(false)} className="underline text-sm">Dismiss</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Equipment Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-sky-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                <select
                  className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-sky-500 outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Surfboard</option>
                  <option>Wetsuit</option>
                  <option>Leash</option>
                  <option>Fins</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Price per day ($)</label>
              <input
                type="number"
                required
                className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-sky-500 outline-none"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
              <textarea
                rows="4"
                className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-sky-500 outline-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Equipment Photo</label>
              <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-sky-500 transition-colors">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-slate-500 mb-2" />
                  <p className="text-slate-400">{file ? file.name : "Drag and drop or click to upload"}</p>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  List Equipment
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EquipmentPage;
