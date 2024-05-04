import { useMutation, useQueryClient } from '@tanstack/react-query'
import { columnsService } from '@/services/columns.service'
import { toast } from 'sonner'
import {
	IColumnOrderResponse,
	IColumnResponse,
	INewColumnOrderResponse
} from '@/types/columns.types'

export function useCreateColumn() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create column'],
		mutationFn: (data: IColumnResponse) => columnsService.createColumn(data),
		onSuccess: async response => {
			const newColumnId = response.data.id

			const columnsOrderResponse = await columnsService.getColumnsOrder()
			const columnsOrder = columnsOrderResponse.data

			if (!columnsOrder || columnsOrder.columns.length === 0) {
				const newOrder: INewColumnOrderResponse = {
					columns: [newColumnId]
				}
				await columnsService
					.createColumnsOrder(newOrder)
					.then(() =>
						toast.success(`Column ${response.data.title} successfully created!`)
					)
			} else {
				const updatedOrder: IColumnOrderResponse = {
					...columnsOrder,
					columns: [...columnsOrder.columns, newColumnId]
				}
				await columnsService
					.updateColumnsOrder(updatedOrder)
					.then(() =>
						toast.success(`Column ${response.data.title} successfully created!`)
					)
			}

			queryClient.invalidateQueries({ queryKey: ['columns'] })
			queryClient.invalidateQueries({ queryKey: ['columnsOrder'] })
		}
	})

	return { mutate, isPending }
}
