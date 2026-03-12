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
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',_sans-serif]">
      <Navbar />
      <main className="container mx-auto px-8 py-32">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
              Your Rentals.
            </h1>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.3em]">
              Active Contracts / Historical Records
            </p>
          </div>
          <div className="mt-12 md:mt-0 text-right">
            <span className="text-4xl font-light text-white/5 italic select-none">// TRANSACTIONS</span>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-white animate-loading-bar"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="group relative bg-[#0a0a0a] border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between transition-all hover:border-white/20">
                <div className="flex items-center space-x-12 w-full md:w-auto">
                  <div className="w-32 h-32 bg-black border border-white/5 overflow-hidden flex-shrink-0">
                    {booking.equipment?.image && (
                      <img 
                        src={`http://localhost:5000/${booking.equipment.image}`} 
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-all duration-700"
                        alt="Gear"
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-[9px] font-black uppercase tracking-widest text-[#ff5e00]">#{booking._id.slice(-6)}</span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2">{booking.equipment?.name || "Equipment"}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">
                      {new Date(booking.startDate).toLocaleDateString()} <ArrowRight className="inline w-3 h-3 mx-2" /> {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 md:mt-0 flex items-center gap-16 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black mb-1">Fee</p>
                    <p className="text-2xl font-black tracking-tighter">${booking.totalPrice}</p>
                  </div>
                  <div className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] border ${
                    booking.status === 'confirmed' ? 'border-green-500/30 text-green-500' : 'border-orange-500/30 text-orange-500'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
            
            {bookings.length === 0 && (
              <div className="text-center py-40 border border-dashed border-white/10">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em] mb-12">No rental assets found in current session.</p>
                <a href="/" className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-orange-500 hover:text-white">
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
