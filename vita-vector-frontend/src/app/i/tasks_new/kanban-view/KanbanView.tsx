'use client'
import { KanbanColumn } from './KanbanColumn'
import styles from './KanbanView.module.scss'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useBoard } from '@/app/i/tasks_new/hooks/useBoard'
import Loader from '@/components/ui/Loader'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Field } from '@/components/ui/fields/Field'
import { Button } from '@/components/ui/buttons/Button'
import { useCreateColumn } from '@/app/i/tasks_new/kanban-view/hooks/useCreateColumn'
import { IColumnResponse } from '@/types/columns.types'
import { useUpdateColumnsOrder } from '@/app/i/tasks_new/kanban-view/hooks/useUpdateColumnsOrder'

export function KanbanView() {
	const { boardData, setBoardData } = useBoard()
	const { isPendingColumn, mutateColumn } = useCreateColumn()
	const { isPendingColumnOrder, mutateColumnOrder } = useUpdateColumnsOrder()

	const onDragEnd = (result: any) => {
		const { destination, source, draggableId, type } = result

		if (!destination) return

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(boardData.columnOrder)
			newColumnOrder.splice(source.index, 1)
			newColumnOrder.splice(destination.index, 0, draggableId)

			const newState = {
				...boardData,
				columnOrder: newColumnOrder
			}
			mutateColumnOrder(newState.columnOrder)
			setBoardData(newState)
			return
		}

		const start = boardData.columns[source.droppableId]
		const finish = boardData.columns[destination.droppableId]

		if (start === finish) {
			const newTaskIds = Array.from(start.tasks)
			newTaskIds.splice(source.index, 1)
			newTaskIds.splice(destination.index, 0, draggableId)

			const newColumn = {
				...start,
				tasks: newTaskIds
			}

			const newState = {
				...boardData,
				columns: {
					...boardData.columns,
					[newColumn.id]: newColumn
				}
			}

			setBoardData(newState)
			return
		}

		const startTaskIds = Array.from(start.tasks)
		startTaskIds.splice(source.index, 1)
		const newStart = {
			...start,
			tasks: startTaskIds
		}

		const finishTaskIds = Array.from(finish.tasks)
		finishTaskIds.splice(destination.index, 0, draggableId)
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		}

		const newState = {
			...boardData,
			columns: {
				...boardData.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		}

		setBoardData(newState)
		return
	}

	const { register, handleSubmit } = useForm<IColumnResponse>({
		mode: 'onChange'
	})
	const addColumnHandler: SubmitHandler<IColumnResponse> = data => {
		const { ...rest } = data
		mutateColumn({
			...rest
		})
	}

	if (!boardData) return <Loader />

	return (
		<>
			<form className={'flex'} onSubmit={handleSubmit(addColumnHandler)}>
				<Field
					id='column-name'
					placeholder='New column name'
					type='text'
					{...register('title', {
						required: 'Column name is required'
					})}
					extra='mr-3 max-w-md mt-0'
				/>
				<Button type='submit' disabled={isPendingColumn}>
					Add
				</Button>
			</form>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId={'all-columns'}
					direction={'horizontal'}
					type={'column'}
				>
					{provided => {
						return (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className={styles.board}
							>
								{boardData.columnOrder.map(
									(columnId: string, index: number) => {
										const column = boardData.columns[columnId]
										const tasks =
											column.tasks?.map((taskId: string) => {
												console.log('taskId', taskId)
												return boardData.tasks[taskId]
											}) || []

										return (
											<KanbanColumn
												index={index}
												key={column.id}
												column={column}
												tasks={tasks}
											/>
										)
									}
								)}
								{provided.placeholder}
							</div>
						)
					}}
				</Droppable>
			</DragDropContext>
		</>
	)
}
