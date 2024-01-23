import ProtectedRoute from '@/components/ProtectedRoute'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Sidebar from '@/components/Sidebar'

export default function ApplicationLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ProtectedRoute>
			<Sidebar />
			<main className='md:ml-52 ml-20 transition-all mb-16'>
				{children}
			</main>
			<ScrollToTopButton />
		</ProtectedRoute>
	)
}
