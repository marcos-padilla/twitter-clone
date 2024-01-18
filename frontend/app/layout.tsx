import { Toaster } from '@/components/ui/toaster'
import SessionProvider from '@/providers/SessionProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Twitter Clone',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem
						storageKey='twitter-theme'
					>
						<Toaster />
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
