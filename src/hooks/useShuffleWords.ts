import { CardData } from '@/types';
import { shuffleArray } from '@/utils/shuffleArray';

export const useShuffleWords = () => {
	const ANSWERS_PER_CARD = 4;

	const shuffleWords = (words: CardData[], correctWord: CardData): CardData[] => {
		const randomWords: CardData[] = [];

		while (randomWords.length < ANSWERS_PER_CARD - 1) {
			if(randomWords.length === words.length) break;

			const randomNumber = Math.floor(Math.random() * words.length);
			const randomWord = words[randomNumber];

			if (!randomWords.includes(randomWord)) {
				randomWords.push(randomWord);
			}
		}

		return shuffleArray([...randomWords, correctWord]);
	};

	return {
		shuffleWords
	};
};