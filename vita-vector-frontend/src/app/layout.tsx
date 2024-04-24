import './globals.scss'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'
import { SITE_NAME } from '@/constants/seo.constants'
import { Providers } from '@/app/providers'
import { Toaster } from 'sonner'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: 'normal'
})
export const metadata: Metadata = {
	title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
	description: 'Best time management system for everyone'
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={zen.className}>
				<Providers>
					{children}
					<Toaster theme='dark' position='bottom-right' duration={1500} />
				</Providers>
			</body>
		</html>
	)
}
