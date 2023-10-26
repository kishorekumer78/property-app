import React from 'react';

import { getCurrentUser } from '@/actions/getCurrentUser';
import { getListingById } from '@/actions/getListingById';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import ListingClient from '@/components/listings/ListingClient';
import { getReservations } from '@/actions/getReservations';

export default async function ListingPage({ params }: { params: { listingId: string } }) {
	const { listingId } = params;
	const listing = await getListingById(listingId);
	const reservations = await getReservations({
		listingId: listingId
	});
	const currentUser = await getCurrentUser();
	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}
	return (
		<>
			<ClientOnly>
				<ListingClient
					listing={listing}
					currentUser={currentUser}
					reservations={reservations}
				/>
			</ClientOnly>
		</>
	);
}
