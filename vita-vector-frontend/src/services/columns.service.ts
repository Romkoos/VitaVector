import { axiosWithAuth } from '@/api/interceptors'
import {
	IColumnOrderResponse,
	IColumnResponse,
	IColumnsAndOrder,
	INewColumnOrderResponse,
	TypeColumnFormState,
	TypeColumnOrderFormState
} from '@/types/columns.types'

class ColumnsService {
	private readonly BASE_URL = '/user/tasks/columns'
	private readonly ORDER = '/order'

	async createColumnsOrder(order: INewColumnOrderResponse) {
		return await axiosWithAuth.post<INewColumnOrderResponse>(
			`${this.BASE_URL}${this.ORDER}`,
			order
		)
	}

	async getColumnsOrder() {
		return await axiosWithAuth.get<IColumnOrderResponse>(
			`${this.BASE_URL}${this.ORDER}`
		)
	}

	async updateColumnsOrder(order: IColumnOrderResponse) {
		return await axiosWithAuth.put<TypeColumnOrderFormState>(
			`${this.BASE_URL}${this.ORDER}`,
			order
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
