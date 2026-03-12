import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',_sans-serif] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="border border-white/10 max-w-md w-full p-16 bg-[#0a0a0a] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <header className="mb-12 text-center">
             <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Welcome.</h2>
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">Enter Credentials to Proceed</p>
          </header>

          {error && <p className="bg-white/5 border border-white/10 text-orange-500 p-4 mb-8 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2 group-focus-within:text-white transition-colors">Identification</label>
              <input
                type="email"
                required
                placeholder="EMAIL@DOMAIN.COM"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-800"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2 group-focus-within:text-white transition-colors">Security Key</label>
              <input
                type="password"
                required
                placeholder="********"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-white outline-none transition-all uppercase text-xs tracking-widest placeholder:text-gray-800"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button className="w-full bg-white text-black font-black uppercase tracking-[0.4em] py-6 transition-all hover:bg-orange-500 hover:text-white text-[10px]">
              Authenticate
            </button>
          </form>
          
          <div className="mt-12 pt-12 border-t border-white/5 space-y-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
              No access? <Link to="/register" className="text-white hover:text-orange-500 transition-colors">Request Account</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
