'use client';

import React from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { MdOutlineVilla } from 'react-icons/md';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import {
	GiWindmill,
	GiCactus,
	GiForestCamp,
	GiCaveEntrance,
	GiCastle,
	GiBarn,
	GiBoatFishing,
	GiIsland
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';

import CategoryBox from '@/components/CategoryBox';

export const categories = [
	{ label: 'Beach', icon: TbBeach, description: 'This property is close to Beach!' },
	{ label: 'Windmills', icon: GiWindmill, description: 'This property has Windmill!' },
	{ label: 'Modern', icon: MdOutlineVilla, description: 'This is a modern Villa!' },
	{ label: 'Countryside', icon: TbMountain, description: 'This is a countryside house!' },
	{ label: 'Pools', icon: TbPool, description: 'This is property has pool!' },
	{ label: 'Islands', icon: GiIsland, description: 'This property is on an island!' },
	{ label: 'Lake', icon: GiBoatFishing, description: 'This property is near a lake!' },
	{ label: 'Skiing', icon: FaSkiing, description: 'This property has skiing activities!' },
	{ label: 'Castles', icon: GiCastle, description: 'This property is an ancient castle!' },
	{ label: 'Caves', icon: GiCaveEntrance, description: 'This property is in a spooky cave!' },
	{ label: 'Camping', icon: GiForestCamp, description: 'This  offers camping activities!' },
	{ label: 'Arctic', icon: BsSnow, description: 'This property is in arctic environment!' },
	{ label: 'Desert', icon: GiCactus, description: 'This property is in the desert!' },
	{ label: 'Barns', icon: GiBarn, description: 'This property is in a barn!' },
	{ label: 'Lux', icon: IoDiamond, description: 'This property is brand new and luxurious!' }
];
export default function Categories() {
	const params = useSearchParams();
	const category = params?.get('category');
	// only showing the categories in the main page
	const pathname = usePathname();
	const isMainPage = pathname === '/';
	if (!isMainPage) {
		return null;
	}
	return (
		<>
			<Container>
				<div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
					{categories.map((item, i) => (
						<CategoryBox
							key={i}
							label={item.label}
							icon={item.icon}
							selected={category === item.label}
						/>
					))}
				</div>
			</Container>
		</>
	);
}
