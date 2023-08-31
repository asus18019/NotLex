import ProgramSelector from '@/app/dashboard/components/ProgramSelector';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard | NotLex',
	description: 'Choose a program and start learning your words',
}

export default function Dashboard() {
	return (
		<ProgramSelector/>
	);
};