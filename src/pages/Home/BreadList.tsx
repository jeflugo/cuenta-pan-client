import React, { Suspense, lazy } from 'react'
import { TBread } from '../../lib/types'
import Loading from '../../components/Loading'
const Bread = lazy(() => import('./Bread'))

type BreadListProps = {
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	LSBreads: string
}

export default function BreadList({
	breads,
	setBreads,
	LSBreads,
}: BreadListProps) {
	return (
		<div className='mb-4 gap-2 flex flex-col'>
			{breads.map(bread => (
				<Suspense key={bread.id} fallback={<Loading paddingY='5' />}>
					<Bread
						bread={bread}
						breads={breads}
						setBreads={setBreads}
						LSBreads={LSBreads}
					/>
				</Suspense>
			))}
		</div>
	)
}
