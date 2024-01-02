'use client';
import { useCredentials } from '@/hooks/useCredentials';
import Link from 'next/link';
import { fetchWords } from '@/utils/fetchWords';
import { useEffect, useState } from 'react';
import { CardData } from '@/types';

export default function Library() {
	const { accessToken = '' } = useCredentials();

	const [isFetching, setIsFetching] = useState(true);
	const [words, setWords] = useState<CardData[]>([]);

	useEffect(() => {
		fetchWords(accessToken, { randomize: true })
			.then(response => {
				if(!response.ok) {
					throw new Error('Something went wrong');
				}
				return response.json();
			})
			.then(result => setWords(result.data))
			.catch(error => console.log(error))
			.finally(() => setIsFetching(false));
	}, [accessToken]);

	return (
		<div>
			<Link href="/library/add">Add</Link>
			<br/>
			{ isFetching && <h1>fetching...</h1> }
			{ words.map(word => (<h1 key={ word.id }>{ word.word }</h1>)) }
		</div>
	);
};