import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get('city');
    const district = searchParams.get('district');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (district) where.district = { contains: district, mode: 'insensitive' };

    const [hospitals, total] = await Promise.all([
      prisma.hospital.findMany({
        where,
        include: {
          departments: true,
          services: true,
        },
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
      }),
      prisma.hospital.count({ where }),
    ]);

    return NextResponse.json({
      hospitals,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get hospitals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const hospitalData = await req.json();

    const hospital = await prisma.hospital.create({
      data: hospitalData,
      include: {
        departments: true,
        services: true,
      },
    });

    return NextResponse.json(hospital, { status: 201 });
  } catch (error) {
    console.error('Create hospital error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
