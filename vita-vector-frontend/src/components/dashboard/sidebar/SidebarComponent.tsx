'use client'

import { GanttChartSquare } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from '@/constants/color.constants'

import { LogoutButtonComponent } from './LogoutButtonComponent'
import { MenuItemComponent } from './MenuItemComponent'
import { MENU } from './menu.data'

export function SidebarComponent() {
	return (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div>
				<Link
					href='/'
					className='flex items-center gap-2.5 p-layout border-b border-b-border'
				>
					<GanttChartSquare color={COLORS.primary} size={38} />
					<span className='text-2xl font-bold relative'>
						VitaVector
						<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
							beta
						</span>
					</span>
				</Link>
				<div className='p-3 relative'>
					<LogoutButtonComponent />
					{MENU.map(item => (
						<MenuItemComponent item={item} key={item.link} />
					))}
				</div>
			</div>
			<footer className='text-xs opacity-40 font-normal text-center p-layout'>
				2024 &copy; With love from VitaVector. <br /> All rights reserved.
			</footer>
		</aside>
	)
}