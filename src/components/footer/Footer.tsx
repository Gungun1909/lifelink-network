import Link from 'next/link';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <h3 className="font-bold text-xl">LIFELINK</h3>
            </div>
            <p className="text-gray-400">
              Connecting You to Care, When It Matters Most
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition">Hospitals</Link></li>
              <li><Link href="/doctors" className="hover:text-white transition">Doctors</Link></li>
              <li><Link href="/blood-donors" className="hover:text-white transition">Blood Donors</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/prices" className="hover:text-white transition">Compare Prices</Link></li>
              <li><Link href="/consultations" className="hover:text-white transition">Book Consultation</Link></li>
              <li><Link href="/emergency" className="hover:text-white transition">Emergency Help</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                +91 XXXX XXXX XX
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                support@lifelink.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                Kolkata, West Bengal
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm">
            <p className="font-semibold mb-2">📋 Disclaimer:</p>
            <p>
              Information shown in this demo may contain sample data and should be verified with the healthcare provider before making medical decisions. LIFELINK is not a substitute for professional medical advice.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} LIFELINK. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-4 md:mt-0">
            Made with <Heart size={16} className="text-red-500" /> for West Bengal
          </div>
        </div>
      </div>
    </footer>
  );
}
