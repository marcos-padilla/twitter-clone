'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useToast } from '../ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'

const signInFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' }),
})

export default function SignInForm() {
	const { toast } = useToast()

	const signInForm = useForm({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSignIn = (data: z.infer<typeof signInFormSchema>) => {
		try {
			signIn('credentials', {
				email: data.email,
				password: data.password,
				callbackUrl: '/home',
			})
		} catch (e) {
			console.log({ e })
		}
	}
	return (
		<Form {...signInForm}>
			<form
				onSubmit={signInForm.handleSubmit(onSignIn)}
				className='space-y-5'
			>
				<FormField
					control={signInForm.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
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
					control={signInForm.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Password'
									type='password'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-end'>
					<Button type='submit'>Sign In</Button>
				</div>
			</form>
		</Form>
	)
}
