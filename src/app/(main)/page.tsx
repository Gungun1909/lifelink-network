'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-medical-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-medical-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-medical-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft animation-delay-4000"></div>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo Animation */}
          <motion.div
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-4xl">L</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={itemVariants}
          >
            LIFELINK
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8"
            variants={itemVariants}
          >
            Connecting You to Care, When It Matters Most.
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Find nearby hospitals, consult doctors, locate blood donors, and compare healthcare services — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            <Link
              href="/hospitals"
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Find Hospitals
              <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/doctors"
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Consult a Doctor
              <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/blood-donors"
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Find Blood Donors
              <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/prices"
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Compare Prices
              <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
          </motion.div>

          {/* Location Permission */}
          {!location && (
            <motion.div
              className="flex items-center justify-center gap-2 text-medical-600 text-sm"
              variants={itemVariants}
            >
              <MapPin size={16} />
              Allow location access for better results
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose LIFELINK?</h2>
            <p className="section-subtitle text-gray-600">
              Your one-stop healthcare solution for West Bengal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏥',
                title: 'Find Hospitals',
                description: 'Discover hospitals near you with real-time distance calculations',
              },
              {
                icon: '👨‍⚕️',
                title: 'Consult Doctors',
                description: 'Book consultations with experienced doctors in your area',
              },
              {
                icon: '🩸',
                title: 'Blood Donors',
                description: 'Connect with blood donors matching your blood group',
              },
              {
                icon: '💰',
                title: 'Compare Prices',
                description: 'View and compare healthcare prices across hospitals',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="card p-8 text-center hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title text-red-900">Emergency?</h2>
          <p className="section-subtitle text-red-700 mb-8">
            Need immediate medical assistance?
          </p>
          <Link
            href="/emergency"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition group"
          >
            <span className="text-2xl">🚨</span>
            Get Emergency Help Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle text-gray-600 mb-8">
            Join thousands of users already using LIFELINK to access better healthcare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary">
              Create Account
            </Link>
            <Link href="/hospitals" className="btn-secondary">
              Explore Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
