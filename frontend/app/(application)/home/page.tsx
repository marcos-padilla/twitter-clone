import PostCard from '@/components/PostCard'
import UserPost from '@/components/UserPost'

export default function Home() {
	return (
		<div className='flex flex-col items-stretch'>
			<UserPost />
			<PostCard />
			<PostCard />
			<PostCard />
		</div>
	)
}
