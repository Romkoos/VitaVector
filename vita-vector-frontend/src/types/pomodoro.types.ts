import { IBase } from '@/types/root.types'

export interface IPomodoroSessionResponse extends IBase {
	isCompleted?: boolean
	rounds: IPomodoroRoundResponse[]
}

export interface IPomodoroRoundResponse extends IBase {
	isCompleted?: boolean
	totalSeconds: number
}

export type IPomodoroSessionState = Partial<
	Omit<IPomodoroSessionResponse, 'id' | 'createdAt' | 'updatedAt'>
>
export type IPomodoroRoundState = Partial<
	Omit<IPomodoroRoundResponse, 'id' | 'createdAt' | 'updatedAt'>
>
