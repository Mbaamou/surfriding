import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, LogOut } from "lucide-react";
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
    <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-8 py-6 flex items-center justify-between">
      <Link to="/" className="text-xl font-black uppercase tracking-tighter hover:opacity-80 transition-opacity">
        SurfRiding
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-sm mx-12 relative group">
        <input
          type="text"
          placeholder="SEARCH GEAR"
          className="w-full bg-transparent border-b border-white/20 py-2 px-8 text-sm focus:outline-none focus:border-white transition-colors uppercase tracking-widest placeholder:text-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-0 top-2.5 text-gray-600 group-focus-within:text-white w-4 h-4 transition-colors" />
      </form>

      <div className="flex items-center space-x-10 text-xs font-bold uppercase tracking-widest">
        <Link to="/booking" className="hover:opacity-50 transition-opacity flex items-center">
          <ShoppingBag className="w-4 h-4 mr-2" />
          <span>Cart</span>
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-10">
            <Link to="/equipment" className="hover:opacity-50 transition-opacity underline underline-offset-4">List Gear</Link>
            <button onClick={logout} className="hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-8">
            <Link to="/login" className="hover:opacity-50 transition-opacity">Login</Link>
            <Link to="/register" className="bg-white text-black px-6 py-2 hover:bg-gray-200 transition-colors">
              Join
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
