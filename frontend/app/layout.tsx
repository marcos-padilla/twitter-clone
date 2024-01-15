import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import ThemeProvider from '@/providers/ThemeProvider'

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
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					storageKey='twitter-theme'
				>
					<Toaster />
					<Sidebar />
					<main className='md:ml-52 ml-20 transition-all'>
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
