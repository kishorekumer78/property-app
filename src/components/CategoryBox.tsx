'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';

type Props = {
	label: string;
	icon: IconType;
	selected?: boolean;
};

export default function CategoryBox({ label, icon: Icon, selected }: Props) {
	const router = useRouter();
	const params = useSearchParams();
	// Define a function called handleClick using the useCallback hook
	const handleClick = useCallback(() => {
		// Initialize an empty object called currentQuery
		let currentQuery = {};

		// Check if the params exist
		if (params) {
			// Parse the params into an object and assign it to currentQuery
			currentQuery = qs.parse(params.toString());
		}

		// Create a new object called updatedQuery by spreading the properties of currentQuery
		// and setting the "category" property to the value of the "label" variable
		const updatedQuery: any = {
			...currentQuery,
			category: label
		};
		// implement remove category in search params if user re-clicks same category
		// Check if the "category" property in the params object is equal to the value of the "label" variable
		if (params.get('category') === label) {
			// If it is, delete the "category" property from the updatedQuery object
			delete updatedQuery.category;
		}

		// Convert the updatedQuery object into a URL string using the qs.stringifyUrl function
		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery
			},
			{ skipNull: true }
		);

		// Use the router.push function to navigate to the generated URL
		router.push(url);
	}, [label, params, router]);

	return (
		<>
			<div
				onClick={handleClick}
				className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
					selected ? 'text-neutral-800' : 'text-neutral-500'
				} ${selected ? 'border-b-neutral-800' : 'border-transparent'}`}
			>
				<Icon size={26} />
				<div className="font-medium text-sm">{label}</div>
			</div>
		</>
	);
}
