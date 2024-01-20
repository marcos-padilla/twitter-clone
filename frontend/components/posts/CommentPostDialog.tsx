import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import { PostWithUser } from '@/types'
import { BadgeCheck, MessageCircle } from 'lucide-react'
import ActionTooltip from '../ActionTooltip'
import UserAvatar from '../UserAvatar'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'

export default function CommentPostDialog({ post }: { post: PostWithUser }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					<ActionTooltip label={'Comment'} size='xs'>
						<div className='flex items-center gap-x-[1px] group'>
							<div className='group-hover:bg-primary/20 group-hover:text-primary p-1 rounded-full transition-all duration-300'>
								<MessageCircle size={20} />
							</div>
							<span className='text-muted-foreground group-hover:text-primary transition-all duration-300'>
								{post.count_comment}
							</span>
						</div>
					</ActionTooltip>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogDescription>
						<div className='flex flex-col space-y-5'>
							<div className='flex gap-4'>
								<UserAvatar
									name={post.user.name}
									image={post.user.avatar_path}
								/>
								<div className='flex flex-col'>
									<div className='flex space-x-2'>
										<span className='font-bold hover:underline flex text-foreground'>
											{post.user.name}
											<span className='text-primary'>
												<BadgeCheck
													size={13}
													strokeWidth={3}
												/>
											</span>
										</span>
										<span className='text-muted-foreground'>
											@{post.user.username}
										</span>
										<span>-</span>
										<span className='text-muted-foreground'>
											1h
										</span>
									</div>
									<p className='my-2 text-foreground'>
										{post.content}
									</p>
								</div>
							</div>
							<div className='flex gap-x-2'>
								<UserAvatar name={'Test'} />
								<ScrollArea className='max-h-[400px] w-full'>
									<textarea
										className='focus:outline-none focus:ring-0 text-lg h-auto bg-transparent w-full'
										placeholder={
											'Post your comment'
										}
										onInput={(e) => {
											e.currentTarget.style.height =
												'auto'
											e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
										}}
									/>
								</ScrollArea>
							</div>
							<div className='flex justify-end'>
								<Button className='rounded-full'>
									Comment
								</Button>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
