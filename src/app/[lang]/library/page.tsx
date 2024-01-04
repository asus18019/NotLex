import { Metadata } from 'next';
import { ServerComponentPropsType } from '@/types';
import Content from '@/app/[lang]/library/components/Content';

export const metadata: Metadata = {
	title: 'Library | NotLex',
	description: 'Your words library',
}

export default function Add({ params }: ServerComponentPropsType) {
	return <Content lang={ params.lang }/>;
};