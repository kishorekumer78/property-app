import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prisma';
import { SafeListing } from '@/libs/types';

export async function getFavoriteListings() {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return [];
		}

		const favorites = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])]
				}
			}
		});
		const safeFavorites: SafeListing[] = favorites.map((favorite) => {
			return {
				...favorite,
				createdAt: favorite.createdAt.toISOString(),
				updatedAt: favorite.updatedAt.toISOString()
			};
		});
		return safeFavorites;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
