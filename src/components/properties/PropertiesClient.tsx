'use client';
import { SafeListing, SafeUser } from '@/libs/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Container from '../Container';
import Heading from '../Heading';
import ListingCard from '../listings/ListingCard';

type Props = {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
};

export default function PropertiesClient({ listings, currentUser }: Props) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);
			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success('Listing deleted');
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
				<Heading title="Properties" subtitle="List of your properties" />
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings?.map((listing, i) => (
						<ListingCard
							key={i}
							data={listing}
							actionId={listing.id}
							onAction={onCancel}
							disabled={deletingId === listing.id}
							actionLabel="Delete property"
							currentUser={currentUser}
						/>
					))}
				</div>
			</Container>
		</>
	);
}
