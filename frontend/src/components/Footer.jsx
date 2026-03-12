import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-40 border-t border-white/5 py-24 px-12 bg-[#050505]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <Link to="/" className="text-2xl font-black uppercase tracking-tighter mb-6 block hover:opacity-70 transition-opacity">
            SurfRiding
          </Link>
          <p className="text-[10px] text-gray-500 leading-loose uppercase tracking-widest">
            Design and performance equipment for the modern oceanic aesthetic. Born out of a necessity for better tools.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/30">Navigation</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Catalog</Link></li>
              <li><Link to="/booking" className="hover:text-orange-500 transition-colors">Rentals</Link></li>
              <li><Link to="/equipment" className="hover:text-orange-500 transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/30">Connect</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Facebook</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/30">Legal</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">
        <div className="flex items-center gap-8">
          <span>© 2026 SURFRIDING INC.</span>
          <span className="opacity-30">//</span>
          <span>Designed by Mbaamou</span>
        </div>
        <div className="flex items-center gap-12">
          <span>All Rights Reserved</span>
          <div className="flex gap-2">
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
