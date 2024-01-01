import { SetStateAction } from 'react';
import { Locale } from '../../i18n.config';

export type CardData = {
	id: string;
	word: string;
	meaning: string;
	sentence: string;
	progress: number;
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

export type SearchParamsType = { [key: string]: string | string[] | undefined };

export type ServerComponentPropsType = {
	params: { slug: string, lang: Locale }
	searchParams: SearchParamsType
}

export type CredentialsType = {
	accessToken: string | undefined
}
export type ModalDataType = {
	message: string,
	type: ModalType
}

export type ModalType = 'error' | 'warning' | 'info' | 'success'

export type CategoryType = {
	id: string,
	name: string,
	color: string
}

export type Definition = {
	word: string,
	functional_label: string,
	pronunciation: string[],
	definition: Sense[],
	popularity: string
}

export type Sense = {
	number: string,
	meanings: string[],
	synonyms: string[],
	antonyms: string[],
	illustrations: string[],
	senses: Sense[]
}

export type CharObg = {
	id: string,
	char: string
};

export type SettingsCookie = {
	crosswordWordCount: number
}