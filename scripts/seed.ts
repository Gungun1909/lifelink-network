import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await hashPassword('admin@123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lifelink.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@lifelink.com',
      phoneNumber: '9000000001',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Create demo user
  const demoPassword = await hashPassword('demo@123');
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@lifelink.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@lifelink.com',
      phoneNumber: '9000000002',
      password: demoPassword,
      bloodGroup: 'O+',
      location: 'Kolkata',
      latitude: 22.5726,
      longitude: 88.3639,
      role: 'user',
    },
  });
  console.log('✅ Demo user created:', demoUser.email);

  // Create hospitals
  const hospitals = [
    {
      name: 'Apollo Hospitals Kolkata',
      city: 'Kolkata',
      district: 'Kolkata',
      address: '34, JL Nehru Road, Kolkata, West Bengal 700071',
      latitude: 22.5726,
      longitude: 88.3639,
      phoneNumber: '033-2123-4567',
      email: 'kolkata@apollohospitals.com',
      emergencyAvailable: true,
      rating: 4.8,
      description:
        'Multi-specialty hospital with advanced facilities and experienced doctors',
    },
    {
      name: 'CMRI - Calcutta Medical Research Institute',
      city: 'Kolkata',
      district: 'Kolkata',
      address: '7/2, AJC Bose Road, Kolkata, West Bengal 700014',
      latitude: 22.5658,
      longitude: 88.3666,
      phoneNumber: '033-2069-1500',
      email: 'info@cmriindia.org',
      emergencyAvailable: true,
      rating: 4.7,
      description: 'Renowned cardiac and multi-specialty center',
    },
    {
      name: 'Fortis Hospital Saltlake',
      city: 'Kolkata',
      district: 'North 24 Parganas',
      address: 'Saltlake, Sector III, Kolkata, West Bengal 700106',
      latitude: 22.5887,
      longitude: 88.4106,
      phoneNumber: '033-6600-5000',
      email: 'saltlake@fortisindia.com',
      emergencyAvailable: true,
      rating: 4.6,
      description: 'Modern facility with comprehensive healthcare services',
    },
  ];

  for (const hospitalData of hospitals) {
    const hospital = await prisma.hospital.upsert({
      where: { id: hospitalData.name },
      update: {},
      create: hospitalData,
    });
    console.log('✅ Hospital created:', hospital.name);

    const departments = [
      'General Medicine',
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Pediatrics',
    ];

    for (const deptName of departments) {
      await prisma.department.upsert({
        where: { id: `${hospital.id}-${deptName}` },
        update: {},
        create: {
          name: deptName,
          hospitalId: hospital.id,
        },
      });
    }
  }

  // Create doctors
  const doctors = [
    {
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      qualification: 'MBBS, MD, DM (Cardiology)',
      experience: 15,
      phoneNumber: '9800123456',
      consultationFee: 500,
      hospitalId: 'Apollo Hospitals Kolkata',
      rating: 4.9,
    },
    {
      name: 'Dr. Priya Sharma',
      specialization: 'General Medicine',
      qualification: 'MBBS, MD',
      experience: 12,
      phoneNumber: '9800123457',
      consultationFee: 300,
      hospitalId: 'CMRI - Calcutta Medical Research Institute',
      rating: 4.7,
    },
    {
      name: 'Dr. Amit Patel',
      specialization: 'Orthopedics',
      qualification: 'MBBS, MS (Orthopedics)',
      experience: 10,
      phoneNumber: '9800123458',
      consultationFee: 400,
      hospitalId: 'Fortis Hospital Saltlake',
      rating: 4.6,
    },
  ];

  for (const doctorData of doctors) {
    const hospital = await prisma.hospital.findFirst({
      where: { name: doctorData.hospitalId },
    });

    if (hospital) {
      const doctor = await prisma.doctor.upsert({
        where: { id: doctorData.name },
        update: {},
        create: {
          ...doctorData,
          hospitalId: hospital.id,
        },
      });
      console.log('✅ Doctor created:', doctor.name);

      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      for (const day of days) {
        await prisma.availableSlot.upsert({
          where: { id: `${doctor.id}-${day}` },
          update: {},
          create: {
            doctorId: doctor.id,
            dayOfWeek: day,
            startTime: '09:00',
            endTime: '17:00',
            slotDuration: 30,
          },
        });
      }
    }
  }

  // Create blood donors
  const donors = [
    {
      donorId: 'DONOR001',
      bloodGroup: 'O+',
      city: 'Kolkata',
      district: 'Kolkata',
      latitude: 22.5726,
      longitude: 88.3639,
      availability: 'available',
      lastVerified: new Date(),
    },
    {
      donorId: 'DONOR002',
      bloodGroup: 'A+',
      city: 'Kolkata',
      district: 'Kolkata',
      latitude: 22.5658,
      longitude: 88.3666,
      availability: 'available',
      lastVerified: new Date(),
    },
    {
      donorId: 'DONOR003',
      bloodGroup: 'B+',
      city: 'Howrah',
      district: 'Howrah',
      latitude: 22.5958,
      longitude: 88.2636,
      availability: 'available',
      lastVerified: new Date(),
    },
  ];

  for (const donorData of donors) {
    await prisma.bloodDonor.upsert({
      where: { donorId: donorData.donorId },
      update: {},
      create: donorData,
    });
  }
  console.log('✅ Blood donors created');

  // Create services
  const services = [
    { name: 'General Consultation', category: 'Consultation' },
    { name: 'Blood Test', category: 'Diagnostic' },
    { name: 'X-Ray', category: 'Imaging' },
    { name: 'Ultrasound', category: 'Imaging' },
    { name: 'ECG', category: 'Diagnostic' },
  ];

  for (const serviceData of services) {
    const service = await prisma.hospitalService.upsert({
      where: { id: serviceData.name },
      update: {},
      create: serviceData,
    });

    const hospitalsList = await prisma.hospital.findMany();
    for (const hospital of hospitalsList) {
      const basePrice =
        serviceData.category === 'Consultation' ? 300 : 500;
      await prisma.hospitalPrice.upsert({
        where: { id: `${hospital.id}-${service.id}` },
        update: {},
        create: {
          hospitalId: hospital.id,
          serviceId: service.id,
          price: basePrice + Math.floor(Math.random() * 200),
        },
      });
    }
  }
  console.log('✅ Services and prices created');

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
