import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, LogOut, Menu, ChevronDown } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [showGearCard, setShowGearCard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/rentals" },
    { name: "My Bookings", path: "/booking" },
    { name: "Partners", path: "/equipment" },
  ];

  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-2xl sticky top-0 z-50 px-6 md:px-12 py-5 md:py-6 flex items-center justify-between transition-all duration-500">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-xl md:text-2xl font-black uppercase tracking-[-0.1em] hover:text-sky-500 transition-all flex items-center gap-3 text-gray-900">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-sky-500 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500 rounded-lg">
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white rotate-45"></div>
          </div>
          <span className="hidden sm:block">SurfRiding</span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
          <div 
            className="relative"
            onMouseEnter={() => setShowGearCard(true)}
            onMouseLeave={() => setShowGearCard(false)}
          >
            <button className="cursor-pointer flex items-center gap-2 hover:text-sky-500 transition-colors">
              Gear <ChevronDown className={`w-3 h-3 transition-transform ${showGearCard ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dynamic Gear Card */}
            {showGearCard && (
              <div className="absolute top-full left-0 mt-4 w-72 bg-white border border-gray-100 p-6 animate-fade-in z-50 shadow-2xl rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <span className="text-[8px] text-gray-400 tracking-[0.4em]">Featured Assets</span>
                    <ShoppingBag className="w-3 h-3 text-sky-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4 items-center group cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="w-12 h-12 bg-sky-50 rounded-lg overflow-hidden flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-sky-200" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-900 group-hover:text-sky-600 transition-colors">Pro-Carbon Wing</p>
                        <p className="text-[7px] text-gray-400">NEW ARRIVAL</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center group cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="w-12 h-12 bg-sky-50 rounded-lg overflow-hidden flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-sky-200" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-900 group-hover:text-sky-600 transition-colors">Apex Foil Set</p>
                        <p className="text-[7px] text-gray-400">IN STOCK</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/rentals" className="block w-full text-center py-3 bg-sky-500 text-white text-[8px] font-black uppercase tracking-widest hover:bg-sky-600 transition-all rounded-xl shadow-lg shadow-sky-500/20">
                    View Catalog
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/rentals" className="hover:text-sky-500 transition-colors">Catalog</Link>
          <Link to="/booking" className="hover:text-sky-500 transition-colors">My Bookings</Link>
          <Link to="/equipment" className="hover:text-sky-500 transition-colors">Partners</Link>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-12 hidden md:block">
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            placeholder="Search Protocol..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-full px-12 py-3 text-[10px] uppercase font-black tracking-widest outline-none focus:bg-white focus:border-sky-500 focus:shadow-xl focus:shadow-sky-500/5 transition-all text-gray-600"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-sky-500 transition-colors" />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-2 rounded-full opacity-0 group-focus-within:opacity-100 transition-all">
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
          </button>
        </form>
      </div>

      <div className="flex items-center space-x-6 md:space-x-12 text-[10px] font-black uppercase tracking-[0.3em]">
        <Link to="/profile" className="hidden sm:flex items-center gap-3 relative group text-gray-900">
          <User className="w-4 h-4" />
          <span className="hidden lg:inline">Profile</span>
          <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-sky-500 transition-all group-hover:w-full"></div>
        </Link>
        
        {user ? (
          <div className="hidden lg:flex items-center space-x-10">
            <Link to="/equipment" className="bg-sky-50 text-sky-600 border border-sky-100 px-6 py-3 hover:bg-sky-500 hover:text-white transition-all rounded-xl font-black">List gear</Link>
            <button onClick={logout} className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-10">
            <Link to="/login" className="hover:text-sky-500 text-gray-400 transition-colors uppercase tracking-[0.3em]">Login</Link>
            <Link to="/register" className="bg-sky-500 text-white px-8 md:px-10 py-4 hover:bg-sky-600 transition-all scale-100 hover:scale-105 rounded-xl shadow-lg shadow-sky-500/20">
              Join
            </Link>
          </div>
        )}
        
        <button 
          className="lg:hidden p-2 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[100] transition-all duration-700 ease-[cubic-bezier(0.19, 1, 0.22, 1)] lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-16">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-[-0.1em] text-gray-900">
              SurfRiding
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-sky-500 transition-colors"
            >
              <LogOut className="w-6 h-6 rotate-180" />
            </button>
          </div>

          <form onSubmit={handleSearch} className="relative mb-12">
            <input 
              type="text" 
              placeholder="System Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-5 text-xs uppercase font-black tracking-widest outline-none focus:bg-white focus:border-sky-500 transition-all text-gray-600"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </form>

          <div className="space-y-4 flex flex-col items-center overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-gray-900 hover:text-sky-500 transition-colors py-4 px-8 w-full text-center border-b border-gray-50"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-12 w-full space-y-4">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block w-full py-6 bg-gray-50 text-gray-900 text-center rounded-3xl font-black uppercase tracking-widest">My Profile</Link>
                  <Link to="/equipment" onClick={() => setMobileMenuOpen(false)} className="block w-full py-6 bg-sky-50 text-sky-600 text-center rounded-3xl font-black uppercase tracking-widest">List Gear</Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full py-6 bg-red-50 text-red-500 rounded-3xl font-black uppercase tracking-widest">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full py-6 bg-sky-500 text-white text-center rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20">Join Now</Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-6 bg-gray-50 text-gray-400 text-center rounded-3xl font-black uppercase tracking-widest">Login</Link>
                </>
              )}
            </div>
          </div>

          <div className="mt-auto text-center pt-8">
            <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.5em]">© 2026 SURFRIDING INC.</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
