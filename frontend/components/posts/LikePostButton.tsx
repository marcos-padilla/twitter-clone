'use client'

import { Heart } from 'lucide-react'
import ActionTooltip from '../ActionTooltip'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { likePost } from '@/lib/actions'

export default function LikePostButton({
	isLikedByUser,
	countLikes,
	id,
}: {
	isLikedByUser: boolean
	countLikes: number
	id: number
}) {
	const [isLiked, setIsLiked] = useState(isLikedByUser)
	const [likes, setLikes] = useState<number>(countLikes)
	return (
		<ActionTooltip label={'Like'} size='xs'>
			<form className='flex items-center' action={likePost}>
				<input type='hidden' name='post_id' value={id} />
				<button
					onClick={() => {
						setIsLiked(!isLiked)
						setLikes(isLiked ? likes - 1 : likes + 1)
					}}
					type='submit'
				>
					<div className='flex items-center gap-x-[1px] group'>
						<div
							className={cn(
								'group-hover:bg-red-500/20 group-hover:text-red-500 p-1 rounded-full transition-all duration-300',
								isLiked && 'bg-red-500/20 text-red-500'
							)}
						>
							<Heart
								size={20}
								strokeWidth={isLiked ? 3 : 1.5}
							/>
						</div>
						<span
							className={cn(
								'text-muted-foreground group-hover:text-red-500 transition-all duration-300',
								isLiked && 'text-red-500 font-extrabold'
							)}
						>
							{likes}
						</span>
					</div>
				</button>
			</form>
		</ActionTooltip>
	)
}
