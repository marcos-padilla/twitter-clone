import PostSkeleton from './PostSkeleton'

export default function PostsSkeleton() {
	return (
		<div className='flex flex-col items-stretch'>
			{Array.from({ length: 10 }).map((_, i) => (
				<PostSkeleton key={i} />
			))}
		</div>
	)
}
