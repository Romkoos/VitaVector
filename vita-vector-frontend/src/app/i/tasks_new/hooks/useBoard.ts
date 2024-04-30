import { useEffect, useState } from 'react'
import { useTasks } from '@/app/i/tasks_new/hooks/useTasks'
import { useColumnsAndOrder } from '@/app/i/tasks_new/hooks/useColumnsAndOrder'

export function useBoard() {
	const { items } = useTasks()
	const { columnsAndOrder } = useColumnsAndOrder()
	const [boardData, setBoardData] = useState<any>(undefined)
	useEffect(() => {
		if (!columnsAndOrder || !items) return

		setBoardData({
			tasks: items,
			columns: columnsAndOrder?.columns,
			columnOrder: columnsAndOrder?.columnOrder
		})
	}, [items, columnsAndOrder])

	return { boardData, setBoardData }
}
