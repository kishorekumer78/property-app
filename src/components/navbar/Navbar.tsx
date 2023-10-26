'use client';

import React from 'react';

import Container from '@/components/Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from '@/libs/types';
import Categories from './Categories';

type Props = {
	currentUser?: SafeUser | null;
};
export default function Navbar({ currentUser }: Props) {
	return (
		<>
			<div className="fixed w-full bg-white z-10 shadow-sm">
				<div className="py-4 border-b">
					<Container>
						<div className="flex flex-row justify-between items-center gap-3 md:gap-0">
							<Logo />
							<Search />
							<UserMenu currentUser={currentUser} />
						</div>
					</Container>
				</div>
				<Categories />
			</div>
		</>
	);
}
