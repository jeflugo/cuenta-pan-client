import React, { Suspense, lazy, useEffect, useState } from 'react'
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
import { LuChevronsUpDown } from 'react-icons/lu'
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
		<Suspense fallback={<Loading paddingY='5' />}>
			<div className='flex items-center' style={style}>
				<div ref={setNodeRef} {...attributes} {...listeners}>
					<LuChevronsUpDown />
				</div>
				<Bread
					bread={bread}
					breads={breads}
					setBreads={setBreads}
					LSBreads={LSBreads}
				/>
			</div>
		</Suspense>
	)
}

export default function BreadList({
	breads,
	setBreads,
	LSBreads,
}: BreadListProps) {
	const [isDragging, setIsDragging] = useState(false)

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

	const handleDragStart = () => {
		setIsDragging(true)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		setIsDragging(false)
		const { active, over } = event
		if (active.id !== over?.id) {
			const oldIndex = breads.findIndex(item => item.id === active.id)
			const newIndex = breads.findIndex(item => item.id === over?.id)
			const newBreads = arrayMove(breads, oldIndex, newIndex)
			setBreads(newBreads)
			localStorage.setItem(LSBreads, JSON.stringify(newBreads))
		}
	}

	useEffect(() => {
		const handleTouchMove = (event: TouchEvent) => {
			if (isDragging) {
				event.preventDefault()
			}
		}

		document.addEventListener('touchmove', handleTouchMove, { passive: false })

		return () => {
			document.removeEventListener('touchmove', handleTouchMove)
		}
	}, [isDragging])

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
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
