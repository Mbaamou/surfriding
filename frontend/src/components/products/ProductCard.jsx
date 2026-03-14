import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="group border-b border-gray-100 py-10 flex items-center justify-between transition-all hover:bg-gray-50 px-6 rounded-2xl md:mx-[-1.5rem]">
      <div className="flex items-center gap-6 md:gap-12">
        <span className="text-gray-200 text-[10px] font-black font-mono group-hover:text-sky-500 transition-colors">/ {product.id || "00"}</span>
        <div>
          <h4 className="text-xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform text-gray-900">{product.name}</h4>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.brand || "Selection"}</p>
        </div>
      </div>
      <div className="flex items-center gap-8 md:gap-16">
        <div className="text-right hidden sm:block">
            <span className="block text-[8px] text-gray-300 uppercase font-black mb-1">Stock Status</span>
            <span className="text-xs font-mono font-bold text-gray-600">{product.stock || "In Store"}</span>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest bg-white border border-gray-200 px-8 py-4 hover:border-sky-500 hover:text-sky-500 transition-all rounded-xl shadow-sm">
          Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
