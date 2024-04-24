import { IBase } from '@/types/root.types'

export enum EnumTaskPriority {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	BLOCKER = 'blocker'
}

export interface ITaskResponse extends IBase {
	name: string
	isCompleted: boolean
	priority?: EnumTaskPriority
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
