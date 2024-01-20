import {
	BadgeCheck,
	BarChart2,
	Bookmark,
	Heart,
	LucideIcon,
	MessageCircle,
	MoreHorizontal,
	Repeat,
	Share,
} from 'lucide-react'
import Image from 'next/image'
import ActionTooltip from '../ActionTooltip'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { PostWithUser } from '@/types'
import { getAvatarFallback } from '@/lib/utils'

const PostAction = ({
	label,
	Icon,
	count,
}: {
	label: string
	Icon: LucideIcon
	count?: number
}) => {
	return (
		<ActionTooltip label={label} size='xs'>
			<div className='flex items-center gap-x-[1px]'>
				<Icon size={20} />
				{count && (
					<span className='text-muted-foreground'>{count}</span>
				)}
			</div>
		</ActionTooltip>
	)
}

export default function PostCard({ post }: { post: PostWithUser }) {
	return (
		<div className='border-b cursor-pointer hover:bg-accent/20 transition-all duration-500 p-5'>
			<div className='flex gap-x-5'>
				<Avatar>
					<AvatarFallback>
						{getAvatarFallback(post.user.name)}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col flex-1'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-x-2 text-xs'>
								<span className='font-bold hover:underline flex'>
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
							{post.content && (
								<p className='text-sm mt-2'>
									{post.content}
								</p>
							)}
						</div>
						<ActionTooltip label='More' size='xs'>
							<MoreHorizontal size={20} />
						</ActionTooltip>
					</div>
					{post.media.length > 0 && (
						<div className='flex justify-center'>
							<Image
								alt={'Post image'}
								src={'/post-test-image.jpg'}
								width={300}
								height={300}
								className='rounded-md mt-5'
							/>
						</div>
					)}
					<div className='flex justify-between mt-5'>
						<div className='flex space-x-8'>
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
							<ActionTooltip label={'Repost'} size='xs'>
								<div className='flex items-center gap-x-[1px] group'>
									<div className='group-hover:bg-green-500/20 group-hover:text-green-500 p-1 rounded-full transition-all duration-300'>
										<Repeat size={20} />
									</div>
									<span className='text-muted-foreground group-hover:text-green-500 transition-all duration-300'>
										{52}
									</span>
								</div>
							</ActionTooltip>
							<ActionTooltip label={'Like'} size='xs'>
								<div className='flex items-center gap-x-[1px] group'>
									<div className='group-hover:bg-red-500/20 group-hover:text-red-500 p-1 rounded-full transition-all duration-300'>
										<Heart size={20} />
									</div>
									<span className='text-muted-foreground group-hover:text-red-500 transition-all duration-300'>
										{100}
									</span>
								</div>
							</ActionTooltip>
							<ActionTooltip label={'View'} size='xs'>
								<div className='flex items-center gap-x-[1px] group'>
									<div className='group-hover:bg-purple-500/20 group-hover:text-purple-500 p-1 rounded-full transition-all duration-300'>
										<BarChart2 size={20} />
									</div>
									<span className='text-muted-foreground group-hover:text-purple-500 transition-all duration-300'>
										{255}
									</span>
								</div>
							</ActionTooltip>
						</div>

						<div className='flex gap-x-2'>
							<PostAction
								label='Bookmark'
								Icon={Bookmark}
							/>
							<PostAction label='Share' Icon={Share} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
