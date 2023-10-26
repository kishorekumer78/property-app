'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '@/libs/types';
import Container from '@/components/Container';
import Heading from '../Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../listings/ListingCard';

type Props = {
	reservations: SafeReservation[] | null;
	currentUser?: SafeUser | null;
};

export default function TripsClient({ reservations, currentUser }: Props) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);
			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success('Reservation cancelled');
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error || 'Something went wrong');
				})
				.finally(() => {
					setDeletingId('');
				});
		},
		[router]
	);
	return (
		<>
			<Container>
				<Heading title="Trips" subtitle="Where you've been and where you're going" />
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{reservations?.map((reservation, i) => (
						<ListingCard
							key={i}
							data={reservation.listing}
							reservation={reservation}
							actionId={reservation.id}
							onAction={onCancel}
							disabled={deletingId === reservation.id}
							actionLabel="Cancel reservation"
							currentUser={currentUser}
						/>
					))}
				</div>
			</Container>
		</>
	);
}
