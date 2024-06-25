import React, { Suspense, lazy, useEffect } from 'react'
import { TBread } from '../../lib/types'
import Loading from '../../components/Loading'
import {
	DndContext,
	DragEndEvent,
	TouchSensor,
	closestCenter,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
const Bread = lazy(() => import('./Bread'))

type BreadListProps = {
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	LSBreads: string
}

function SortableItem({
	bread,
	breads,
	setBreads,
	LSBreads,
}: {
	bread: TBread
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	LSBreads: string
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: bread.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Suspense fallback={<Loading paddingY='5' />}>
				<Bread
					bread={bread}
					breads={breads}
					setBreads={setBreads}
					LSBreads={LSBreads}
				/>
			</Suspense>
		</div>
	)
}

export default function BreadList({
	breads,
	setBreads,
	LSBreads,
}: BreadListProps) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (active.id !== over?.id) {
			setBreads(items => {
				if (!items) return null
				const oldIndex = items.findIndex(item => item.id === active.id)
				const newIndex = items.findIndex(item => item.id === over?.id)
				return arrayMove(items, oldIndex, newIndex)
			})
		}
	}

	useEffect(() => {
		const handleTouchMove = (event: TouchEvent) => event.preventDefault()

		document.addEventListener('touchmove', handleTouchMove, { passive: false })

		return () => document.removeEventListener('touchmove', handleTouchMove)
	}, [])

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={breads.map(bread => bread.id)}>
				<div className='mb-4 gap-2 flex flex-col'>
					{breads.map(bread => (
						<SortableItem
							key={bread.id}
							bread={bread}
							breads={breads}
							setBreads={setBreads}
							LSBreads={LSBreads}
						/>
					))}
				</div>
			</SortableContext>
		</DndContext>
	)
}
