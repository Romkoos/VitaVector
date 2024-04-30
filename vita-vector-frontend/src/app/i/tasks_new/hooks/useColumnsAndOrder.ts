import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { columnsService } from '@/services/columns.service'
import { IColumnsAndOrder } from '@/types/columns.types'

export function useColumnsAndOrder() {
	const { data } = useQuery({
		queryKey: ['columns'],
		queryFn: () => columnsService.getColumnsAndOrder()
	})

	const [columnsAndOrder, setColumnsAndOrder] = useState<
		IColumnsAndOrder | undefined
	>(data?.data)

	useEffect(() => {
		setColumnsAndOrder(data?.data)
	}, [data?.data])

	return { columnsAndOrder, setColumnsAndOrder }
}
