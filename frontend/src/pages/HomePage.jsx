import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getEquipment } from "../services/auth.service";
import Navbar from "../components/Navbar";
import { ArrowUpRight } from "lucide-react";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getEquipment(search);
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [search]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-8 py-20">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <h1 className="text-8xl font-black uppercase leading-none tracking-tighter mb-8">
              {search ? search : "The Coast."}
            </h1>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] max-w-md">
              High-performance gear for those who respect the water. Minimalist ethos. Heuristic rental flow.
            </p>
          </div>
          <div className="mt-12 md:mt-0 text-right">
            <span className="text-4xl font-light text-white/20 italic">01 // SELECT</span>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-12 h-0.5 bg-white animate-pulse"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-1 bg-white/10 border border-white/10">
            {items.map((item) => (
              <div key={item._id} className="bg-black p-8 group relative overflow-hidden transition-all hover:bg-white/5">
                <div className="aspect-[3/4] mb-8 bg-black border border-white/5 relative overflow-hidden">
                  {item.image && (
                    <img 
                      src={`http://localhost:5000/${item.image}`} 
                      alt={item.name}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                  )}
                  <div className="absolute top-4 left-4 mix-blend-difference font-black text-2xl">
                    ${item.price}
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest mb-1">{item.name}</h3>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">{item.category}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-colors">
                  ACQUIRE GEAR
                </button>
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-full bg-black py-40 text-center">
                <p className="text-gray-500 text-xs font-black uppercase tracking-[0.5em]">Nothing found in this current state.</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="mt-40 border-t border-white/10 py-12 px-8 flex justify-between text-[10px] text-gray-600 font-bold uppercase tracking-widest">
        <span>© 2026 SURFRIDING</span>
        <div className="space-x-8">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
