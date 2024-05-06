'use client'
import type { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'
import { KanbanCard } from '@/app/i/tasks_new/kanban-view/KanbanCard'
import styles from '@/app/i/tasks_new/kanban-view/KanbanView.module.scss'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import cn from 'clsx'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanColumn(props: any) {
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided, snapshot) => {
				return (
					<div {...provided.draggableProps} ref={provided.innerRef}>
						<div className={styles.column}>
							<div
								className={styles.columnHeading}
								{...provided.dragHandleProps}
							>
								{props.column.title}
							</div>
							<Droppable
								droppableId={props.column.id}
								isDropDisabled={false}
								type={'task'}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className={cn(styles.cardsArea, {
											[styles.isDraggingOver]: snapshot.isDraggingOver
										})}
									>
										{props.tasks.map((task: any, index: number) => (
											<KanbanCard
												key={`${index}_${task}`}
												task={task}
												index={index}
											/>
										))}
										{provided.placeholder}
										{/*<KanbanAddCardInput*/}
										{/*	setItems={setItems}*/}
										{/*	filterDate={*/}
										{/*		FILTERS[value] ? FILTERS[value].format() : undefined*/}
										{/*	}*/}
										{/*/>*/}
									</div>
								)}
							</Droppable>
						</div>
					</div>
				)
			}}
		</Draggable>
	)
}
