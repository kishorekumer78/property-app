import Avatar from '@/components/Avatar';
import { useCountries } from '@/hooks/use-countries';
import { SafeUser } from '@/libs/types';
import React from 'react';
import { IconType } from 'react-icons';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

type Props = {
	user: SafeUser;
	description: string;
	roomCount: number;
	guestCount: number;
	bathroomCount: number;
	locationValue: string;
	category: { label: string; icon: IconType; description: string } | undefined;
};

export default function ListingInfo({
	user,
	description,
	roomCount,
	guestCount,
	bathroomCount,
	locationValue,
	category
}: Props) {
	const { getByValue } = useCountries();
	const coordinates = getByValue(locationValue)?.latlng;

	return (
		<>
			<div className="col-span-4 flex flex-col gap-8">
				<div className="flex flex-col gap-2">
					<div className="text-xl font-semibold flex flex-row items-center gap-2">
						<div>Hosted by {user?.name}</div>
						<Avatar src={user?.image} />
					</div>
					<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
						<div>{guestCount} guests</div>
						<div>{roomCount} rooms</div>
						<div>{bathroomCount} bathrooms</div>
					</div>
				</div>
				<hr />
				{category && (
					<ListingCategory
						icon={category.icon}
						description={category.description}
						label={category.label}
					/>
				)}
				<hr />
				<div className="text-lg font-light text-neutral-500">{description}</div>
				<hr />
				<Map center={coordinates} />
			</div>
		</>
	);
}
