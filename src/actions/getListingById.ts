import prisma from '@/libs/prisma';

export async function getListingById(listingId: string) {
	try {
		const listing = await prisma.listing.findUnique({
			where: {
				id: listingId
			},
			include: {
				user: true
			}
		});
		if (!listing) {
			return null;
		}
		return {
			...listing,
			createdAt: listing.createdAt.toISOString(),
			updatedAt: listing.updatedAt.toISOString(),
			user: {
				...listing.user,
				createdAt: listing.user.createdAt.toISOString(),
				updatedAt: listing.user.updatedAt.toISOString(),
				emailVerified: listing.user.emailVerified?.toISOString() || null
			}
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}
