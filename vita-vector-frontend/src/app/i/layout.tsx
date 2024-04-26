import { PropsWithChildren } from 'react'
import DashboardLayoutComponent from '@/components/dashboard/DashboardLayoutComponent'

export default function Layout({ children }: PropsWithChildren) {
	return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
}
