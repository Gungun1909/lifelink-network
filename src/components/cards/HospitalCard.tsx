import { MapPin, Phone, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Hospital } from '@/types';
import { cn } from '@/lib/utils';

interface HospitalCardProps {
  hospital: Hospital & { distance?: number };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <div className="card overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 w-full bg-medical-100 overflow-hidden">
        {hospital.image ? (
          <Image
            src={hospital.image}
            alt={hospital.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-medical">
            <span className="text-medical-400 text-4xl">🏥</span>
          </div>
        )}
        {hospital.emergencyAvailable && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <AlertCircle size={14} />
            24/7 Emergency
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {hospital.name}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin size={16} className="text-medical-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 line-clamp-2">
            {hospital.address}
          </p>
        </div>

        {/* Distance & Rating */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-medical-100">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-900">
              {hospital.rating.toFixed(1)}
            </span>
          </div>
          {hospital.distance && (
            <span className="text-sm font-semibold text-medical-600">
              {hospital.distance} km away
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 mb-4">
          <Phone size={16} className="text-medical-600" />
          <a
            href={`tel:${hospital.phoneNumber}`}
            className="text-sm text-medical-600 hover:underline"
          >
            {hospital.phoneNumber}
          </a>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/hospitals/${hospital.id}`}
            className="flex-1 btn-primary text-center text-sm py-2"
          >
            View Details
          </Link>
          <button className="flex-1 btn-secondary text-sm py-2">
            Directions
          </button>
        </div>
      </div>
    </div>
  );
}
