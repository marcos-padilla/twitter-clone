'use client'

import { useState } from 'react'
import ReplayToPostPopover from './ReplayToPostPopover'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import ActionTooltip from './ActionTooltip'
import { CalendarClock, ImagePlus, List, LucideIcon, Smile } from 'lucide-react'
import { Button } from './ui/button'
import { cn, getAvatarFallback } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { PollInput } from '@/types'
import PollCard from './PollCard'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import axios from 'axios'

const MAX_POST_CONTENT = 100

const UserPostIcon = ({
	onClick,
	label,
	disabled,
	Icon,
}: {
	onClick: () => void
	label: string
	disabled: boolean
	Icon: LucideIcon
}) => {
	const Wrapper = ({ children }: { children: React.ReactNode }) => {
		if (disabled) return <>{children}</>
		return (
			<ActionTooltip label={label} size='xs'>
				{children}
			</ActionTooltip>
		)
	}
	return (
		<Wrapper>
			<button
				onClick={onClick}
				className={cn(
					'hover:bg-primary/20 text-primary rounded-full p-2 transition-all',
					disabled &&
						'text-primary/20 hover:bg-transparent cursor-default'
				)}
			>
				<Icon />
			</button>
		</Wrapper>
	)
}

export default function UserPost() {
	const [postContent, setPostContent] = useState('')
	const [poll, setPoll] = useState<PollInput | null>(null)
	const { data } = useSession()
	const avatarFallback = getAvatarFallback(data?.user?.name)

	const onSubmit = () => {
		axios.post(
			'http://127.0.0.1:8000/api/posts',
			{
				content: postContent,
				poll: poll,
			},
			{
				headers: {
					//@ts-ignore
					Authorization: `Bearer ${data?.apiToken}`,
				},
			}
		)
			.then((res) => {
				setPostContent('')
			})
			.catch((e) => {
				console.log({ e })
			})
	}

	return (
		<div className='border-b flex p-2 gap-x-2'>
			<Avatar>
				<AvatarFallback>{avatarFallback}</AvatarFallback>
			</Avatar>
			<div className='flex-1 flex flex-col items-stretch gap-y-2'>
				<textarea
					className='focus:outline-none focus:ring-0 text-lg h-auto bg-transparent'
					placeholder={
						poll ? 'Ask a question...' : "What's happening?"
					}
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
				{poll && <PollCard poll={poll} setPoll={setPoll} />}
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
						<UserPostIcon
							label='Media'
							onClick={() => {}}
							Icon={ImagePlus}
							disabled={poll !== null}
						/>
						<UserPostIcon
							label='Poll'
							onClick={() => {
								if (!poll) {
									setPoll({
										questions: ['', ''],
										pollLength: {
											days: 1,
											hours: 0,
											minutes: 0,
										},
									})
								}
							}}
							disabled={poll !== null}
							Icon={List}
						/>
						<UserPostIcon
							label='Emoji'
							onClick={() => {}}
							Icon={Smile}
							disabled={false}
						/>
						<UserPostIcon
							label='Schedule'
							onClick={() => {}}
							Icon={CalendarClock}
							disabled={poll !== null}
						/>
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
						<Button
							className='rounded-full'
							onClick={onSubmit}
						>
							Post
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
