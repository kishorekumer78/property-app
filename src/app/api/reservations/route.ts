import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.json('Unauthorized', { status: 401 });
	}
	const body = await request.json();
	const { listingId, startDate, endDate, totalPrice } = body;

	if (!listingId || !startDate || !endDate || !totalPrice) {
		return NextResponse.json('Missing required data', { status: 400 });
	}

	const listing = await prisma.listing.findUnique({
		where: {
			id: listingId
		}
	});
	if (!listing) {
		return NextResponse.json('Listing not found', { status: 404 });
	}

	const listingAndReservation = await prisma.listing.update({
		where: {
			id: listingId
		},
		data: {
			reservations: {
				create: {
					userId: currentUser.id,
					startDate,
					endDate,
					totalPrice
				}
			}
		}
	});
	return NextResponse.json(listingAndReservation);
}
