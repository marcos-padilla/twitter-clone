import HomeNavbar from '@/components/HomeNavbar'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-[2] border-r'>
			<HomeNavbar />
			{children}
		</div>
	)
}
