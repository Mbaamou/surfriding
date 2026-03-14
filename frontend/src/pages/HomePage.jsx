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
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      const progress = Math.min(scrollY / heroHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getEquipment(search);
        setItems(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [search]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',_sans-serif] overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Scroll Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,${0.1 + scrollProgress * 0.9}), rgba(255,255,255,${0.4 + scrollProgress * 0.6})), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `scale(${1 + scrollProgress * 0.1})`
          }}
        />

        <div 
          className="relative z-10 text-center px-4 max-w-5xl transition-all duration-500 ease-out"
          style={{
            opacity: 1 - scrollProgress * 1.5,
            transform: `translateY(${scrollProgress * 100}px) scale(${1 - scrollProgress * 0.05})`
          }}
        >
          <span className="inline-block text-[10px] font-black uppercase tracking-[1em] mb-6 animate-fade-in text-sky-600">
            {search ? "Search Results" : "Premium Water Gear"}
          </span>
          <h1 className="text-8xl md:text-[12rem] font-black uppercase leading-[0.8] tracking-tighter mb-8 text-gray-900 drop-shadow-sm">
            {search ? search : "The Horizon."}
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Experience the ocean with high-performance equipment designed for those who live on the edge.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="#gear" 
              className="group relative px-16 py-6 overflow-hidden rounded-2xl shadow-xl shadow-sky-500/10"
            >
              <div className="absolute inset-0 bg-sky-500 transition-transform duration-500 group-hover:scale-110"></div>
              <span className="relative z-10 text-white text-[11px] font-black uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                Explore Gear
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-opacity duration-300"
          style={{ opacity: 1 - scrollProgress * 4 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Scroll</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-sky-500 to-transparent"></div>
        </div>
      </section>

      {/* Main Content with dynamic appearance */}
      <main 
        id="gear" 
        className="relative z-20 bg-gray-50 min-h-screen container mx-auto px-8 py-32 rounded-t-[4rem] shadow-2xl"
        style={{
          marginTop: '-10vh'
        }}
      >
        <header className="mb-32 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-sky-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500">Live Inventory</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none text-gray-900">
              Selected <br/> Performance Hardware
            </h2>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.3em]">
              Availability Index: High // System Status: Online
            </p>
          </div>
          <div className="mt-12 md:mt-0 text-right hidden lg:block">
            <span className="text-6xl font-light text-gray-200 italic select-none">// CATALOGUE_2026</span>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-60">
            <div className="w-32 h-[1px] bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-sky-500 animate-loading-bar"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item._id} className="group relative bg-white p-8 transition-all hover:bg-white hover:-translate-y-2 hover:shadow-2xl rounded-3xl border border-gray-100">
                <div className="aspect-[4/5] relative overflow-hidden mb-12 rounded-2xl bg-gray-50">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={`http://localhost:5000${item.images[0]}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300">
                      Asset Image Unavailable
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute top-0 right-0 p-6">
                    <div className="glass text-gray-900 px-4 py-2 text-xs font-black rounded-lg">
                      ${item.pricePerDay}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] text-sky-500 uppercase tracking-widest mb-2 font-black">{item.category || "EQUIPMENT"}</p>
                      <h3 className="text-lg font-black uppercase tracking-tight leading-tight text-gray-900">{item.name}</h3>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:text-sky-500 group-hover:bg-sky-50 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <button className="relative w-full py-5 bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden group/btn rounded-xl transition-all hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/20">
                    <span className="relative z-10 transition-colors">Request Access</span>
                  </button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-gray-200 py-60 text-center rounded-[3rem]">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]"> ! No assets found in current query.</p>
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
