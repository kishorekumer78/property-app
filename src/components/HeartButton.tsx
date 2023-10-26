'use client';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { SafeUser } from '@/libs/types';
import { useFavorite } from '@/hooks/use-favorite';

type Props = {
	listingId: string;
	currentUser?: SafeUser | null;
};

export default function HeartButton({ listingId, currentUser }: Props) {
	const { hasMadeFavorite, toggleFavorite } = useFavorite({ listingId, currentUser });

	return (
		<>
			<div
				onClick={toggleFavorite}
				className="relative hover:opacity-80 transition cursor-pointer"
			>
				<AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
				<AiFillHeart
					size={24}
					className={hasMadeFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
				/>
			</div>
		</>
	);
}
