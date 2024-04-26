import { axiosWithAuth } from '@/api/interceptors'
import { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

class TaskService {
	private readonly BASE_URL = '/user/tasks'

	async getTasks() {
		return await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
	}

	async createTask(task: TypeTaskFormState) {
		return await axiosWithAuth.post<ITaskResponse>(this.BASE_URL, task)
	}

	async updateTask(id: string, task: TypeTaskFormState) {
		return await axiosWithAuth.put<ITaskResponse>(
			`${this.BASE_URL}/${id}`,
			task
		)
	}

	async deleteTask(id: string) {
		return await axiosWithAuth.delete<ITaskResponse>(`${this.BASE_URL}/${id}`)
	}
}

export const taskService = new TaskService()
