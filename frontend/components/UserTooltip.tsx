'use client'

import { User } from '@/types'
import { BadgeCheck } from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'
import UserAvatar from './UserAvatar'
import { Button } from './ui/button'
import { followUser, unfollowUser } from '@/lib/actions'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function UserTooltip({ user: userProp }: { user: User }) {
	const { data } = useSession()
	const [user, setUser] = useState<User>(userProp)
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className='flex items-center gap-x-2'>
						<span className='font-bold hover:underline flex'>
							{user.name}
							<span className='text-primary'>
								<BadgeCheck size={13} strokeWidth={3} />
							</span>
						</span>
						<span className='text-muted-foreground'>
							@{user.username}
						</span>
					</div>
				</TooltipTrigger>
				<TooltipContent className='w-[300px] p-4 cursor-default'>
					<div className='flex flex-col gap-y-5'>
						<div className='flex items-start justify-between'>
							<UserAvatar
								name={user.name}
								image={user.avatar_path}
								size='lg'
							/>

							{
								//@ts-ignore
								data?.user.id !== user.id && (
									<div>
										{user.is_following ? (
											<Button
												variant={'outline'}
												className='rounded-full text-foreground hover:bg-destructive/20 hover:text-red-500 hover:border-red-500 transition-all group'
												onClick={() => {
													unfollowUser(
														user.id
													)
													setUser({
														...user,
														is_following:
															false,
														count_followers:
															user.count_followers -
															1,
													})
												}}
											>
												<span className='group-hover:hidden'>
													Following
												</span>
												<span className='hidden group-hover:block'>
													Unfollow
												</span>
											</Button>
										) : (
											<Button
												className='rounded-full bg-foreground text-background hover:bg-primary/20 hover:text-primary transition-all'
												onClick={() => {
													followUser(
														user.id
													)
													setUser({
														...user,
														is_following:
															true,
														count_followers:
															user.count_followers +
															1,
													})
												}}
											>
												Follow
											</Button>
										)}
									</div>
								)
							}
						</div>
						<div className='flex flex-col'>
							<div className='flex items-center gap-x-1'>
								<span className='text-lg'>
									{user.name}
								</span>
								<span className='text-primary'>
									<BadgeCheck
										size={15}
										strokeWidth={3}
									/>
								</span>
							</div>
							<span className='text-muted-foreground font-medium'>
								@{user.username}
							</span>
						</div>
						<p className='text-foreground'>
							Lorem ipsum dolor sit amet consectetur,
							adipisicing elit. Placeat sapiente animi
							voluptatem quam esse nobis voluptates
							eligendi fugiat ipsam commodi.
						</p>
						<div className='flex items-center justify-around'>
							<div className='flex items-center gap-x-2'>
								<span className='text-foreground font-medium'>
									{user.count_following}
								</span>
								<span className='text-muted-foreground'>
									Following
								</span>
							</div>
							<div className='flex items-center gap-x-2'>
								<span className='text-foreground font-medium'>
									{user.count_followers}
								</span>
								<span className='text-muted-foreground'>
									Followers
								</span>
							</div>
						</div>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
