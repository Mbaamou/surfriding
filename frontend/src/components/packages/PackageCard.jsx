import React from 'react';

const PackageCard = ({ item }) => {
  return (
    <div className="group relative bg-white border border-gray-100 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 rounded-[2rem]">
      <div className="aspect-[16/10] overflow-hidden transition-all duration-700 rounded-t-[2rem]">
        <img 
          src={item.image || "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop"} 
          alt={item.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-black tracking-tight uppercase text-gray-900">{item.name}</h3>
            <p className="text-[10px] text-sky-500 font-bold uppercase tracking-widest">{item.category}</p>
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900">${item.price}</span>
        </div>
        <button className="w-full py-4 bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-sky-500 hover:text-white rounded-xl shadow-sm">
          Rent Package
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
