import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.json('Unauthorized', { status: 401 });
	}

	const body = await request.json();
	const {
		title,
		description,
		price,
		category,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		imageSrc
	} = body;
	Object.keys(body).forEach((key) => {
		if (!body[key]) {
			return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
		}
	});
	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			price: parseInt(price, 10),
			category,
			locationValue: location.value,
			guestCount,
			roomCount,
			bathroomCount,
			imageSrc,
			userId: currentUser.id
		}
	});

	return NextResponse.json(listing);
}
