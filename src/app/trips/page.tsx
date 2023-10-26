import React from 'react';
import EmptyState from '@/components/EmptyState';

import { getCurrentUser } from '@/actions/getCurrentUser';
import { getReservations } from '@/actions/getReservations';
import TripsClient from '@/components/trips/TripsClient';

export default async function TripsPage() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return <EmptyState title="Unauthorized" subTitle="Please login" />;
	}

	const reservations = await getReservations({ userId: currentUser.id });
	if (reservations.length === 0) {
		return (
			<EmptyState
				title="No trips found"
				subTitle="Looks like you haven't booked any trips yet"
			/>
		);
	}
	return (
		<>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</>
	);
}
