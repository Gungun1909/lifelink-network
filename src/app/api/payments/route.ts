import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const paymentData = await req.json();

    const payment = await prisma.payment.create({
      data: {
        ...paymentData,
        paymentStatus: 'completed',
        transactionReference: `DEMO-${Date.now()}`,
      },
      include: {
        user: true,
        consultation: true,
        booking: true,
      },
    });

    if (payment.consultationId) {
      await prisma.consultation.update({
        where: { id: payment.consultationId },
        data: { paymentStatus: 'completed' },
      });
    }

    if (payment.bookingId) {
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { paymentStatus: 'completed' },
      });
    }

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Create payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    const where: any = {};
    if (userId) where.userId = userId;

    const payments = await prisma.payment.findMany({
      where,
      include: {
        user: true,
        consultation: true,
        booking: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
