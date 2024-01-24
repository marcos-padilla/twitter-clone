'use client'

import { User } from '@/types'
import { Button } from './ui/button'
import { followUser, unfollowUser } from '@/lib/actions'
import { useState } from 'react'
import { set } from 'react-hook-form'

export default function FollowButton({
	authUserId,
	user,
}: {
	authUserId: number
	user: User
}) {
	const [isFollowing, setIsFollowing] = useState(user.is_following)
	if (authUserId === user.id) return null
	return (
		<div>
			{isFollowing ? (
				<Button
					variant={'outline'}
					className='rounded-full text-foreground hover:bg-destructive/20 hover:text-red-500 hover:border-red-500 transition-all group'
					onClick={() => {
						unfollowUser(user.id)
						setIsFollowing(false)
					}}
				>
					<span className='group-hover:hidden'>Following</span>
					<span className='hidden group-hover:block'>
						Unfollow
					</span>
				</Button>
			) : (
				<Button
					className='rounded-full bg-foreground text-background hover:bg-primary/20 hover:text-primary transition-all'
					onClick={() => {
						followUser(user.id)
						setIsFollowing(true)
					}}
				>
					Follow
				</Button>
			)}
		</div>
	)
}
