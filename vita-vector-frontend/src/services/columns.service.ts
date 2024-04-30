import { axiosWithAuth } from '@/api/interceptors'
import { ITaskResponse } from '@/types/task.types'
import {
	IColumnOrderResponse,
	IColumnResponse,
	IColumnsAndOrder,
	TypeColumnFormState,
	TypeColumnOrderFormState
} from '@/types/columns.types'

class ColumnsService {
	private readonly BASE_URL = '/user/tasks/columns'
	private readonly ORDER = '/order'

	async createColumnsOrder(order: TypeColumnOrderFormState) {
		return await axiosWithAuth.post<IColumnOrderResponse>(
			`${this.BASE_URL}${this.ORDER}`
		)
	}

	async getColumnsOrder() {
		return await axiosWithAuth.get<ITaskResponse>(
			`${this.BASE_URL}${this.ORDER}`
		)
	}

	async updateColumnsOrder(order: TypeColumnOrderFormState) {
		return await axiosWithAuth.put<IColumnOrderResponse>(
			`${this.BASE_URL}${this.ORDER}`
		)
	}

	async createColumn(column: TypeColumnFormState) {
		return await axiosWithAuth.post<IColumnResponse>(this.BASE_URL, column)
	}

	async getColumnsAndOrder() {
		return await axiosWithAuth.get<IColumnsAndOrder>(this.BASE_URL)
	}

	async updateColumn(id: string, column: TypeColumnFormState) {
		return await axiosWithAuth.put<IColumnResponse>(
			`${this.BASE_URL}/${id}`,
			column
		)
	}

	async deleteColumn(id: string) {
		return await axiosWithAuth.delete<IColumnResponse>(`${this.BASE_URL}/${id}`)
	}
}

export const columnsService = new ColumnsService()
