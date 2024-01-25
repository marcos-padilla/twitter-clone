import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { route } from '@/lib/utils'
import { axiosInstance } from '@/lib/axiosInstance'

const authenticate = async (email: string, password: string) => {
	try {
		const response = await axiosInstance.post(
			route({ name: 'signin' }).url,
			{ email, password },
			{
				headers: {
					Accept: 'application/json',
				},
			}
		)
		return response
	} catch (e) {
		console.dir(e)
	}
}

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (typeof credentials === 'undefined') return null
				const res = await authenticate(
					credentials.email,
					credentials.password
				)
				if (typeof res === 'undefined') return null

				return {
					...res.data.user,
					apiToken: res.data.token,
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async session({ session, token }) {
			const sanitizedToken = Object.keys(token).reduce((p, c) => {
				// strip unnecessary properties
				if (
					c !== 'iat' &&
					c !== 'exp' &&
					c !== 'jti' &&
					c !== 'apiToken'
				) {
					return { ...p, [c]: token[c] }
				} else {
					return p
				}
			}, {})
			return {
				...session,
				user: sanitizedToken,
				apiToken: token.apiToken,
			}
		},
		//@ts-expect-error
		async jwt({ token, user }) {
			if (typeof user !== 'undefined') {
				return user
			}
			return token
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
