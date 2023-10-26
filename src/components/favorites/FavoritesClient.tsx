'use client';
import React from 'react';
import { SafeListing, SafeUser } from '@/libs/types';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';

type Props = {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
};

export default function FavoritesClient({ listings, currentUser }: Props) {
	return (
		<>
			<Container>
				<Heading title="Favorites" subtitle="Your favorite listings" />
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings.map((listing, i) => (
						<ListingCard key={i} data={listing} currentUser={currentUser} />
					))}
				</div>
			</Container>
		</>
	);
}
