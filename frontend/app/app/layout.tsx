import ProtectedRoute from '@/components/ProtectedRoute'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Sidebar from '@/components/Sidebar'

export default function ApplicationLayout({
	children,
	info,
}: {
	children: React.ReactNode
	info: React.ReactNode
}) {
	return (
		<ProtectedRoute>
			<Sidebar />
			<main className='md:ml-52 ml-20 transition-all flex'>
				{children}
				<div className='h-52 w-52'>{info}</div>
			</main>
			<ScrollToTopButton />
		</ProtectedRoute>
	)
}
