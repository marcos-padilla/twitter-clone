import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function AuthPage() {
	return (
		<main className='flex flex-col justify-center items-center h-screen'>
			<Card className='w-[400px]'>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
				</CardHeader>
				<CardContent className='space-y-5'>
					<Input placeholder='Email, username or phone' />
					<Input placeholder='Password' type='password' />
					<div className='flex justify-end'>
						<Button>Sign In</Button>
					</div>
					<div className='flex items-center'>
						<Separator className='flex-1' />
						<span className='mx-2'>or</span>
						<Separator className='flex-1' />
					</div>
					<Button className='w-full rounded-full'>
						Create an account
					</Button>
					<p className='text-xs text-muted-foreground'>
						By signin up, you agree to the{' '}
						<Link
							href='/terms'
							className='text-primary hover:underline'
						>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link
							href='/privacy'
							className='text-primary hover:underline'
						>
							Privacy Policy
						</Link>
						, including{' '}
						<Link
							href='/cookie'
							className='text-primary hover:underline'
						>
							Cookie Use
						</Link>
						.
					</p>
				</CardContent>
			</Card>
		</main>
	)
}
