import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prisma';

import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { listingId?: string } }) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return NextResponse.json('Unauthorized', { status: 401 });
		}
		const { listingId } = params;
		if (!listingId || typeof listingId !== 'string') {
			return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
		}
		const listing = await prisma.listing.deleteMany({
			where: {
				id: listingId,
				userId: currentUser.id
			}
		});
		return NextResponse.json(listing);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
