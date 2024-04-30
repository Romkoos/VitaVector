import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'
import { TasksView } from '@/app/i/tasks_new/TasksView'

export const metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div>
			<Heading title={metadata.title} />
			<TasksView />
		</div>
	)
}
