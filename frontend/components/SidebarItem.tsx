'use client'

import { cn } from '@/lib/utils'
import { SidebarItem } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarItem({ item }: { item: SidebarItem }) {
	const pathname = usePathname()

	return (
		<Link
			href={item.path}
			className={cn(
				'text-muted-foreground group hover:bg-accent p-2 rounded-full transition-all hover:text-foreground flex gap-x-2',
				pathname === item.path && 'text-foreground'
			)}
		>
			<item.Icon
				strokeWidth={pathname === item.path ? 3 : 2}
				className='z-50'
			/>
			{item.name && (
				<span className='hidden md:flex'>{item.name}</span>
			)}
		</Link>
	)
}
