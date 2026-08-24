import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    const where: any = {};
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const consultations = await prisma.consultation.findMany({
      where,
      include: {
        doctor: { include: { hospital: true } },
        user: true,
        payment: true,
      },
      orderBy: { appointmentDate: 'desc' },
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Get consultations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const consultationData = await req.json();

    const consultation = await prisma.consultation.create({
      data: consultationData,
      include: {
        doctor: { include: { hospital: true } },
        user: true,
      },
    });

    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error('Create consultation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
