import { isAuthenticated } from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function ProtectedRoute({
	children,
}: {
	children: React.ReactNode
}) {
	const isUserAuthenticated = await isAuthenticated()

	if (!isUserAuthenticated) {
		return redirect('/auth')
	}
	return <>{children}</>
}
