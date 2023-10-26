import React from 'react';

import EmptyState from '@/components/EmptyState';
import ClientOnly from '@/components/ClientOnly';
import { getReservations } from '@/actions/getReservations';
import { getCurrentUser } from '@/actions/getCurrentUser';
import ReservationsClient from '@/components/reservations/ReservationsClient';

export default async function ReservationsPage() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subTitle="Please login" />
			</ClientOnly>
		);
	}
	const reservations = await getReservations({
		authorId: currentUser.id
	});
	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No reservations found"
					subTitle="Looks like you don't have any reservations yet on your properties"
				/>
			</ClientOnly>
		);
	}
	return (
		<>
			<ClientOnly>
				<ReservationsClient reservations={reservations} currentUser={currentUser} />
			</ClientOnly>
		</>
	);
}
