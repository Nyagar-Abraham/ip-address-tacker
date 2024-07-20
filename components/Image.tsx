'use client';

import Image from 'next/image';
import bgDesktop from '@/public/images/pattern-bg-desktop.png';
import bgMobile from '@/public/images/pattern-bg-mobile.png';
import { useEffect, useState } from 'react';

const Bg = () => {
	const [image, setImage] = useState(null);
	function update() {
		const width = window.innerWidth;
		if (width > 390) {
			//@ts-ignorets
			setImage(bgDesktop);
		} else {
			//@ts-ignorets
			setImage(bgMobile);
		}
	}

	useEffect(() => {
		update();

		function callback() {
			update();
		}

		window.addEventListener('resize', callback);

		return () => {
			window.removeEventListener('resize', callback);
		};
	}, []);
	return (
		<>
			{image && (
				<Image
					className="h-full w-full object-cover object-center"
					src={image}
					alt="background"
				/>
			)}
		</>
	);
};

export default Bg;
