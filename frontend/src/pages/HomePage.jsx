import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getEquipment } from "../services/auth.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";

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
    <div className="min-h-screen bg-black text-white font-['Inter',_sans-serif]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.6em] mb-6 animate-fade-in opacity-70">
            Premium Water Gear
          </span>
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-8 drop-shadow-2xl">
            {search ? `Searching: ${search}` : "The Horizon."}
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
            Experience the ocean with high-performance equipment designed for those who live on the edge.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#gear" className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-orange-500 hover:text-white hover:scale-105">
              Explore Gear
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      <main id="gear" className="container mx-auto px-8 py-32">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">
              Current Inventory
            </h2>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.3em]">
              Selected Performance Hardware / Availability: Active
            </p>
          </div>
          <div className="mt-12 md:mt-0 text-right">
            <span className="text-4xl font-light text-white/10 italic">// COLLECTION_01</span>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-white animate-loading-bar"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item._id} className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all hover:border-white/20">
                <div className="aspect-[4/5] relative overflow-hidden">
                  {item.image ? (
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-[10px] uppercase tracking-widest text-white/20">
                      No Image Available
                    </div>
                  )}

                  {/* Glass Card Info Overlay */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-black">
                    ${item.price}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-2">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-[1px] bg-orange-500"></span>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest">{item.category}</p>
                      </div>
                    </div>
                  </div>

                  <button className="relative w-full py-5 bg-transparent border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden group/btn">
                    <span className="relative z-10 transition-colors group-hover/btn:text-black">Acquire Gear</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="col-span-full border border-dashed border-white/10 py-60 text-center">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]"> ! No assets found in current query.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
