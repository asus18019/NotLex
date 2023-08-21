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

export type WordDefinition = {
	definition: string,
	synonyms: string[],
	antonyms: string[],
	example: string
}

export type DictionaryWordResult = {
	word: string,
	phonetic: string,
	phonetics: {
		text: string,
		audio: string,
		sourceUrl: string,
		license: {
			name: string,
			url: string
		}
	} [],
	meanings: {
		partOfSpeech: string,
		definitions: WordDefinition[],
		synonyms: string[],
		antonyms: string[]
	} [],
	license: {
		name: string,
		url: string
	},
	sourceUrls: string[]
}

export type SearchParamsType = { [key: string]: string | string[] | undefined };

export type ServerComponentPropsType = {
	params: { slug: string }
	searchParams: SearchParamsType
}

export type CredentialsType = {
	secret: string | undefined,
	database_id: string | undefined
}