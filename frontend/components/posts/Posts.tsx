import { getPosts } from '@/lib/actions'
import InfiniteScrollPosts from './InfiniteScrollPosts'

export default async function Posts() {
	const posts = await getPosts()

	return (
		<InfiniteScrollPosts
			initialPosts={posts.data}
			lastPage={posts.last_page}
		/>
	)
}
