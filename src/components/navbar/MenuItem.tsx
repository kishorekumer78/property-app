'use client';

import React from 'react';

type Props = {
	onClick: () => void;
	label: string;
};
export default function MenuItem({ onClick, label }: Props) {
	return (
		<>
			<div
				onClick={onClick}
				className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
			>
				{label}
			</div>
		</>
	);
}
