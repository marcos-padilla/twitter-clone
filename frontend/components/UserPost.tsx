'use client'

import { useState } from 'react'
import ReplayToPostPopover from './ReplayToPostPopover'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import ActionTooltip from './ActionTooltip'
import { CalendarClock, ImagePlus, List, Smile } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const MAX_POST_CONTENT = 100

export default function UserPost() {
	const [postContent, setPostContent] = useState('')
	return (
		<div className='border-b flex p-2 gap-x-2'>
			<Avatar>
				<AvatarFallback>MP</AvatarFallback>
			</Avatar>
			<div className='flex-1 flex flex-col items-stretch gap-y-2'>
				<textarea
					className='focus:outline-none focus:ring-0 text-lg h-auto'
					placeholder='What is on your mind?!'
					value={postContent}
					onChange={(e) => {
						if (e.target.value.length > MAX_POST_CONTENT)
							return
						setPostContent(e.target.value)
					}}
					onInput={(e) => {
						e.currentTarget.style.height = 'auto'
						e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
					}}
				/>
				{postContent.length >= MAX_POST_CONTENT && (
					<Card className='bg-accent'>
						<CardHeader>
							<CardTitle className='text-md'>
								Upgrade to premium
							</CardTitle>
						</CardHeader>
						<CardContent className='text-xs text-muted-foreground'>
							<span className='font-bold underline cursor-pointer'>
								Upgrade to premium
							</span>{' '}
							to write longer posts and apply formatting
							such as bold and italics.
						</CardContent>
					</Card>
				)}
				<div className='flex items-start'>
					<ReplayToPostPopover />
				</div>
				<Separator />
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-2'>
						<ActionTooltip label='Media' size='xs'>
							<div className='hover:bg-primary/20 text-primary rounded-full p-2 transition-all'>
								<ImagePlus />
							</div>
						</ActionTooltip>
						<ActionTooltip label='Poll' size='xs'>
							<div className='hover:bg-primary/20 text-primary rounded-full p-2 transition-all'>
								<List />
							</div>
						</ActionTooltip>
						<ActionTooltip label='Emoji' size='xs'>
							<div className='hover:bg-primary/20 text-primary rounded-full p-2 transition-all'>
								<Smile />
							</div>
						</ActionTooltip>
						<ActionTooltip label='Schedule' size='xs'>
							<div className='hover:bg-primary/20 text-primary rounded-full p-2 transition-all'>
								<CalendarClock />
							</div>
						</ActionTooltip>
					</div>
					<div className='flex items-stretch gap-x-2'>
						<div
							className={cn(
								'border-r-2 pr-2 flex items-center text-muted-foreground text-xs',
								postContent.length >
									MAX_POST_CONTENT - 20 &&
									'text-orange-500',
								postContent.length >
									MAX_POST_CONTENT - 5 &&
									'text-red-700'
							)}
						>
							{postContent.length} - {MAX_POST_CONTENT}
						</div>
						<Button className='rounded-full'>Post</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
