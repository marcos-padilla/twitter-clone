'use client'

import { ArrowUpFromLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function ScrollToTopButton() {
	const [showButton, setShowButton] = useState(false)
	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 200) {
				setShowButton(true)
			} else {
				setShowButton(false)
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])
	return (
		<AnimatePresence>
			{showButton && (
				<motion.button
					className='fixed bottom-4 right-4 bg-primary p-2 rounded-full shadow-md shdaow-black/20 dark:shadow-white/20 hover:scale-105 hover:-translate-y-4 transition-all duration-400'
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 100 }}
				>
					<ArrowUpFromLine
						size={30}
						onClick={() => {
							window.scrollTo({
								top: 0,
								behavior: 'smooth',
							})
						}}
					/>
				</motion.button>
			)}
		</AnimatePresence>
	)
}
