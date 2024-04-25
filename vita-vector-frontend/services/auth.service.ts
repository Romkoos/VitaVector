import { IAuthForm, IAuthResponse } from '@/types/auth.types'
import { axiosDefault } from '@/api/interceptors'
import { removeAccessToken, saveAccessToken } from './auth-token.service'

export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

class AuthService {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosDefault.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) saveAccessToken(response.data.accessToken)

		return response
	}

	async getNewToken() {
		const response = await axiosDefault.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveAccessToken(response.data.accessToken)

		return response
	}

	async logout() {
		const response = await axiosDefault.post<boolean>('/auth/logout')

		if (response.data) removeAccessToken()

		return response
	}
}

export const authService = new AuthService()
