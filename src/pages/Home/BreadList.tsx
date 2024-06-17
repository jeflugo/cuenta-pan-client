import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType, TBread, TPrep } from '../../lib/types'
import BreadField from './BreadField'

type BreadListProps = {
	tag: string
}

export default function BreadList({ tag }: BreadListProps) {
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

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-medium mb-1'>Pan {name}</h2>

			{breads && (
				<div className='mb-4'>
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
				<Button size='sm' variant='outlined'>
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
					Calcular Masa
				</Button>
			)}
			{prep && (
				<div>
					<div>
						Masa total: {prep.mass.amount} {prep.mass.unit}
					</div>
					<div>
						Harina: {prep.flour.amount} {prep.flour.unit}
					</div>
					<div>
						Agua: {prep.water.amount} {prep.water.unit}
					</div>
					<div>
						Azucar: {prep.sugar.amount} {prep.sugar.unit}
					</div>
					<div>
						Sal: {prep.salt.amount} {prep.salt.unit}
					</div>
					<div>
						Manteca: {prep.butter.amount} {prep.butter.unit}
					</div>
					<div>
						Vainilla: {prep.vanilla.amount} {prep.vanilla.unit}
					</div>
					{tag === 'sweet' ? (
						<div>
							E. piña: {prep.pineappleEssence!.amount}{' '}
							{prep.pineappleEssence!.unit}
						</div>
					) : (
						<>
							<div>
								E. mantecado: {prep.butterEssence!.amount}{' '}
								{prep.butterEssence!.unit}
							</div>
							<div>
								E. mantequilla: {prep.margarineEssence!.amount}{' '}
								{prep.margarineEssence!.unit}
							</div>
						</>
					)}
				</div>
			)}
		</div>
	)
}
