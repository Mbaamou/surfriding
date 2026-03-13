import React from 'react';

const PackageCard = ({ item }) => {
  return (
    <div className="group relative bg-zinc-900 border border-white/5 overflow-hidden transition-all hover:border-white/20">
      <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
        <img 
          src={item.image || "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop"} 
          alt={item.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight uppercase">{item.name}</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.category}</p>
          </div>
          <span className="text-lg font-black tracking-tighter">${item.price}</span>
        </div>
        <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest transition-all hover:bg-orange-600 hover:text-white">
          Rent Package
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
