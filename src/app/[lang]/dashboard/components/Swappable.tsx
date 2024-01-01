import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { CardData } from '@/types';

interface SwappableProps {
	removeCard: (id: number, action: ("right" | "left")) => void,
	data: CardData,
	children: ReactNode
}

export default function Swappable({ data, removeCard, children }: SwappableProps ) {
	const [exitX, setExitX] = useState(100);
	const x = useMotionValue(1);
	const rotate = useTransform(x, [-500, 500], [-25, 25]);
	const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

	const dragEnd = (
		e: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		if(info.offset.x > 100) {
			setExitX(200);
			removeCard(data.id, 'right');
		} else if(info.offset.x < -100) {
			setExitX(-200);
			removeCard(data.id, 'left');
		}
	};

	return (
		<motion.div
			drag="x"
			dragConstraints={ { left: 0, right: 0, top: 0, bottom: 0 } }
			onDragEnd={ dragEnd }
			initial={ { scale: 1, opacity: 1 } }
			animate={ { scale: 1, opacity: 1 } }
			style={ { x, rotate, opacity } }
			transition={{ type: 'tween', duration: 0.3, ease: 'easeIn' }}
			whileDrag={ { cursor: 'grabbing' } }
			exit={ { x: exitX } }
		>
			{ children }
		</motion.div>
	);
};