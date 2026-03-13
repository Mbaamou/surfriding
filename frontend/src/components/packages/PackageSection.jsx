import React from 'react';
import PackageCard from './PackageCard';

const PackageSection = ({ packages }) => {
  return (
    <section className="py-24 border-b border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">Elite Packages.</h2>
          <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-[0.4em]">Curated gear for ultimate performance</p>
        </div>
        <div className="h-[1px] flex-grow bg-white/10 mx-12 hidden md:block"></div>
        <span className="text-sm font-light italic text-white/20 select-none">/ 01</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages && packages.length > 0 ? (
          packages.map((pkg) => <PackageCard key={pkg._id} item={pkg} />)
        ) : (
          [1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-zinc-900 border border-white/5 aspect-[16/10]"></div>
          ))
        )}
      </div>
    </section>
  );
};

export default PackageSection;
