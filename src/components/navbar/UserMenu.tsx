'use client';

import React, { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';

import Avatar from '@/components/Avatar';
import MenuItem from './MenuItem';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { useLoginModal } from '@/hooks/use-login-modal';
import { SafeUser } from '@/libs/types';
import { useRentModal } from '@/hooks/use-rent-modal';

type Props = {
	currentUser?: SafeUser | null;
};
export default function UserMenu({ currentUser }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);
	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);
	return (
		<>
			<div className="relative">
				<div className="flex flex-row items-center gap-3">
					<div
						className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
						onClick={onRent}
					>
						Your home
					</div>
					<div
						className="p-4 md:py-1 md:px-3 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
						onClick={toggleOpen}
					>
						<AiOutlineMenu />
						<div className="text-sm text-neutral-500">{currentUser?.name}</div>
						<div className="hidden md:block">
							<Avatar src={currentUser?.image} />
						</div>
					</div>
				</div>
				{isOpen && (
					<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
						<div className="flex flex-col cursor-pointer">
							{currentUser ? (
								<>
									<MenuItem
										onClick={() => router.push('/trips')}
										label="My Trips"
									/>
									<MenuItem
										onClick={() => router.push('/favorites')}
										label="My Favorites"
									/>
									<MenuItem
										onClick={() => router.push('/reservations')}
										label="My Reservations"
									/>
									<MenuItem
										onClick={() => router.push('/properties')}
										label="My Properties"
									/>
									<MenuItem onClick={rentModal.onOpen} label="Airbnb My Home" />
									<hr />
									<MenuItem onClick={() => router.push('/')} label="Home Page" />
									<MenuItem onClick={() => signOut()} label="Logout" />
								</>
							) : (
								<>
									<MenuItem onClick={loginModal.onOpen} label="Login" />
									<MenuItem onClick={registerModal.onOpen} label="Sign up" />
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
