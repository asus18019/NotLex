import Link from 'next/link';
import { Box } from '@mui/material';
import Span from '@/app/[lang]/faq/components/Span';

export const faq = [
	{
		id: 1,
		question: 'What is NotLex ?',
		answer: <>
			NotLex is an online platform designed to improve your vocabulary.<br/> We use
			<Span weight="bold"> your Notion database</Span> to store and access words list.
		</>
	},
	{
		id: 2,
		question: 'Can I try to use?',
		answer: <>
			Yes. You can try to use NotLex with out testing account. <br/>Use it <Span weight="bold">for testing purpose only.</Span><br/><br/>
			Use the credentials below to log in: <br/>
			SECRET_KEY: <Span style="italic" weight="bold">secret_98YdsFTTTsLg4227vBIKNGBUbz4yDsl48N3bKD8pZdx</Span><br/>
			DATABASE_ID: <Span style="italic" weight="bold">4370aa40e7024df0bfcd2a572205ef1c</Span><br/>
		</>
	},
	{
		id: 3,
		question: 'Is it free to use ?',
		answer: <>
			Yes. NotLex is absolutely <Span weight="bold">free</Span> to use.
		</>
	},
	{
		id: 4,
		question: 'What do I need to start using Notlex ?',
		answer: <>
			If you don&apos;t have already existing notion database: <br/>
			1. <Span size="14px" style="italic">SECRET_KEY</Span><br/>
			2. <Span size="14px" style="italic">PAGE_ID</Span><br/><br/>

			If you have database: <br/>
			1. <Span size="14px" style="italic">SECRET_KEY</Span><br/>
			2. <Span size="14px" style="italic">DATABASE_ID</Span><br/><br/>

			Read below to find out how to get these data.
		</>
	},
	{
		id: 5,
		question: 'Where to find my PAGE_ID ?',
		answer: <>
			1. Register your Notion account if you don&apos;t have any. <br/>
			2. Log in into your notion account. <br/>
			3. Add a new page. <br/>
			4. Copy <Span style="italic">PAGE_ID</Span> from URL. <br/><br/>
			<Box component="img" src="/faq/1.png" alt="img" sx={{ border: '1px solid black', width: '100%' }} />
			<br/>Steps 3 & 4 shown on the screenshot.
		</>
	},
	{
		id: 6,
		question: 'Where to find and connect my SECRET_KEY ?',
		answer: <>
			If you are logged in into NotLex you can copy <Span size="14px" style="italic">SECRET_KEY</Span> and <Span size="14px" style="italic">DATABASE_ID</Span> on the <Span weight={ 600 }><Link href='/settings'>settings</Link></Span> page. <br/><br/>
			1. Log in into your Notion account. <br/>
			2. Go to your <Span weight={ 600 }><Link href="https://www.notion.so/my-integrations">Notion integrations</Link></Span> and create a new one. <br/>
			3. Copy your SECRET_KEY. Use it to log in or create new database. <br/><br/>
			<Box component="img" src="/faq/2.png" alt="img" sx={{ border: '1px solid black', width: '100%' }} />
			4. Add this integration to the page. <br/><br/>
			<Box component="img" src="/faq/3.png" alt="img" sx={{ border: '1px solid black', width: '100%' }} />
		</>
	},
	{
		id: 7,
		question: 'Where to find my DATABASE_ID ?',
		answer: <>
			If you are logged in into NotLex you can copy <Span size="14px" style="italic">SECRET_KEY</Span> and <Span size="14px" style="italic">DATABASE_ID</Span> from <Span weight={ 600 }><Link href='/settings'>settings</Link></Span> page. <br/><br/>
			<Span weight="bold">You don&apos;t have DATABASE_ID if you don&apos;t have the database.</Span><br/>
			Create a new one to get DATABASE_ID<br/><br/>
			1. Log in into your Notion account. <br/>
			2. Open Notion database and copy DATABASE_ID from URL
			<Box component="img" src="/faq/4.png" alt="img" sx={{ border: '1px solid black', width: '100%' }} />
		</>
	},
	{
		id: 8,
		question: 'How do we use your data ?',
		answer: <>
			All your date are stored in your browser&apos;s cookies. We <Span weight="bold">only</Span> use it to access the Notion database. You can clear all your private data on the <Link href="/settings">settings</Link> page.
		</>
	}
];