import { getCurrentUser } from '@/actions/getCurrentUser';
import { getListings } from '@/actions/getListings';
import EmptyState from '@/components/EmptyState';
import PropertiesClient from '@/components/properties/PropertiesClient';
import React from 'react';

export default async function PropertiesPage() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return <EmptyState title="Unauthorized" subTitle="Please login" />;
	}
	const listings = await getListings({ userId: currentUser.id });

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No properties found"
				subTitle="Looks like you didn't add any properties yet"
			/>
		);
	}
	return (
		<>
			<PropertiesClient listings={listings} currentUser={currentUser} />
		</>
	);
}
