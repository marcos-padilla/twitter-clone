'use client'

import { sidebarItems } from '@/lib/constants'
import SidebarItem from './SidebarItem'
import { X } from 'lucide-react'

export default function Sidebar() {
	return (
		<aside className='fixed border-r h-screen md:w-52 w-20 transition-all flex flex-col md:items-start md:pl-2 items-center gap-y-5 mt-2'>
			{sidebarItems.map((item, index) => (
				<SidebarItem key={index} item={item} />
			))}
		</aside>
	)
}