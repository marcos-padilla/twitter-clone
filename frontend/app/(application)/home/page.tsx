'use client'
import PostCard from '@/components/PostCard'
import UserPost from '@/components/UserPost'
import { useSession } from 'next-auth/react'

export default function Home() {
	const session = useSession()
	console.log({ session })

	return (
		<div className='flex flex-col items-stretch'>
			<UserPost />
			<PostCard />
			<PostCard />
			<PostCard />
		</div>
	)
}
