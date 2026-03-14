import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      const { user, token } = res.data.data;
      login(user, token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',_sans-serif] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-6 bg-gray-50">
        <div className="max-w-md w-full p-16 bg-white shadow-2xl rounded-[3rem] border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-sky-500"></div>
          
          <header className="mb-12 text-center">
             <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-gray-900">Join Us.</h2>
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Register as a Partner</p>
          </header>

          {error && <p className="bg-red-50 border border-red-100 text-red-500 p-4 mb-8 text-[10px] font-black uppercase tracking-widest text-center rounded-xl">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-sky-500 transition-colors">Full Name</label>
              <input
                type="text"
                required
                placeholder="FIRST LAST"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:border-sky-500 focus:bg-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-200"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-sky-500 transition-colors">Identification</label>
              <input
                type="email"
                required
                placeholder="EMAIL@DOMAIN.COM"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:border-sky-500 focus:bg-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-200"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-sky-500 transition-colors">Security Key</label>
              <input
                type="password"
                required
                placeholder="********"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:border-sky-500 focus:bg-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-200"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button className="w-full bg-sky-500 text-white font-black uppercase tracking-[0.4em] py-6 transition-all hover:bg-sky-600 shadow-lg shadow-sky-500/20 rounded-2xl text-[10px]">
              Execute Registration
            </button>
          </form>
          
          <div className="mt-12 pt-12 border-t border-gray-50 space-y-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Existing account? <Link to="/login" className="text-sky-500 hover:text-sky-600 transition-colors">Authenticate</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
