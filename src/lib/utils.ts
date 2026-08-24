import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `LL-${new Date().getFullYear()}-${timestamp}${random}`;
}

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const BLOOD_COMPATIBILITY: Record<string, string[]> = {
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'AB+': ['AB+'],
  'AB-': ['AB-', 'AB+'],
};

export function getCompatibleDonors(bloodGroup: string): string[] {
  return BLOOD_COMPATIBILITY[bloodGroup] || [];
}

export const WEST_BENGAL_DISTRICTS = [
  'Kolkata',
  'Howrah',
  'Hooghly',
  'West Midnapore',
  'East Midnapore',
  'Jalpaiguri',
  'Darjeeling',
  'Coochbehar',
  'Alipurduar',
  'Malda',
  'Murshidabad',
  'Birbhum',
  'Bankura',
  'Bardhaman',
  'East Bardhaman',
  'West Bardhaman',
  'South 24 Parganas',
  'North 24 Parganas',
];

export const SPECIALIZATIONS = [
  'General Medicine',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Gynecology',
  'ENT',
  'Urology',
  'Psychiatry',
  'Oncology',
  'Nephrology',
];

export const MEDICAL_TESTS = [
  { name: 'CBC', category: 'Blood Tests' },
  { name: 'Blood Sugar', category: 'Blood Tests' },
  { name: 'Lipid Profile', category: 'Blood Tests' },
  { name: 'Thyroid Profile', category: 'Blood Tests' },
  { name: 'Liver Function Test', category: 'Blood Tests' },
  { name: 'Kidney Function Test', category: 'Blood Tests' },
  { name: 'X-Ray', category: 'Imaging' },
  { name: 'Ultrasound', category: 'Imaging' },
  { name: 'ECG', category: 'Diagnostic' },
  { name: 'MRI', category: 'Imaging' },
  { name: 'CT Scan', category: 'Imaging' },
];

export const DISTANCE_FILTERS = [
  { label: 'Within 1 km', value: 1 },
  { label: 'Within 5 km', value: 5 },
  { label: 'Within 10 km', value: 10 },
  { label: 'Within 25 km', value: 25 },
  { label: 'Within 50 km', value: 50 },
];

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}
