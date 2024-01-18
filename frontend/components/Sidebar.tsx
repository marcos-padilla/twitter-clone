'use client'

import { sidebarItems } from '@/lib/constants'
import SidebarItem from './SidebarItem'
import { LogOut, X } from 'lucide-react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

export default function Sidebar() {
	return (
		<aside className='fixed border-r h-screen md:w-52 w-20 transition-all flex flex-col md:items-start md:pl-2 items-center gap-y-5 mt-2'>
			{sidebarItems.map((item, index) => (
				<SidebarItem key={index} item={item} />
			))}
			<div className='mt-auto mb-4'>
				<Button
					onClick={() => {
						signOut({ callbackUrl: '/auth' })
					}}
				>
					<LogOut />
				</Button>
			</div>
		</aside>
	)
}
