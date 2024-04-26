import Cookies from 'js-cookie'
import { EnumTokens } from './auth.service'

export const getAccessToken = (): string => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || ''
}

export const saveAccessToken = (accessToken: string): void => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost', //process.env.APP_COOKIE_DOMAIN,
		sameSite: 'strict',
		expires: 1
	})
}

export const removeAccessToken = (): void => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
