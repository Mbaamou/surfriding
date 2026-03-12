import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="border border-white/10 max-w-md w-full p-12 bg-black">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center text-white">Create Account</h2>
        {error && <p className="bg-white/5 border border-white/10 text-white p-4 mb-8 text-[10px] font-black uppercase tracking-widest">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-transparent border-b border-white/20 py-3 px-4 focus:border-white outline-none transition-colors uppercase text-xs tracking-widest"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-transparent border-b border-white/20 py-3 px-4 focus:border-white outline-none transition-colors uppercase text-xs tracking-widest"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-transparent border-b border-white/20 py-3 px-4 focus:border-white outline-none transition-colors uppercase text-xs tracking-widest"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-5 transition-all hover:bg-gray-200 text-[10px]">
            Execute Registration
          </button>
        </form>
        
        <div className="mt-12 space-y-4">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-600">
            Already have an account? <Link to="/login" className="text-white hover:underline underline-offset-4">Login</Link>
          </p>
          
          <Link 
            to="/" 
            className="flex items-center justify-center w-full border border-white/10 text-white font-black uppercase tracking-[0.3em] py-4 transition-all hover:bg-white/5 text-[10px]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
