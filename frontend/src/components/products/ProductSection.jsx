import React from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ products }) => {
  return (
    <section className="py-24 border-b border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-gray-900">Individual Gear.</h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">High precision technical equipment</p>
        </div>
        <div className="h-[2px] flex-grow bg-gray-100 mx-12 hidden md:block"></div>
        <span className="text-sm font-light italic text-gray-200 select-none">/ 02</span>
      </div>
      
      <div className="border-t border-gray-100">
        {products && products.length > 0 ? (
          products.map((prod, idx) => <ProductCard key={prod._id || idx} product={{...prod, id: String(idx + 1).padStart(2, '0')}} />)
        ) : (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 border-b border-gray-50 animate-pulse bg-gray-50/50 rounded-2xl mb-4"></div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductSection;
