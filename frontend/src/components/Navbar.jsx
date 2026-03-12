import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, LogOut, Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 px-12 py-8 flex items-center justify-between transition-all duration-500">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-black uppercase tracking-[-0.1em] hover:opacity-70 transition-all flex items-center gap-2">
          <div className="w-8 h-8 bg-white flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rotate-45"></div>
          </div>
          SurfRiding
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Catalog</Link>
          <Link to="/booking" className="hover:text-white transition-colors">Rentals</Link>
          <Link to="/equipment" className="hover:text-white transition-colors">Partners</Link>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-sm mx-12 relative group hidden md:block">
        <input
          type="text"
          placeholder="SEARCH ASSETS"
          className="w-full bg-transparent border-b border-white/10 py-2 px-8 text-[10px] font-black focus:outline-none focus:border-white/40 transition-all uppercase tracking-[0.2em] placeholder:text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-0 top-2 text-gray-700 group-focus-within:text-white w-4 h-4 transition-colors" />
      </form>

      <div className="flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em]">
        <Link to="/booking" className="hover:text-gray-400 transition-all flex items-center gap-3 relative group">
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Bag [0]</span>
          <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></div>
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-10">
            <Link to="/equipment" className="bg-white/5 border border-white/10 px-6 py-3 hover:bg-white hover:text-black transition-all">List gear</Link>
            <button onClick={logout} className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-500">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-10">
            <Link to="/login" className="hover:text-white text-gray-400 transition-colors">Login</Link>
            <Link to="/register" className="bg-white text-black px-10 py-4 hover:bg-orange-500 hover:text-white transition-all scale-100 hover:scale-105">
              Join
            </Link>
          </div>
        )}
        
        <button className="lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
