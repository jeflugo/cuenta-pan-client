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
} from '@dnd-kit/sortable'
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
	yesterdayBreads: TBread[] | null
}

export default function BreadList({
	breads,
	setBreads,
	LSBreads,
	yesterdayBreads,
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

	const findYBread = (id: string) => {
		const yBread = yesterdayBreads?.find(bread => bread.id === id)
		if (!yBread) return null
		return yBread
	}

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
						<Suspense key={bread.id} fallback={<Loading paddingY='5' />}>
							<Bread
								bread={bread}
								breads={breads}
								setBreads={setBreads}
								LSBreads={LSBreads}
								yBread={findYBread(bread.id)}
							/>
						</Suspense>
					))}
				</div>
			</SortableContext>
		</DndContext>
	)
}
