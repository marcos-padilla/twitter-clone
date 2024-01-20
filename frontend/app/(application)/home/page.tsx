import Posts from '@/components/posts/Posts'
import PostsSkeleton from '@/components/skeleton/PostsSkeleton'
import UserPost from '@/components/UserPost'
import { Suspense } from 'react'

export default async function Home() {
	return (
		<div className='flex flex-col items-stretch'>
			<UserPost />
			<Suspense fallback={<PostsSkeleton />}>
				<Posts />
			</Suspense>
		</div>
	)
}
