'use client';
import Heading from '@/components/Heading';
import HeartButton from '@/components/HeartButton';
import { useCountries } from '@/hooks/use-countries';
import { SafeUser } from '@/libs/types';
import Image from 'next/image';
import React from 'react';

type Props = {
	title: string;
	imageSrc: string;
	locationValue: string;
	id: string;
	currentUser?: SafeUser | null;
};

export default function ListingHead({ title, imageSrc, locationValue, id, currentUser }: Props) {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);

	return (
		<>
			<Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image fill src={imageSrc} alt={title} className="object-cover w-full" />
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
}
