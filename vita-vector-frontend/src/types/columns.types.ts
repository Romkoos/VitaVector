import { IBase } from '@/types/root.types'

export interface IColumnResponse extends IBase {
	title: string
}

export interface IColumnOrderResponse extends IBase {
	columns: string[]
}

interface IColumnDetails {
	id: string
	title: string
	tasks: string[]
}

interface IColumnsMap {
	[key: string]: IColumnDetails
}

export interface IColumnsAndOrder {
	columns: IColumnsMap
	columnOrder: string[]
}

export type TypeColumnFormState = Partial<
	Omit<IColumnResponse, 'id' | 'updatedAt'>
>
export type TypeColumnOrderFormState = Partial<
	Omit<IColumnResponse, 'id' | 'updatedAt'>
>
