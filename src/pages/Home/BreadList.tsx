import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType, TBread, TPrep } from '../../lib/types'
import BreadField from './BreadField'
import AddBread from './AddBread'
import { useState } from 'react'

type BreadListProps = {
	tag: string
}

export default function BreadList({ tag }: BreadListProps) {
	const [addOpen, setAddOpen] = useState(false)
	const {
		saltyBreads,
		setSaltyBreads,
		sweetBreads,
		setSweetBreads,
		calculateMass,
		saltyBreadPrep,
		sweetBreadPrep,
	} = useStateContext() as StateContextType

	let breads: TBread[] | null
	let setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	let prep: TPrep | null
	let name: string

	if (tag === 'sweet') {
		breads = sweetBreads
		setBreads = setSweetBreads
		prep = sweetBreadPrep
		name = 'Dulce'
	} else {
		breads = saltyBreads
		setBreads = setSaltyBreads
		prep = saltyBreadPrep
		name = 'Salado'
	}

	const toggleAdd = () => setAddOpen(!addOpen)

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-medium mb-1'>Pan {name}</h2>

			{breads && (
				<div className='mb-4 gap-2 flex flex-col'>
					{breads.map(bread => {
						return (
							<BreadField
								key={bread.id}
								bread={bread}
								breads={breads}
								setBreads={setBreads}
							/>
						)
					})}
				</div>
			)}

			<div
				className={`w-full flex ${breads ? 'justify-end' : 'justify-center'} mb-1`}
			>
				<Button size='sm' variant='outlined' onClick={toggleAdd}>
					Añadir nuevo pan
				</Button>
			</div>
			{breads && (
				<Button
					size='sm'
					onClick={() => {
						calculateMass(tag)
					}}
				>
					Calcular Preparacion
				</Button>
			)}
			{addOpen && <AddBread toggleAdd={toggleAdd} tag={tag} />}
			{prep && (
				<div className='mt-4'>
					<h3 className='text-lg font-bold underline'>Preparacion</h3>
					<ul className='list-disc ml-5'>
						<li>
							Masa total: {prep.mass.amount} {prep.mass.unit}
						</li>
						<li>
							Harina: {prep.flour.amount} {prep.flour.unit}
						</li>
						<li>
							Agua: {prep.water.amount} {prep.water.unit}
						</li>
						<li>
							Azucar: {prep.sugar.amount} {prep.sugar.unit}
						</li>
						<li>
							Sal: {prep.salt.amount} {prep.salt.unit}
						</li>
						<li>
							Manteca: {prep.butter.amount} {prep.butter.unit}
						</li>
						<li>
							Vainilla: {prep.vanilla.amount} {prep.vanilla.unit}
						</li>
						{tag === 'sweet' ? (
							<>
								<li>
									E. piña: {prep.pineappleEssence!.amount}{' '}
									{prep.pineappleEssence!.unit}
								</li>
								<li>Canela: a su criterio</li>
								<li>Anis chiquito: a su criterio</li>
								<li>Colorante: a su criterio</li>
							</>
						) : (
							<>
								<li>
									E. mantecado: {prep.butterEssence!.amount}{' '}
									{prep.butterEssence!.unit}
								</li>
								<li>
									E. mantequilla: {prep.margarineEssence!.amount}{' '}
									{prep.margarineEssence!.unit}
								</li>
							</>
						)}
						<li>Levadura: a su criterio</li>
					</ul>
				</div>
			)}
		</div>
	)
}
