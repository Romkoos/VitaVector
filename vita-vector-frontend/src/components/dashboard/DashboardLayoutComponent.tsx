'use client'
import type { PropsWithChildren } from 'react'

import { HeaderComponent } from './header/HeaderComponent'
import { SidebarComponent } from './sidebar/SidebarComponent'

export default function DashboardLayoutComponent({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]'>
			<SidebarComponent />

			<main className='p-big-layout overflow-x-hidden max-h-screen relative'>
				<HeaderComponent />
				{children}
			</main>
		</div>
	)
}
