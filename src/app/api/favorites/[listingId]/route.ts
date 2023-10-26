import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prisma';

export async function POST(request: NextRequest, { params }: { params: { listingId?: string } }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.json('Unauthorized', { status: 401 });
	}
	const { listingId } = params;
	if (!listingId || typeof listingId !== 'string') {
		return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds.push(listingId);
	const user = await prisma.user.update({
		where: {
			id: currentUser.id
		},
		data: {
			favoriteIds
		}
	});
	return NextResponse.json(user);
}

export async function DELETE(request: NextRequest, { params }: { params: { listingId?: string } }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.json('Unauthorized', { status: 401 });
	}
	const { listingId } = params;
	if (!listingId || typeof listingId !== 'string') {
		return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
	}
	let favoriteIds = [...(currentUser.favoriteIds || [])];
	favoriteIds = favoriteIds.filter((id) => id !== listingId);
	const user = await prisma.user.update({
		where: {
			id: currentUser.id
		},
		data: {
			favoriteIds
		}
	});
	return NextResponse.json(user);
}
