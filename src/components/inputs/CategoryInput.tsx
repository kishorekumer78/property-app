'use client';
import React from 'react';
import { IconType } from 'react-icons';

type Props = {
	label: string;
	onClick: (value: string) => void;
	icon: IconType;
	selected?: boolean;
};

export default function CategoryInput({ label, onClick, icon: Icon, selected }: Props) {
	return (
		<>
			<div
				onClick={() => onClick(label)}
				className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
					selected ? 'border-black' : 'border-neutral-200'
				}`}
			>
				<Icon size={30} />
				<div className="font-semibold">{label}</div>
			</div>
		</>
	);
}
