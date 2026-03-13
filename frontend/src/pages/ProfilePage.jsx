import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../services/auth.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Mail, Shield, Calendar, Settings, ChevronRight, Check, X } from "lucide-react";

const ProfilePage = () => {
  const { user: authUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setProfile(res.data);
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: "", text: "" });
    
    try {
      const res = await updateUserProfile(formData);
      setProfile(res.data);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully." });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.msg || "Update failed." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-[1px] bg-black animate-pulse"></div>
    </div>
  );

  if (!profile && !authUser) return null;
  const user = profile || authUser;

  return (
    <div className="min-h-screen bg-white text-black font-['Inter',_sans-serif] flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-8 py-32">
        <header className="mb-20 border-l border-zinc-900 pl-8 flex justify-between items-end">
          <div>
            <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 text-black">Account.</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Member Security / Personal Identity</p>
          </div>
          {message.text && (
            <div className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 border transition-all animate-fade-in ${
              message.type === 'success' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 'border-red-500/30 text-red-500 bg-red-500/5'
            }`}>
              {message.text}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-50 border border-zinc-100 p-12 text-center relative overflow-hidden group">
               <div className="w-32 h-32 bg-white border border-zinc-100 mx-auto mb-8 flex items-center justify-center relative z-10">
                  <User className="w-12 h-12 text-zinc-200 group-hover:text-black transition-colors duration-500" />
               </div>
               <h2 className="text-2xl font-black uppercase tracking-tight mb-2 text-black">{user.name || "MEMBER"}</h2>
               <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-8">{user.email}</p>
               
               <div className="pt-8 border-t border-zinc-100 flex justify-center gap-6">
                  <div className="text-center">
                    <span className="block text-[8px] text-zinc-400 uppercase font-black mb-1">Status</span>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Active</span>
                  </div>
                  <div className="w-[1px] h-8 bg-zinc-100"></div>
                  <div className="text-center">
                    <span className="block text-[8px] text-zinc-400 uppercase font-black mb-1">Role</span>
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">Alpha</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleUpdate} className="bg-white border border-zinc-100 divide-y divide-zinc-100 shadow-2xl shadow-black/[0.01]">
               {/* Name Field */}
               <div className="p-10 flex items-center justify-between group">
                  <div className="flex items-center gap-8 w-full max-w-lg">
                     <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center border border-zinc-100">
                        <User className="w-5 h-5 text-zinc-400" />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Legal Name</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-zinc-200 py-2 text-lg font-bold uppercase tracking-tight focus:outline-none focus:border-black transition-all text-black"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        ) : (
                          <p className="text-lg font-bold uppercase tracking-tight text-black">{user.name}</p>
                        )}
                     </div>
                  </div>
               </div>

               {/* Email Field */}
               <div className="p-10 flex items-center justify-between group">
                  <div className="flex items-center gap-8 w-full max-w-lg">
                     <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center border border-zinc-100">
                        <Mail className="w-5 h-5 text-zinc-400" />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Digital Identity</p>
                        {isEditing ? (
                          <input 
                            type="email" 
                            className="w-full bg-transparent border-b border-zinc-200 py-2 text-lg font-bold uppercase tracking-tight focus:outline-none focus:border-black transition-all text-black"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        ) : (
                          <p className="text-lg font-bold uppercase tracking-tight text-black">{user.email}</p>
                        )}
                     </div>
                  </div>
               </div>

               {/* Read-only Access Tier */}
               <div className="p-10 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                     <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center border border-zinc-100">
                        <Shield className="w-5 h-5 text-zinc-400" />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Access Tier</p>
                        <p className="text-lg font-bold uppercase tracking-tight text-black">Enterprise Member</p>
                     </div>
                  </div>
                  <div className="px-4 py-2 border border-zinc-200 text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">Verified</div>
               </div>

               {/* Action Bar */}
               <div className="p-10 bg-zinc-50 flex justify-end gap-6">
                  {isEditing ? (
                    <>
                      <button 
                        type="button"
                        onClick={() => { setIsEditing(false); setFormData({name: user.name, email: user.email}); }}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-all"
                      >
                        <X className="w-3 h-3" /> Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={updating}
                        className="flex items-center gap-3 bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-600 transition-all disabled:opacity-50"
                      >
                        {updating ? "Processing" : <><Check className="w-3 h-3" /> Commit Changes</>}
                      </button>
                    </>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-12 py-4 border border-zinc-200 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all text-black"
                    >
                      Initialize Edit Mode
                    </button>
                  )}
               </div>
            </form>
            
            <div className="mt-12 p-8 border border-dashed border-zinc-200 text-center">
               <p className="text-[9px] text-zinc-300 font-black uppercase tracking-[0.3em] mb-4">End User Encryption Active</p>
               <p className="text-[8px] text-zinc-200 uppercase tracking-widest">All personal data is encrypted via AES-256 protocols</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
