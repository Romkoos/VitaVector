import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { taskService } from '@/services/task.service'
import { ITaskResponse } from '@/types/task.types'

export function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	})

	const [items, setItems] = useState<any | undefined>(data?.data)

	useEffect(() => {
		if (data?.data) {
			const normalized = data.data.reduce<any>((acc, item: ITaskResponse) => {
				acc[item.id] = item
				return acc
			}, {})

			setItems(normalized)
			return
		}
	}, [data?.data])

	return { items, setItems }
}
