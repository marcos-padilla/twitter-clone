import { getPosts } from '@/actions/getPosts'
import PostCard from '@/components/PostCard'
import UserPost from '@/components/UserPost'
import { PostWithUser } from '@/types'

export default async function Home() {
	const posts = await getPosts()

	return (
		<div className='flex flex-col items-stretch'>
			<UserPost />
			{posts.data.map((post: PostWithUser) => {
				return <PostCard key={post.id} post={post} />
			})}
		</div>
	)
}
