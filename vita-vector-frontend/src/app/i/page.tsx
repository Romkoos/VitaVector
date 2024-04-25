import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'
import { StatisticsComponent } from '@/app/i/StatisticsComponent'

export const metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<Heading title={'Statistics'} />
			<StatisticsComponent />
		</div>
	)
}
