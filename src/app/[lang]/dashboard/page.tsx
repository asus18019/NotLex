import { Metadata } from 'next';
import ProgramSelector from './components/ProgramSelector';

export const metadata: Metadata = {
	title: 'Dashboard | NotLex',
	description: 'Choose a program and start learning your words',
}

export default function Dashboard() {
	return (
		<ProgramSelector/>
	);
};