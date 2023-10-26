'use client';

import Image from 'next/image';
import React from 'react';
type Props = {
	src: string | null | undefined;
};
export default function Avatar({ src }: Props) {
	return (
		<>
			<Image
				className="rounded-full"
				alt="Avatar"
				height="30"
				width="30"
				src={src || '/images/placeholder.jpg'}
			/>
		</>
	);
}
