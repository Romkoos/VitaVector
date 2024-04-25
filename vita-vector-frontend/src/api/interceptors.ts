import axios, { CreateAxiosDefaults } from 'axios'
import {
	getAccessToken,
	removeAccessToken
} from '../../services/auth-token.service'
import { errorCatch } from './error-handeling'
import { authService } from '../../services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4200/api', //TODO: Change this to the actual API URL from .env
	headers: {
		'Content-Type': 'application/json'
		// 'Access-Control-Allow-Origin': '*'
	},
	withCredentials: true
}

const axiosDefault = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()
	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const request = error.config
		if (
			(error.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			request._retry = true
			try {
				await authService.getNewToken()
				return axiosWithAuth.request(request)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeAccessToken()
			}
		}

		throw error
	}
)

export { axiosWithAuth, axiosDefault }
