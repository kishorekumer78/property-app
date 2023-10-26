import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/libs/types';
import { useLoginModal } from '@/hooks/use-login-modal';

type Props = {
	listingId: string;
	currentUser?: SafeUser | null;
};

export const useFavorite = ({ listingId, currentUser }: Props) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasMadeFavorite = useMemo(() => {
		const lists = currentUser?.favoriteIds || [];
		return lists.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (!currentUser) {
				return loginModal.onOpen();
			}
			try {
				let request;
				if (hasMadeFavorite) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}
				await request();
				router.refresh();
				toast.success(hasMadeFavorite ? 'Removed from favorites' : 'Added to favorites');
			} catch (error: any) {
				toast.error('Something went wrong');
			}
		},
		[currentUser, listingId, hasMadeFavorite, router, loginModal]
	);
	return {
		toggleFavorite,
		hasMadeFavorite
	};
};
