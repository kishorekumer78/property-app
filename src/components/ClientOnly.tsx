'use client';

import React, { useEffect, useState } from 'react';

type Props = {
	children: React.ReactNode;
};

export default function ClientOnly({ children }: Props) {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) {
		return null;
	}
	return <>{children}</>;
}
