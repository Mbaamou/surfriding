import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";

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
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="border border-white/10 max-w-md w-full p-12 bg-black">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center text-white">Welcome Back</h2>
        {error && <p className="bg-white/5 border border-white/10 text-white p-4 mb-8 text-[10px] font-black uppercase tracking-widest">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Identification</label>
            <input
              type="email"
              required
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b border-white/20 py-3 px-4 focus:border-white outline-none transition-colors uppercase text-xs tracking-widest placeholder:text-gray-800"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Access Key</label>
            <input
              type="password"
              required
              placeholder="PASSWORD"
              className="w-full bg-transparent border-b border-white/20 py-3 px-4 focus:border-white outline-none transition-colors uppercase text-xs tracking-widest placeholder:text-gray-800"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-5 transition-all hover:bg-gray-200 text-[10px]">
            Authenticate
          </button>
        </form>
        
        <div className="mt-12 space-y-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
            No account? <Link to="/register" className="text-white hover:underline underline-offset-4">Join Us</Link>
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

export default LoginPage;
