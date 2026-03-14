import React from 'react';
import PackageCard from './PackageCard';

const PackageSection = ({ packages }) => {
  return (
    <section className="py-24 border-b border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-gray-900">Elite Packages.</h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">Curated gear for ultimate performance</p>
        </div>
        <div className="h-[2px] flex-grow bg-gray-100 mx-12 hidden md:block"></div>
        <span className="text-sm font-light italic text-gray-200 select-none">/ 01</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
        {packages && packages.length > 0 ? (
          packages.map((pkg) => <PackageCard key={pkg._id} item={pkg} />)
        ) : (
          [1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-50 border border-gray-100 aspect-[16/10] rounded-[2rem]"></div>
          ))
        )}
      </div>
    </section>
  );
};

export default PackageSection;
