'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from './Heading';
import Button from './Button';

type Props = {
	title?: string;
	subTitle?: string;
	showReset?: boolean;
};

export default function EmptyState({
	title = 'No exact match',
	subTitle = 'Try changing or removing filters',
	showReset
}: Props) {
	const router = useRouter();

	return (
		<>
			<div className="flex flex-col justify-center items-center gap-2 h-[60vh]">
				<Heading title={title} subtitle={subTitle} center />
				<div className="w-48 mt-4">
					{showReset && (
						<Button outline onClick={() => router.push('/')} label="Reset filters" />
					)}
				</div>
			</div>
		</>
	);
}
