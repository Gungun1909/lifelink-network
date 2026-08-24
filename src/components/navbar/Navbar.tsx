'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, AlertTriangle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              LIFELINK
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-medical-600 font-medium">
              Home
            </Link>
            <Link href="/hospitals" className="text-gray-600 hover:text-medical-600 font-medium">
              Hospitals
            </Link>
            <Link href="/doctors" className="text-gray-600 hover:text-medical-600 font-medium">
              Doctors
            </Link>
            <Link href="/blood-donors" className="text-gray-600 hover:text-medical-600 font-medium">
              Blood
            </Link>
            <Link href="/prices" className="text-gray-600 hover:text-medical-600 font-medium">
              Prices
            </Link>
            <Link href="/emergency" className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1">
              <AlertTriangle size={18} />
              SOS
            </Link>
          </div>

          {/* Auth & Emergency Button */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard" className="btn-primary text-sm">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="btn-primary text-sm">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-medical-50 rounded">
              Home
            </Link>
            <Link href="/hospitals" className="block px-4 py-2 text-gray-600 hover:bg-medical-50 rounded">
              Hospitals
            </Link>
            <Link href="/doctors" className="block px-4 py-2 text-gray-600 hover:bg-medical-50 rounded">
              Doctors
            </Link>
            <Link href="/blood-donors" className="block px-4 py-2 text-gray-600 hover:bg-medical-50 rounded">
              Blood Donors
            </Link>
            <Link href="/prices" className="block px-4 py-2 text-gray-600 hover:bg-medical-50 rounded">
              Compare Prices
            </Link>
            <Link href="/emergency" className="block px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded flex items-center gap-2">
              <AlertTriangle size={18} />
              Emergency
            </Link>
            <Link href="/login" className="block px-4 py-2 btn-primary text-center">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
