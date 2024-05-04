import { useMutation, useQueryClient } from '@tanstack/react-query'
import { columnsService } from '@/services/columns.service'
import { toast } from 'sonner'
import { IColumnOrderResponse } from '@/types/columns.types'

export function useUpdateColumnsOrder() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update columns order'],
		mutationFn: (data: IColumnOrderResponse) => {
			return columnsService.updateColumnsOrder(data)
		},

		onSuccess() {
			toast.success(`Column order successfully updated!`)
			queryClient.invalidateQueries({ queryKey: ['columnsAndOrder'] })
		}
	})

	return { mutate, isPending }
}
