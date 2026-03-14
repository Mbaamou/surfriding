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
    <section className="py-40 bg-white">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-gray-100 pb-12">
        <div className="max-w-xl">
          <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-sky-500 mb-6">Partnership Protocol</h2>
          <p className="text-5xl font-black uppercase tracking-tighter leading-none text-gray-900">Global Network.</p>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">SPONSORSHIP</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-t border-gray-100">
        {displayBrands.map((brand, idx) => (
          <div key={idx} className="group relative bg-gray-50 aspect-square flex flex-col items-center justify-center border-r border-b border-gray-100 overflow-hidden transition-all duration-500">
            {/* Background Image / Sketch */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000 ease-out">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-sky-50 transition-colors group-hover:bg-transparent" />
            </div>

            {/* Heuristic Overlay Info */}
            <div className="absolute top-4 left-4">
              <span className="text-[8px] font-mono text-gray-300 group-hover:text-sky-500 transition-colors">
                {brand.id || `ID-00${idx + 1}`}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-gray-900 group-hover:translate-y-[-4px] transition-all">
                {brand.name}
              </h3>
              <div className="w-0 h-[2px] bg-sky-500 mx-auto mt-2 group-hover:w-8 transition-all duration-500"></div>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 border-r-2 border-b-2 border-sky-500 opacity-0 group-hover:opacity-100 transition-all translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandGrid;
