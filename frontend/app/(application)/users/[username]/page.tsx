import FollowButton from '@/components/FollowButton'
import UserAvatar from '@/components/UserAvatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { followUser, getUser, serverSession, unfollowUser } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { Post, User } from '@/types'
import {
	Copy,
	Flag,
	MessageCircle,
	MessageCircleOff,
	MoreHorizontal,
	MoveLeft,
	Share,
	ShieldAlert,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function UserPage({
	params,
}: {
	params: { username: string }
}) {
	const {
		user,
		posts,
	}: {
		user: User
		posts: Post[]
	} = await getUser(params.username)

	const {
		//@ts-ignore
		user: { id },
	} = await serverSession()

	return (
		<main className='flex flex-col'>
			<div className='flex items-center gap-x-12 m-2'>
				<Link
					className={buttonVariants({ variant: 'ghost' })}
					href={'/home'}
				>
					<MoveLeft />
				</Link>
				<div className='flex flex-col'>
					<span className='text-foreground text-xl font-bold'>
						{user.name}
					</span>
					<span className='text-sm text-muted-foreground'>
						{posts.length} posts
					</span>
				</div>
			</div>
			<div className='w-full relative h-[250px] border'>
				<Image
					src={'/images/default-banner.png'}
					className='w-full h-full'
					fill
					alt='Banner'
				/>
				<div className='absolute bottom-0 left-0 translate-x-1/4 translate-y-1/2 rounded-full bg-accent/20 p-1'>
					<UserAvatar
						name={user.name}
						image={user.avatar_path}
						size='xl'
					/>
				</div>
			</div>
			<div className='flex justify-end items-center gap-x-2 m-2'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='rounded-full'
							size={'icon'}
						>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className='flex items-center p-2 text-lg gap-x-2'>
							<Share />
							Share Profile via...
						</DropdownMenuItem>
						<DropdownMenuItem className='flex items-center p-2 text-lg gap-x-2'>
							<Copy />
							Copy link to profile
						</DropdownMenuItem>
						<DropdownMenuItem className='flex items-center p-2 text-lg gap-x-2'>
							<MessageCircleOff />
							Mute
						</DropdownMenuItem>
						<DropdownMenuItem className='flex items-center p-2 text-lg gap-x-2'>
							<ShieldAlert />
							Block
						</DropdownMenuItem>
						<DropdownMenuItem className='flex items-center p-2 text-lg gap-x-2'>
							<Flag />
							Report
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Link
					href={`/chat/${user.username}`}
					className={cn(
						buttonVariants({
							variant: 'outline',
							size: 'icon',
						}),
						'rounded-full'
					)}
				>
					<MessageCircle />
				</Link>
				<FollowButton authUserId={id} user={user} />
			</div>
		</main>
	)
}
