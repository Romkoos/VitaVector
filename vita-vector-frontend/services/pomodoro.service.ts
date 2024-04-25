import { axiosWithAuth } from '@/api/interceptors'
import {
	IPomodoroSessionResponse,
	TypePomodoroRoundState,
	TypePomodoroSessionState
} from '@/types/pomodoro.types'

class PomodoroService {
	private readonly BASE_URL = '/user/timer'

	async getTodaySessions() {
		return await axiosWithAuth.get<IPomodoroSessionResponse>(
			`${this.BASE_URL}/today`
		)
	}

	async createSession() {
		return await axiosWithAuth.post<IPomodoroSessionResponse>(this.BASE_URL)
	}

	async updateSession(id: string, data: TypePomodoroSessionState) {
		return await axiosWithAuth.put<IPomodoroSessionResponse>(
			`${this.BASE_URL}/${id}`,
			data
		)
	}

	async deleteSession(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}

	async updateRound(id: string, data: TypePomodoroRoundState) {
		return await axiosWithAuth.put<IPomodoroSessionResponse>(
			`${this.BASE_URL}/round/${id}`,
			data
		)
	}
}

export const pomodoroService = new PomodoroService()
