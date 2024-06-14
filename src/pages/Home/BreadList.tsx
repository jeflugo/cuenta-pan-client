import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType } from '../../lib/types'
import BreadField from './BreadField'

type BreadListProps = {
	tag: string
}

export default function BreadList({ tag }: BreadListProps) {
	const { breads } = useStateContext() as StateContextType

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-medium mb-1'>
				Pan {tag === 'sweet' ? 'Dulce' : 'Salado'}
			</h2>

			<div className='mb-4'>
				{breads.map(bread => {
					if (bread.tag === tag)
						return <BreadField key={bread.id} bread={bread} />
				})}
			</div>

			<div className='w-full flex justify-end mb-1'>
				<Button size='sm' variant='outlined'>
					Añadir nuevo pan
				</Button>
			</div>
			<Button size='sm'>Calcular Masa</Button>
		</div>
	)
}
