'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode
}) {
	const { status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth')
		}
	}, [status, router])
	if (status === 'loading' || status === 'unauthenticated')
		return <div>Loading...</div>
	return children
}