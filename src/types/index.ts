// Hospital Types
export interface Hospital {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  email?: string;
  emergencyAvailable: boolean;
  rating: number;
  description?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  hospitalId: string;
}

export interface HospitalService {
  id: string;
  name: string;
  description?: string;
  category: string;
  hospitalId: string;
}

// Doctor Types
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  phoneNumber?: string;
  email?: string;
  image?: string;
  bio?: string;
  consultationFee: number;
  hospitalId: string;
  hospital?: Hospital;
  departmentId?: string;
  rating: number;
  availableSlots?: AvailableSlot[];
}

export interface AvailableSlot {
  id: string;
  doctorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

// Blood Donor Types
export interface BloodDonor {
  id: string;
  donorId: string;
  bloodGroup: string;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  availability: string;
  lastVerified: Date;
}

export interface BloodRequest {
  id: string;
  userId: string;
  bloodGroup: string;
  requiredQuantity: number;
  city: string;
  district: string;
  reason?: string;
  status: 'pending' | 'matched' | 'completed';
  donorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Service & Price Types
export interface HospitalPrice {
  id: string;
  hospitalId: string;
  serviceId: string;
  hospital?: Hospital;
  service?: HospitalService;
  price: number;
}

// Consultation & Booking Types
export interface Consultation {
  id: string;
  userId: string;
  doctorId: string;
  hospitalId: string;
  appointmentDate: Date;
  reason: string;
  consultationType: 'in-person' | 'online';
  status: 'scheduled' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  hospitalId: string;
  serviceId: string;
  serviceName: string;
  bookingDate: Date;
  status: 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'completed' | 'failed';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  transactionReference?: string;
  paymentMethod?: string;
  consultationId?: string;
  bookingId?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export interface User {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  bloodGroup?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  emergencyContact?: string;
  role: 'user' | 'admin' | 'doctor';
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address?: string;
}

export interface AuthToken {
  token: string;
  expiresAt: Date;
  user: User;
}
