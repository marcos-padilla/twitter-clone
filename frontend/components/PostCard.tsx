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
import ActionTooltip from './ActionTooltip'
import { Avatar, AvatarFallback } from './ui/avatar'

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
			<div className='flex items-center gap-x-2'>
				<Icon size={20} />
				{count && (
					<span className='text-muted-foreground'>{count}</span>
				)}
			</div>
		</ActionTooltip>
	)
}

export default function PostCard() {
	return (
		<div className='border-b cursor-pointer hover:bg-accent/20 transition-all duration-500 p-5'>
			<div className='flex gap-x-5'>
				<Avatar>
					<AvatarFallback>MP</AvatarFallback>
				</Avatar>
				<div className='flex flex-col flex-1'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-x-2 text-xs'>
								<span className='font-bold hover:underline flex'>
									Marcos Padilla
									<span className='text-primary'>
										<BadgeCheck
											size={13}
											strokeWidth={3}
										/>
									</span>
								</span>
								<span className='text-muted-foreground'>
									@marcos-padilla
								</span>
								<span>-</span>
								<span className='text-muted-foreground'>
									1h
								</span>
							</div>
							<p className='text-sm mt-2'>
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Amet eligendi adipisci
								temporibus exercitationem fuga
								asperiores, cupiditate dolor consectetur
								praesentium enim perferendis soluta.
								Consequatur blanditiis voluptatibus
								impedit cum adipisci minus obcaecati.
							</p>
						</div>
						<ActionTooltip label='More' size='xs'>
							<MoreHorizontal size={20} />
						</ActionTooltip>
					</div>
					<div className='flex justify-center'>
						<Image
							alt={'Post image'}
							src={'/post-test-image.jpg'}
							width={300}
							height={300}
							className='rounded-md mt-5'
						/>
					</div>
					<div className='flex justify-between mt-5'>
						<PostAction
							label='Comment'
							Icon={MessageCircle}
							count={15}
						/>
						<PostAction
							label='Repost'
							Icon={Repeat}
							count={52}
						/>

						<PostAction
							label='Like'
							Icon={Heart}
							count={100}
						/>

						<PostAction
							label='View'
							Icon={BarChart2}
							count={255}
						/>

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
