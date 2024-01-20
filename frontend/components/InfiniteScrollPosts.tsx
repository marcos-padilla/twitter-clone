'use client'

import { PostWithUser } from '@/types'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { useInView } from 'react-intersection-observer'
import { getPosts } from '@/lib/actions'
import { Loader2 } from 'lucide-react'

export default function InfiniteScrollPosts({
	initialPosts,
	lastPage,
}: {
	initialPosts: PostWithUser[]
	lastPage: number
}) {
	const [posts, setPosts] = useState<PostWithUser[]>(initialPosts)
	const [page, setPage] = useState<number>(1)
	const [loading, setLoading] = useState<boolean>(false)

	const { ref, inView, entry } = useInView({
		threshold: 0,
	})

	useEffect(() => {
		if (inView && page < lastPage) {
			setLoading(true)
			getPosts(page + 1)
				.then((res) => {
					setPosts((prev) => [...prev, ...res.data])
					setPage(page + 1)
				})
				.catch((e) => {
					console.log(e)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [inView, page, lastPage])
	return (
		<div>
			{posts.map((post: PostWithUser, index) => {
				if (index === posts.length - 2) {
					return (
						<>
							<div ref={ref} />
							<PostCard key={post.id} post={post} />
						</>
					)
				}
				return <PostCard key={post.id} post={post} />
			})}
			{loading && (
				<div className='my-10 flex justify-center items-center'>
					<Loader2
						size={30}
						className='text-primary transition-all animate-spin'
					/>
				</div>
			)}
		</div>
	)
}
