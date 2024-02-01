import Link from 'next/link'

export default function ServerDownPage() {
	return (
		<main className='flex items-center justify-center h-screen flex-col gap-y-2'>
			<h1 className='text-6xl font-bold my-2'>Server is down.</h1>
			<p className='text-muted-foreground'>
				We are trying to fix it as fast as we can
			</p>
			<p className='text-muted-foreground'>
				<Link
					href='/home'
					className='text-primary font-medium hover:underline'
				>
					Try again
				</Link>{' '}
				later
			</p>
		</main>
	)
}
