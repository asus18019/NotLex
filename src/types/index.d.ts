import { SetStateAction } from 'react';

export type CardData = {
	id: string;
	word: string;
	meaning: string;
	sentence: string;
	guesses: number;
	category: string[]
};

export type CardProps = {
	data: CardData;
	active: boolean;
	removeCard: (id: string, action: 'right' | 'left') => void;
};

export type SwipeButtonProps = {
	exit: (value: SetStateAction<number>) => void;
	removeCard: (id: number, action: 'right' | 'left') => void;
	id: number;
};