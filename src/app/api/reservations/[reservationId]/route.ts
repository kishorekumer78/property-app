import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { reservationId?: string } }
) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.json('Unauthorized', { status: 401 });
	}
	const { reservationId } = params;
	if (!reservationId || typeof reservationId !== 'string') {
		return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
	}

	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }]
		}
	});

	return NextResponse.json(reservation);
}
