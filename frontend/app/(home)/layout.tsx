export default function HomeLayout({
	children,
	info,
}: {
	children: React.ReactNode
	info: React.ReactNode
}) {
	return (
		<div>
			{children}
			{info}
		</div>
	)
}
