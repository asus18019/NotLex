import { CardData } from '@/types';

export const getOptionColor = (
	answer: CardData | undefined,
	activeWord: CardData,
	word: CardData
): string => {
	if(!answer) return 'transparent';

	if(activeWord === word) {
		return '#bfffcd !important';
	} else if(word === answer) {
		return '#faafaf !important';
	} else {
		return 'transparent';
	}
};