import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="group border-b border-white/5 py-8 flex items-center justify-between transition-all hover:bg-white/[0.02] px-4">
      <div className="flex items-center gap-12">
        <span className="text-zinc-700 text-[10px] font-black font-mono">/ {product.id || "00"}</span>
        <div>
          <h4 className="text-lg font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform">{product.name}</h4>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{product.brand || "Selection"}</p>
        </div>
      </div>
      <div className="flex items-center gap-16">
        <div className="text-right hidden sm:block">
            <span className="block text-[8px] text-zinc-600 uppercase font-bold mb-1">Stock</span>
            <span className="text-xs font-mono">{product.stock || "In Store"}</span>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest border border-white/10 px-6 py-3 hover:bg-white hover:text-black transition-all">
          Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
