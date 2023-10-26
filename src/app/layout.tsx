import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import Navbar from '@/components/navbar/Navbar';

import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import RentModal from '@/components/modals/RentModal';

import ToastProvider from '@/providers/ToastProvider';
import { getCurrentUser } from '@/actions/getCurrentUser';

import './globals.css';
import SearchModal from '@/components/modals/SearchModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Property App',
	description: 'Property App'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={font.className}>
				<ToastProvider />
				<LoginModal />
				<RegisterModal />
				<RentModal />
				<SearchModal />

				<Navbar currentUser={currentUser} />

				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
