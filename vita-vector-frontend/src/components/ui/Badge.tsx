import type { CSSProperties, PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface IBadge {
	className?: string
	variant?: string
	style?: CSSProperties
}

const badge = tv({
	base: 'rounded-lg w-max py-1 px-2 text-xs font-semibold text-sm text-white transition border-white border-2 border-opacity-20',
	variants: {
		backgroundColor: {
			gray: 'bg-gray-500/20',
			blocker: 'bg-black-400/60',
			high: 'bg-red-400/60',
			medium: 'bg-orange-400/70',
			low: 'bg-blue-400/70'
		}
	},
	defaultVariants: {
		backgroundColor: 'gray'
	}
})

export function Badge({
	children,
	className,
	variant,
	style
}: PropsWithChildren<IBadge>) {
	return (
		<span
			className={badge({
				backgroundColor: variant as 'low' | 'high' | 'medium' | 'blocker',
				className
			})}
			style={style}
		>
			{children}
		</span>
	)
}
