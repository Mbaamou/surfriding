import React, { useState, useEffect } from "react";
import { getBookings } from "../services/auth.service";
import Navbar from "../components/Navbar";
import { Calendar, Tag, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-10 flex items-center">
          <Calendar className="mr-3 text-sky-400" />
          My Bookings
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-sky-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-slate-800 rounded-xl overflow-hidden">
                    {booking.equipment?.image && (
                      <img 
                        src={`http://localhost:5000/${booking.equipment.image}`} 
                        className="w-full h-full object-cover"
                        alt="Gear"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{booking.equipment?.name || "Equipment"}</h3>
                    <p className="text-slate-400 text-sm">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Price</p>
                    <p className="text-2xl font-bold text-sky-400">${booking.totalPrice}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center ${
                    booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {booking.status === 'confirmed' && <CheckCircle className="w-4 h-4 mr-2" />}
                    {booking.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="text-center py-20 glass rounded-3xl">
                <Tag className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 text-xl">You haven't booked any gear yet.</p>
                <button className="mt-6 bg-sky-500 px-8 py-3 rounded-full font-bold">Browse Catalog</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingPage;
