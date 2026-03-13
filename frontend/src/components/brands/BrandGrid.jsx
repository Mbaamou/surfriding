import React from 'react';

const BrandGrid = ({ brands }) => {
  const defaultBrands = [
    {
      name: "Quiksilver",
      logo: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=400",
      id: "QS-01"
    },
    {
      name: "Rip Curl",
      logo: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=400",
      id: "RC-02"
    },
    {
      name: "Billabong",
      logo: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=400",
      id: "BB-03"
    },
    {
      name: "O'Neill",
      logo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
      id: "ON-04"
    },
    {
      name: "Hurley",
      logo: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=400",
      id: "HR-05"
    },
    {
      name: "Roxy",
      logo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
      id: "RX-06"
    }
  ];

  const displayBrands = brands && brands.length > 0 ? brands : defaultBrands;

  return (
    <section className="py-40">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-white/5 pb-12">
        <div className="max-w-xl">
          <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-orange-600 mb-6">Partnership Protocol</h2>
          <p className="text-4xl font-black uppercase tracking-tighter leading-none">Global Network.</p>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">SPONSORSHIP</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 border-l border-t border-white/5">
        {displayBrands.map((brand, idx) => (
          <div key={idx} className="group relative bg-black aspect-square flex flex-col items-center justify-center border-r border-b border-white/5 overflow-hidden heuristic-transition">
            {/* Background Image / Sketch */}
            <div className="absolute inset-0 opacity-20 grayscale group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Heuristic Overlay Info */}
            <div className="absolute top-4 left-4">
              <span className="text-[8px] font-mono text-white/20 group-hover:text-orange-500 transition-colors">
                {brand.id || `ID-00${idx + 1}`}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white opacity-40 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all">
                {brand.name}
              </h3>
              <div className="w-0 h-[1px] bg-white mx-auto mt-2 group-hover:w-8 transition-all duration-500"></div>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandGrid;
