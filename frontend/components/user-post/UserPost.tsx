'use client'

import { axiosInstance } from '@/lib/axiosInstance'
import { cn } from '@/lib/utils'
import { PollInput, PostWithUser } from '@/types'
import { CalendarClock, ImagePlus, List, LucideIcon, Smile } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import ActionTooltip from '../ActionTooltip'
import PollCard from '../PollCard'
import ReplayToPostPopover from '../ReplayToPostPopover'
import UserAvatar from '../UserAvatar'
import PostCard from '../posts/PostCard'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { useToast } from '../ui/use-toast'
import ProgressiveCircularBar from './ProgressiveCircularBar'

const MAX_POST_CONTENT = 200

const Wrapper = ({
	children,
	disabled,
	label,
}: {
	children: React.ReactNode
	disabled: boolean
	label: string
}) => {
	if (disabled) return <>{children}</>
	return (
		<ActionTooltip label={label} size='xs'>
			{children}
		</ActionTooltip>
	)
}

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
	return (
		<Wrapper disabled={disabled} label={label}>
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
	const [dinamicPosts, setDinamicPosts] = useState<PostWithUser[]>([])
	const [mediaFiles, setMediaFiles] = useState<File[]>([])
	const { toast } = useToast()

	const onSubmit = async () => {
		const postData = {
			content: postContent,
			poll,
		}
		mediaFiles.forEach((file, index) => {
			//@ts-ignore
			postData[`imagen${index + 1}`] = file
		})
		axiosInstance
			.post('/posts', postData, {
				headers: {
					//@ts-ignore
					Authorization: `Bearer ${data?.apiToken}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				setPostContent('')
				setMediaFiles([])
				setPoll(null)
				setDinamicPosts((prev) => [res.data, ...prev])
			})
			.catch((e) => {
				console.log(e)
			})
	}

	return (
		<>
			<div className='border-b flex p-2 gap-x-2'>
				<UserAvatar
					name={data?.user?.name}
					image={data?.user?.image}
				/>
				<div className='flex-1 flex flex-col items-stretch gap-y-2'>
					<textarea
						className='focus:outline-none focus:ring-0 text-lg h-auto bg-transparent'
						placeholder={
							poll
								? 'Ask a question...'
								: "What's happening?"
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
								to write longer posts and apply
								formatting such as bold and italics.
							</CardContent>
						</Card>
					)}
					{mediaFiles.length > 0 && (
						<div className='flex flex-wrap gap-2 justify-center'>
							{mediaFiles.map((file, index) => (
								<div
									key={file.name}
									className='relative w-52 h-52'
								>
									<Image
										src={URL.createObjectURL(
											file
										)}
										alt={file.name}
										className='rounded-md'
										layout='fill'
									/>
									<button
										className='absolute -top-2 -right-2 rounded-full bg-red-500 text-white font-bold h-7 w-7'
										onClick={() => {
											setMediaFiles((prev) =>
												prev.filter(
													(_, i) =>
														i !==
														index
												)
											)
										}}
									>
										X
									</button>
								</div>
							))}
						</div>
					)}
					<div className='flex items-start'>
						<ReplayToPostPopover />
					</div>
					<Separator />
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-x-2'>
							<label htmlFor='media'>
								<Wrapper
									disabled={
										mediaFiles.length >= 2 ||
										poll != null
									}
									label='Media'
								>
									<div
										className={cn(
											'hover:bg-primary/20 text-primary rounded-full p-2 transition-all cursor-pointer',
											(mediaFiles.length >=
												2 ||
												poll != null) &&
												'text-primary/20 hover:bg-transparent cursor-default'
										)}
									>
										<ImagePlus />
									</div>
								</Wrapper>
							</label>
							<input
								type='file'
								className='hidden'
								name='media'
								id='media'
								multiple
								accept='image/*'
								onChange={(e) => {
									if (e.target.files) {
										const files = Array.from(
											e.target.files
										)
										if (
											files.length +
												mediaFiles.length >
											2
										) {
											toast({
												title: 'You can only upload 2 images at a time',
												description:
													'Upgrade to premium to upload more images at a time',
											})
										} else {
											setMediaFiles((prev) => [
												...prev,
												...files,
											])
										}
									}
								}}
								disabled={
									mediaFiles.length >= 2 ||
									poll != null
								}
							/>

							<UserPostIcon
								label='Poll'
								onClick={() => {
									if (!poll) {
										setPoll({
											questions: [
												{ question: '' },
												{ question: '' },
											],
											pollLength: {
												days: 1,
												hours: 0,
												minutes: 0,
											},
										})
									}
								}}
								disabled={
									poll !== null ||
									mediaFiles.length > 0
								}
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
							<ProgressiveCircularBar
								actual={postContent.length}
								limit={MAX_POST_CONTENT}
							/>
							<div className='flex items-center'>
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
			</div>
			{dinamicPosts.map((post) => (
				<PostCard post={post} key={post.id} />
			))}
		</>
	)
}
