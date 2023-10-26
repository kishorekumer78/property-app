import prisma from '@/libs/prisma';
import { SafeListing } from '@/libs/types';

type ListingParams = {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
};

export async function getListings(params: ListingParams) {
	try {
		const {
			userId,
			guestCount,
			roomCount,
			bathroomCount,
			startDate,
			endDate,
			locationValue,
			category
		} = params;
		let query: any = {};
		if (userId) {
			query.userId = userId;
		}

		if (category) {
			query.category = category;
		}
		if (guestCount) {
			query.guestCount = { gte: +guestCount };
		}
		if (roomCount) {
			query.roomCount = { gte: +roomCount };
		}
		if (bathroomCount) {
			query.bathroomCount = { gte: +bathroomCount };
		}
		if (locationValue) {
			query.locationValue = locationValue;
		}
		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: { gte: startDate },
								startDate: { lte: startDate }
							},
							{
								startDate: { lte: endDate },
								endDate: { gte: endDate }
							}
						]
					}
				}
			};
		}
		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: { createdAt: 'desc' }
		});
		const safeListings: SafeListing[] = listings.map((listing) => {
			return {
				...listing,
				createdAt: listing.createdAt.toISOString(),
				updatedAt: listing.updatedAt.toISOString()
			};
		});
		return safeListings;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
