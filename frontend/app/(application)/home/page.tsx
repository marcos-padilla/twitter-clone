import InfiniteScrollPosts from '@/components/InfiniteScrollPosts'
import UserPost from '@/components/UserPost'
import { getPosts } from '@/lib/actions'

export default async function Home() {
	const posts = await getPosts()

	return (
		<div className='flex flex-col items-stretch'>
			<UserPost />
			<InfiniteScrollPosts
				initialPosts={posts.data}
				lastPage={posts.last_page}
			/>
		</div>
	)
}
