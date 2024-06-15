import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType } from '../../lib/types'
import BreadField from './BreadField'

type BreadListProps = {
	tag: string
}

export default function BreadList({ tag }: BreadListProps) {
	const {
		saltyBreads,
		sweetBreads,
		calculateMass,
		saltyBreadPrep,
		sweetBreadPrep,
	} = useStateContext() as StateContextType

	let breads, prep, name
	if (tag === 'sweet') {
		breads = sweetBreads
		prep = sweetBreadPrep
		name = 'Dulce'
	} else {
		breads = saltyBreads
		prep = saltyBreadPrep
		name = 'Salado'
	}

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-medium mb-1'>Pan {name}</h2>

			<div className='mb-4'>
				{breads ? (
					breads.map(bread => {
						return <BreadField key={bread.id} bread={bread} />
					})
				) : (
					<h2>No hay panes en la lista</h2>
				)}
			</div>

			<div className='w-full flex justify-end mb-1'>
				<Button size='sm' variant='outlined'>
					Añadir nuevo pan
				</Button>
			</div>
			<Button
				size='sm'
				onClick={() => {
					calculateMass(tag)
				}}
			>
				Calcular Masa
			</Button>
			{prep && <div>Masa total: {prep.mass} gramos</div>}
		</div>
	)
}
