import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const serviceName = searchParams.get('serviceName');
    const city = searchParams.get('city');
    const district = searchParams.get('district');

    const where: any = {};

    let prices = await prisma.hospitalPrice.findMany({
      where,
      include: {
        hospital: true,
        service: true,
      },
      orderBy: { price: 'asc' },
    });

    if (serviceName) {
      prices = prices.filter((p) =>
        p.service?.name.toLowerCase().includes(serviceName.toLowerCase())
      );
    }

    if (city) {
      prices = prices.filter((p) =>
        p.hospital?.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (district) {
      prices = prices.filter((p) =>
        p.hospital?.district.toLowerCase().includes(district.toLowerCase())
      );
    }

    return NextResponse.json({
      prices,
      total: prices.length,
    });
  } catch (error) {
    console.error('Get prices error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
