'use client'

import cn from 'clsx'
import styles from '@/app/i/tasks_new/kanban-view/KanbanView.module.scss'
import { Draggable } from '@hello-pangea/dnd'

export function KanbanCard(props: any) {
	if (!props.task) return null
	return (
		<Draggable
			draggableId={props.task.id}
			index={props.index}
			isDragDisabled={false}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={cn(
						styles.card,
						{
							[styles.completed]: false,
							[styles.isDragging]: snapshot.isDragging
						},
						'animation-opacity'
					)}
				>
					<div className={styles.cardHeader}>{props.task.title}</div>
					<div>more</div>
				</div>
			)}
		</Draggable>
	)
}
