import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import SignInForm from '@/components/auth/SignInForm'
import SignUpDialog from '@/components/auth/SignUpDialog'
import { isAuthenticated, serverSession } from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function AuthPage({
	searchParams,
}: {
	searchParams: {
		error?: 'CredentialsSignin'
		callbackUrl?: string
	}
}) {
	const res = await isAuthenticated()
	if (res) {
		return redirect('/app/home')
	}

	return (
		<main className='flex flex-col justify-center items-center h-screen'>
			<Card className='w-[400px]'>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<SignInForm
						error={
							searchParams.error === 'CredentialsSignin'
								? 'Invalid Credentials'
								: ''
						}
						callbackUrl={searchParams.callbackUrl}
					/>
					<div className='flex items-center'>
						<Separator className='flex-1' />
						<span className='mx-2'>or</span>
						<Separator className='flex-1' />
					</div>
					<SignUpDialog />
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
