'use client'

import { cn } from '@/lib/utils'
import { Settings } from 'lucide-react'
import { useState } from 'react'

const feeds = [
	{
		name: 'For you',
		value: 'for-you',
	},
	{
		name: 'Following',
		value: 'following',
	},
] as const

type ActiveFeed = (typeof feeds)[number]['value']

export default function HomeNavbar() {
	const [activeFeed, setActiveFeed] = useState<ActiveFeed>('for-you')
	return (
		<header className='border-b flex items-stretch justify-stretch h-14 sticky top-0 z-50 bg-transparent backdrop-blur-md'>
			{feeds.map((feed) => (
				<button
					key={feed.value}
					className={cn(
						'flex-1 flex justify-center items-center hover:bg-accent/50 transition-all duration-500 cursor-pointer font-bold text-muted-foreground border-b-4 border-transparent',
						activeFeed === feed.value &&
							'text-foreground border-primary'
					)}
					onClick={() => setActiveFeed(feed.value)}
				>
					{feed.name}
				</button>
			))}
			<div className='flex justify-center items-center hover:bg-accent transition-all duration-500 cursor-pointer px-2'>
				<Settings />
			</div>
		</header>
	)
}
