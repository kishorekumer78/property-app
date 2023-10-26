import { getCurrentUser } from '@/actions/getCurrentUser';
import { getFavoriteListings } from '@/actions/getFavoriteListings';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import FavoritesClient from '@/components/favorites/FavoritesClient';
import React from 'react';

export default async function FavoritesPage() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return <EmptyState title="Unauthorized" subTitle="Please login" />;
	}
	const favoriteListings = await getFavoriteListings();
	if (favoriteListings.length === 0) {
		return (
			<EmptyState
				title="No favorites found"
				subTitle="Looks like you don't have any favorites yet"
			/>
		);
	}
	return (
		<>
			<FavoritesClient listings={favoriteListings} currentUser={currentUser} />
		</>
	);
}
