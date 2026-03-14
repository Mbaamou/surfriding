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
        const profileData = res.data.data;
        setProfile(profileData);
        setFormData({ name: profileData.name, email: profileData.email });
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
      setProfile(res.data.data);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully." });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Update failed." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-16 h-[2px] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-500 animate-loading-bar"></div>
      </div>
    </div>
  );

  if (!profile && !authUser) return null;
  const user = profile || authUser;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',_sans-serif] flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 md:px-8 py-32">
        <header className="mb-20 border-l-[4px] border-sky-500 pl-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-gray-900">Account.</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Member Security / Personal Identity</p>
          </div>
          {message.text && (
            <div className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 border rounded-2xl shadow-sm transition-all animate-fade-in ${
              message.type === 'success' ? 'border-emerald-100 text-emerald-600 bg-emerald-50' : 'border-red-100 text-red-500 bg-red-50'
            }`}>
              {message.text}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-50 border border-gray-100 p-12 text-center relative overflow-hidden group rounded-[3rem] shadow-sm">
               <div className="w-32 h-32 bg-white border border-gray-100 mx-auto mb-8 flex items-center justify-center relative z-10 rounded-[2rem] shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                  <User className="w-12 h-12 text-gray-200 group-hover:text-sky-500 transition-colors duration-500" />
               </div>
               <h2 className="text-2xl font-black uppercase tracking-tight mb-2 text-gray-900">{user.name || "MEMBER"}</h2>
               <p className="text-[10px] text-sky-500 font-black uppercase tracking-widest mb-8">{user.email}</p>
               
               <div className="pt-8 border-t border-gray-100 flex justify-center gap-12">
                  <div className="text-center">
                    <span className="block text-[8px] text-gray-300 uppercase font-black mb-1">Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Active</span>
                  </div>
                  <div className="w-[1px] h-8 bg-gray-100"></div>
                  <div className="text-center">
                    <span className="block text-[8px] text-gray-300 uppercase font-black mb-1">Role</span>
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Alpha</span>
                  </div>
               </div>
            </div>
            
            <div className="p-8 bg-sky-50 border border-sky-100 rounded-[2rem] relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-2">Member Support</p>
                 <p className="text-xs text-sky-400 leading-relaxed font-medium">Need help with your equipment or account settings? Our team is available 24/7 for our Wave-Elite members.</p>
               </div>
               <Shield className="absolute -right-4 -bottom-4 w-24 h-24 text-sky-100/50" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleUpdate} className="bg-white border border-gray-100 divide-y divide-gray-50 shadow-2xl shadow-sky-500/[0.05] rounded-[3rem] overflow-hidden">
               {/* Name Field */}
               <div className="p-10 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-8 w-full max-w-lg">
                     <div className="w-14 h-14 bg-gray-50 group-hover:bg-white flex items-center justify-center border border-gray-100 rounded-2xl transition-colors">
                        <User className="w-6 h-6 text-gray-300 group-hover:text-sky-500 transition-colors" />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Legal Name</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            className="w-full bg-transparent border-b-2 border-gray-100 py-3 text-xl font-black uppercase tracking-tight focus:outline-none focus:border-sky-500 transition-all text-gray-900"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        ) : (
                          <p className="text-xl font-black uppercase tracking-tight text-gray-900">{user.name}</p>
                        )}
                     </div>
                  </div>
               </div>

               {/* Email Field */}
               <div className="p-10 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-8 w-full max-w-lg">
                     <div className="w-14 h-14 bg-gray-50 group-hover:bg-white flex items-center justify-center border border-gray-100 rounded-2xl transition-colors">
                        <Mail className="w-6 h-6 text-gray-300 group-hover:text-sky-500 transition-colors" />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Digital Identity</p>
                        {isEditing ? (
                          <input 
                            type="email" 
                            className="w-full bg-transparent border-b-2 border-gray-100 py-3 text-xl font-black uppercase tracking-tight focus:outline-none focus:border-sky-500 transition-all text-gray-900"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        ) : (
                          <p className="text-xl font-black uppercase tracking-tight text-gray-900">{user.email}</p>
                        )}
                     </div>
                  </div>
               </div>

               {/* Read-only Access Tier */}
               <div className="p-10 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-8">
                     <div className="w-14 h-14 bg-gray-50 group-hover:bg-white flex items-center justify-center border border-gray-100 rounded-2xl transition-colors">
                        <Shield className="w-6 h-6 text-gray-300 group-hover:text-sky-500 transition-colors" />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Access Tier</p>
                        <p className="text-xl font-black uppercase tracking-tight text-gray-900">Wave-Elite Member</p>
                     </div>
                  </div>
                  <div className="px-5 py-2 bg-emerald-50 border border-emerald-100 text-[10px] font-black uppercase tracking-widest text-emerald-600 rounded-full italic">Verified</div>
               </div>

               {/* Action Bar */}
               <div className="p-10 bg-gray-50/50 flex flex-col sm:flex-row justify-end gap-6">
                  {isEditing ? (
                    <>
                      <button 
                        type="button"
                        onClick={() => { setIsEditing(false); setFormData({name: user.name, email: user.email}); }}
                        className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all py-4 px-8 rounded-2xl bg-white border border-gray-100"
                      >
                        <X className="w-3 h-3" /> Abort
                      </button>
                      <button 
                        type="submit"
                        disabled={updating}
                        className="flex items-center justify-center gap-3 bg-sky-500 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-sky-600 transition-all disabled:opacity-50 rounded-2xl shadow-lg shadow-sky-500/20"
                      >
                        {updating ? "Syncing..." : <><Check className="w-3 h-3" /> Commit Session</>}
                      </button>
                    </>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-12 py-5 bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:border-sky-500 hover:text-sky-500 transition-all text-gray-900 rounded-2xl shadow-sm"
                    >
                      Initialize Edit Mode
                    </button>
                  )}
               </div>
            </form>
            
            <div className="mt-12 p-8 border border-dashed border-gray-200 text-center rounded-[2rem]">
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-4">End User Encryption Active</p>
               <p className="text-[8px] text-gray-200 uppercase tracking-[0.5em] font-black">All personal data is encrypted via modern high-performance protocols</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
