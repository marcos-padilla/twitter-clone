'use client'

import { AtSign, Check, Globe, ShieldCheck, UserCheck } from 'lucide-react'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

const replyItems = [
	{
		name: 'Everyone can reply',
		value: 'everyone',
		Icon: Globe,
	},
	{
		name: 'People you follow',
		value: 'following',
		Icon: UserCheck,
	},
	{
		name: 'Verified Accounts',
		value: 'verified',
		Icon: ShieldCheck,
	},
	{
		name: 'Only people you mention',
		value: 'mention',
		Icon: AtSign,
	},
] as const

type ReplyItem = (typeof replyItems)[number]

export default function ReplayToPostPopover() {
	const [activeReplyItem, setActiveReplyItem] = useState<ReplyItem>(
		replyItems[0]
	)
	const [open, setOpen] = useState<boolean | undefined>(false)
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className='text-xs text-primary flex items-center hover:bg-primary/10 justify-start transition-all rounded-lg cursor-pointer px-2 py-1 gap-2 w-auto'>
					<activeReplyItem.Icon size={15} />{' '}
					{activeReplyItem.name}
				</button>
			</PopoverTrigger>
			<PopoverContent>
				<span className='font-bold text-sm'>Who can reply?</span>
				<p className='text-muted-foreground text-xs'>
					Choose who can reply to this post. Anyone mentioned can
					always reply.
				</p>
				<div className='flex flex-col items-stretch my-2'>
					{replyItems.map((replyItem) => (
						<button
							key={replyItem.value}
							className='flex items-center gap-2 px-2 py-4 rounded-lg hover:bg-primary/10 transition-all duration-500 cursor-pointer'
							onClick={() => {
								setActiveReplyItem(replyItem)
								setOpen(false)
							}}
						>
							<span className='bg-primary rounded-full p-2 text-white'>
								<replyItem.Icon size={18} />
							</span>
							{replyItem.name}
							{replyItem.value ===
								activeReplyItem.value && (
								<div className='ml-auto text-primary'>
									<Check size={15} />
								</div>
							)}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
