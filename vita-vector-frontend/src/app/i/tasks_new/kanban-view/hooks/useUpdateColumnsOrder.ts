import { useMutation, useQueryClient } from '@tanstack/react-query'
import { columnsService } from '@/services/columns.service'
import { toast } from 'sonner'
import { INewColumnOrderResponse } from '@/types/columns.types'

export function useUpdateColumnsOrder() {
	const queryClient = useQueryClient()
	const { mutate: mutateColumnOrder, isPending: isPendingColumnOrder } =
		useMutation({
			mutationKey: ['update columns order'],
			mutationFn: (data: string[]) => {
				const columns: INewColumnOrderResponse = {
					columns: data.map(id => ({ id: id }))
				}
				return columnsService.updateColumnsOrder(columns)
			},

			onSuccess() {
				toast.success(`Column order successfully updated!`)
				queryClient.invalidateQueries({ queryKey: ['columnsAndOrder'] })
			}
		})

	return { mutateColumnOrder, isPendingColumnOrder }
}
