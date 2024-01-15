import HomeNavbar from '@/components/HomeNavbar'

export default function Layout({
	children,
	info,
}: {
	children: React.ReactNode
	info: React.ReactNode
}) {
	return (
		<div className='flex'>
			<div className='flex-[2] border-r'>
				<HomeNavbar />
				{children}
			</div>
			<div className='flex-1 lg:block hidden'>{info}</div>
		</div>
	)
}