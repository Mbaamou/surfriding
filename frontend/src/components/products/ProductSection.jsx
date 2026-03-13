import React from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ products }) => {
  return (
    <section className="py-24 border-b border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">Individual Gear.</h2>
          <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-[0.4em]">High precision technical equipment</p>
        </div>
        <div className="h-[1px] flex-grow bg-white/10 mx-12 hidden md:block"></div>
        <span className="text-sm font-light italic text-white/20 select-none">/ 02</span>
      </div>
      
      <div className="border-t border-white/5">
        {products && products.length > 0 ? (
          products.map((prod, idx) => <ProductCard key={prod._id || idx} product={{...prod, id: String(idx + 1).padStart(2, '0')}} />)
        ) : (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 border-b border-white/5 animate-pulse"></div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductSection;
