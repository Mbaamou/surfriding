import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageSection from '../components/packages/PackageSection';
import ProductSection from '../components/products/ProductSection';
import BrandGrid from '../components/brands/BrandGrid';
import { usePackages } from '../hooks/usePackages';
import { useProducts } from '../hooks/useProducts';
import mockData from '../data/rentals.json';

const RentalsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  const { packages, loading: pkgLoading } = usePackages(search);
  const { products, loading: prodLoading } = useProducts(search);

  // Mock data for initial presentation if API is empty
  const mockPackages = mockData.packages;
  const mockProducts = mockData.products;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',_sans-serif]">
      <Navbar />

      {/* Hero Header */}
      <header className="pt-40 pb-20 border-b border-gray-100 overflow-hidden relative bg-gray-50">
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-600 block mb-6 animate-fade-in">Inventory / Rentals</span>
              <h1 className="text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4 text-gray-900">
                Elite Gear.
              </h1>
            </div>
            <div className="text-right md:pb-12">
              <p className="text-gray-400 text-[11px] font-medium uppercase tracking-[0.3em] max-w-xs ml-auto leading-relaxed">
                Professional grade equipment for those who demand excellence in every swell.
              </p>
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-sky-200 opacity-[0.1] rounded-full blur-3xl pointer-events-none"></div>
      </header>

      <main className="container mx-auto px-8 bg-white min-h-screen">
        <div className="py-24">
          <PackageSection packages={packages.length > 0 ? packages : mockPackages} />
          <ProductSection products={products.length > 0 ? products : mockProducts} />
          <BrandGrid brands={[]} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RentalsPage;
