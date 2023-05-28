import "./globals.css"

export const metadata = {
	title: "Trival image viewer",
	description: "Browse your local desktop image collection",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
