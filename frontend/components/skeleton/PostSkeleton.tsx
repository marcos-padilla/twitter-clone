import { Skeleton } from '../ui/skeleton'

export default function PostSkeleton() {
	return (
		<div className='border-b cursor-pointer hover:bg-accent/20 transition-all duration-500 p-5'>
			<div className='flex gap-x-5'>
				<Skeleton className='w-12 h-12 rounded-full' />
				<div className='flex flex-col flex-1'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-x-2 text-xs'>
								<span className='font-bold hover:underline flex'>
									<Skeleton className='w-16 h-5' />
								</span>
								<span className='text-muted-foreground'>
									<Skeleton className='w-16 h-5' />
								</span>
							</div>
						</div>
					</div>
					<Skeleton className='w-full h-52 mt-5' />
				</div>
			</div>
		</div>
	)
}
