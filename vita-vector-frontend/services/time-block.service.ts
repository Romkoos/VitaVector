import { axiosWithAuth } from '@/api/interceptors'
import {
	ITimeBlockResponse,
	TypeTimeBlockFormState
} from '@/types/time-block.types'

class TimeBlockService {
	private readonly BASE_URL = '/user/time-blocks'

	async getTimeBlocks() {
		return await axiosWithAuth.get<ITimeBlockResponse[]>(this.BASE_URL)
	}

	async createTimeBlock(data: TypeTimeBlockFormState) {
		return await axiosWithAuth.post<ITimeBlockResponse>(this.BASE_URL, data)
	}

	async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
		return await axiosWithAuth.put<ITimeBlockResponse>(
			`${this.BASE_URL}/${id}`,
			data
		)
	}

	async updateOrderTimeBlock(ids: string[]) {
		return await axiosWithAuth.put<ITimeBlockResponse>(
			`${this.BASE_URL}/update-order`,
			{ ids }
		)
	}

	async deleteTimeBlock(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const timeBlockService = new TimeBlockService()
