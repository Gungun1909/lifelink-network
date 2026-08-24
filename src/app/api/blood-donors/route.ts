import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const bloodGroup = searchParams.get('bloodGroup');
    const city = searchParams.get('city');
    const district = searchParams.get('district');
    const availability = searchParams.get('availability') || 'available';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {
      availability,
    };

    if (bloodGroup) where.bloodGroup = bloodGroup;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (district) where.district = { contains: district, mode: 'insensitive' };

    const [donors, total] = await Promise.all([
      prisma.bloodDonor.findMany({
        where,
        skip,
        take: limit,
        orderBy: { lastVerified: 'desc' },
      }),
      prisma.bloodDonor.count({ where }),
    ]);

    return NextResponse.json({
      donors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get blood donors error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const donorData = await req.json();

    const donor = await prisma.bloodDonor.create({
      data: donorData,
    });

    return NextResponse.json(donor, { status: 201 });
  } catch (error) {
    console.error('Create blood donor error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
