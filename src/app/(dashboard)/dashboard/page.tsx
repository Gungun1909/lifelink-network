'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Consultation, Booking } from '@/types';
import { motion } from 'framer-motion';
import {
  LogOut,
  User as UserIcon,
  Calendar,
  Heart,
  Settings,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchUserData(JSON.parse(storedUser).id, token);
  }, [router]);

  const fetchUserData = async (userId: string, token: string) => {
    try {
      setLoading(true);
      const [consultationsRes, bookingsRes] = await Promise.all([
        axios.get('/api/consultations', { params: { userId } }),
        axios.get('/api/bookings', { params: { userId } }),
      ]);

      setConsultations(consultationsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-medical py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const upcomingConsultations = consultations.filter(
    (c) => c.status === 'scheduled'
  );
  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gradient-medical py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-600">Manage your healthcare journey</p>
          </div>
          <div className="flex gap-4">
            <Link href="/profile" className="btn-secondary flex items-center gap-2">
              <UserIcon size={20} />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div className="card p-6" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Consultations</p>
                <p className="text-3xl font-bold text-gray-900">
                  {upcomingConsultations.length}
                </p>
              </div>
              <Calendar className="text-medical-600" size={32} />
            </div>
          </motion.div>

          <motion.div className="card p-6" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Service Bookings</p>
                <p className="text-3xl font-bold text-gray-900">
                  {upcomingBookings.length}
                </p>
              </div>
              <Heart className="text-red-600" size={32} />
            </div>
          </motion.div>

          <motion.div className="card p-6" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Consultations</p>
                <p className="text-3xl font-bold text-gray-900">
                  {consultations.length}
                </p>
              </div>
              <UserIcon className="text-medical-600" size={32} />
            </div>
          </motion.div>

          <motion.div className="card p-6" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Blood Group</p>
                <p className="text-3xl font-bold text-red-600">
                  {user.bloodGroup || 'N/A'}
                </p>
              </div>
              <span className="text-4xl">🩸</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Upcoming Consultations */}
        <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Consultations
          </h2>
          {upcomingConsultations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingConsultations.map((consultation) => (
                <div key={consultation.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Dr. {consultation.doctor?.name}
                      </h3>
                      <p className="text-medical-600 font-semibold text-sm">
                        {consultation.doctor?.specialization}
                      </p>
                    </div>
                    <span className="badge-medical">Scheduled</span>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b border-medical-100 text-sm text-gray-600">
                    <p>
                      <strong>Hospital:</strong> {consultation.hospital?.name}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Date(consultation.appointmentDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Type:</strong> {consultation.consultationType}
                    </p>
                    <p>
                      <strong>Reason:</strong> {consultation.reason}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 btn-primary text-center text-sm py-2">
                      View Details
                    </button>
                    <button className="flex-1 btn-secondary text-sm py-2">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-4">No upcoming consultations</p>
              <Link href="/doctors" className="btn-primary inline-block">
                Book a Consultation
              </Link>
            </div>
          )}
        </motion.div>

        {/* Service Bookings */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Service Bookings
          </h2>
          {upcomingBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {booking.serviceName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {booking.hospital?.name}
                      </p>
                    </div>
                    <span className="badge-medical">Confirmed</span>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b border-medical-100 text-sm text-gray-600">
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Amount:</strong> ₹{booking.totalAmount}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{' '}
                      <span
                        className={`font-semibold ${
                          booking.paymentStatus === 'completed'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </p>
                  </div>

                  <button className="w-full btn-primary text-center text-sm py-2 block">
                    View Booking
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-4">No active bookings</p>
              <Link href="/hospitals" className="btn-primary inline-block">
                Book a Service
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
