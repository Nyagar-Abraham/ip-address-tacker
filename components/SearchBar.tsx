'use client';

import { formUrlQuery, removeUrlQuery } from '@/lib/utils';
import icon from '@/public/images/icon-arrow.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchBar = () => {
	const searchParams = useSearchParams();
	const [search, SetSearch] = useState(searchParams.get('ip') || '');
	const router = useRouter();

	useEffect(() => {
		const deBounce = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'ip',
					value: search,
				});

				router.push(newUrl, { scroll: false });
			} else {
				const newUrl = removeUrlQuery({
					params: searchParams.toString(),
					keysToRemove: ['ip'],
				});

				router.push(newUrl, { scroll: false });
			}
		}, 500);
	}, [search]);
	return (
		<div className="w-10/12 mx-auto sm:w-8/12 md:w-7/12 flex items-center ">
			<input
				value={search}
				onChange={(e) => SetSearch(e.target.value)}
				type="text"
				className="px-3 caret-slate-500 border border-gray-400 py-2 rounded-l-lg  bg-white focus:outline-none hover:bg-gray-100 flex-1 text-gray-700 "
			/>
			<button className=" bg-black w-[40px] flex items-center justify-center rounded-r-lg h-[40px] ">
				<Image alt="icon" src={icon} />
			</button>
		</div>
	);
};

export default SearchBar;
