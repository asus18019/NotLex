import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useLayoutEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return size;
}