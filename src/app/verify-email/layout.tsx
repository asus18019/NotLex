export const metadata = {
	title: 'NotLex | Email verification'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
		<body>{ children }</body>
		</html>
	);
}
