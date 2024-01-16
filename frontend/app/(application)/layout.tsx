import Sidebar from '@/components/Sidebar'

export default function ApplicationLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Sidebar />
			<main className='md:ml-52 ml-20 transition-all'>{children}</main>
		</>
	)
}
