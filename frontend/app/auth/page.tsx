'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const signUpFormSchema = z.object({
	name: z.string().min(1, { message: 'Full name is required' }),
	username: z
		.string()
		.min(1, { message: 'Username is required' })
		.max(20, { message: 'Username must be less than 20 characters' })
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: 'Username must only contain letters, numbers and underscores',
		})
		.toLowerCase(),
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
	password_confirmation: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
})

export default function AuthPage() {
	const { toast } = useToast()
	const [openSignUp, setOpenSignUp] = useState(false)
	const registerForm = useForm({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
	})

	const onSubmit = (data: z.infer<typeof signUpFormSchema>) => {
		axios.post('http://127.0.0.1:8000/api/sign-up', data)
			.then(() => {
				toast({
					title: 'Sign Up Success!!!',
					description:
						'Enjoy your new account. Please check your email to verify your account.',
				})
				signIn('credentials', {
					email: data.email,
					password: data.password,
					callbackUrl: '/home',
				})
			})
			.catch((e) => {
				if (e.response.status === 422) {
					Object.entries(e.response.data.errors).forEach(
						([key, value]) => {
							registerForm.setError(
								key as keyof typeof data,
								{
									message: (value as string[])[0],
								}
							)
						}
					)
				}
			})
	}
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
					<Dialog open={openSignUp} onOpenChange={setOpenSignUp}>
						<DialogTrigger asChild>
							<Button className='w-full rounded-full'>
								Create an account
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Create your account
								</DialogTitle>
							</DialogHeader>
							<Form {...registerForm}>
								<form
									onSubmit={registerForm.handleSubmit(
										onSubmit
									)}
									className='space-y-2'
								>
									<FormField
										control={registerForm.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Full Name
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='First and last name'
													/>
												</FormControl>
												<FormDescription>
													Everybody will
													see your name
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={registerForm.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Username
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='Username'
													/>
												</FormControl>
												<FormDescription>
													Thi will be
													your public
													username. You
													can&apos;t
													change it later
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={registerForm.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Email
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='youremail@example.com'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={registerForm.control}
										name='password'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Password
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='Password'
														type='password'
													/>
												</FormControl>
												<FormDescription>
													Make sure
													it&apos;s at
													least 8
													characters
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={registerForm.control}
										name='password_confirmation'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Confirm
													Password
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='Repeat your password'
														type='password'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className='flex justify-end py-4'>
										<Button type='submit'>
											Create Account
										</Button>
									</div>
								</form>
							</Form>
						</DialogContent>
					</Dialog>
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
