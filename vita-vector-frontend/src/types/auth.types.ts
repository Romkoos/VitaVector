export interface IAuthForm {
	email: string
	password: string
}

export interface IUser {
	id: number
	email: string
	name?: string

	workInterval?: number
	breakInterval?: number
	intervalCount?: number
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}

export type TypeUserForm = Partial<Omit<IUser, 'id'> & { password?: string }>
