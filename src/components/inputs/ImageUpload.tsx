'use client';
import React, { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

declare global {
	var cloudinary: any;
}
type Props = {
	onChange: (value: string) => void;
	value: string;
};
export default function ImageUpload({ onChange, value }: Props) {
	const handleUpload = useCallback(
		(result: any) => {
			// result contains public_id also
			onChange(result.info.secure_url);
		},
		[onChange]
	);
	return (
		<>
			<CldUploadWidget
				onUpload={handleUpload}
				uploadPreset="eax4vdvd"
				options={{
					maxFiles: 1,
					folder: 'property-app'
				}}
			>
				{({ open }) => {
					return (
						<div
							onClick={() => open()}
							className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600 "
						>
							<TbPhotoPlus size={50} />
							<div className="font-semibold text-lg">Click to upload</div>
							{value && (
								<div className="absolute inset-0 h-full w-full">
									<Image
										src={value}
										fill
										alt="Upload"
										style={{ objectFit: 'cover' }}
									/>
								</div>
							)}
						</div>
					);
				}}
			</CldUploadWidget>
		</>
	);
}
