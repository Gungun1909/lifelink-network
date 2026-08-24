import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const specialization = searchParams.get('specialization');
    const hospitalId = searchParams.get('hospitalId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (specialization) where.specialization = { contains: specialization, mode: 'insensitive' };
    if (hospitalId) where.hospitalId = hospitalId;

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        include: {
          hospital: true,
          availableSlots: true,
        },
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
      }),
      prisma.doctor.count({ where }),
    ]);

    return NextResponse.json({
      doctors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const doctorData = await req.json();

    const doctor = await prisma.doctor.create({
      data: doctorData,
      include: {
        hospital: true,
        availableSlots: true,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error('Create doctor error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
