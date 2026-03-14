import React, { useState, useEffect } from "react";
import { getBookings } from "../services/auth.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Tag, CheckCircle, ArrowRight } from "lucide-react";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookings();
        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',_sans-serif]">
      <Navbar />
      <main className="container mx-auto px-8 py-32">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-12">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-gray-900">
              Your Rentals.
            </h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
              Active Contracts / Historical Records
            </p>
          </div>
          <div className="mt-12 md:mt-0 text-right">
            <span className="text-4xl font-light text-gray-50 italic select-none hidden md:block">// TRANSACTIONS</span>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-16 h-[2px] bg-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-sky-500 animate-loading-bar"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="group relative bg-white border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between transition-all hover:shadow-2xl hover:-translate-y-1 rounded-[2.5rem] overflow-hidden">
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 w-full md:w-auto">
                  <div className="w-40 h-40 bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 rounded-[2rem]">
                    {booking.equipment?.images && booking.equipment.images.length > 0 ? (
                      <img 
                        src={`http://localhost:5000${booking.equipment.images[0]}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                        alt="Gear"
                      />
                    ) : (
                       <Package className="w-8 h-8 text-gray-200" />
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                       <span className="text-[9px] font-black uppercase tracking-widest text-sky-500 bg-sky-50 px-3 py-1 rounded-full">#{booking._id.slice(-6)}</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-gray-900">{booking.equipment?.name || "Equipment"}</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">
                      {new Date(booking.startDate).toLocaleDateString()} <ArrowRight className="inline w-3 h-3 mx-2 text-sky-500" /> {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 md:mt-0 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-gray-50 pt-8 md:pt-0 md:pl-16">
                  <div className="text-center md:text-right">
                    <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-black mb-1">Fee Summary</p>
                    <p className="text-4xl font-black tracking-tighter text-gray-900">${booking.totalPrice}</p>
                  </div>
                  <div className={`px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] border rounded-2xl shadow-sm ${
                    booking.status === 'confirmed' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-sky-50 border-sky-100 text-sky-600'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
            
            {bookings.length === 0 && (
              <div className="text-center py-40 bg-gray-50 border border-dashed border-gray-200 rounded-[3rem]">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] mb-12">No rental assets found in current session.</p>
                <a href="/" className="px-12 py-6 bg-sky-500 text-white text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-sky-600 rounded-2xl shadow-lg shadow-sky-500/20 inline-block">
                  Acquire Assets
                </a>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
