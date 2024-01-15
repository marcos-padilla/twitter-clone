'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function InitPage() {
	const isUserLoggedIn = true
	const router = useRouter()

	useEffect(() => {
		if (isUserLoggedIn) {
			router.push('/home')
		}
	}, [isUserLoggedIn, router])
	if (!isUserLoggedIn) return <div>Auth Page</div>
}
