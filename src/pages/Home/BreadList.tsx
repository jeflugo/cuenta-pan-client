import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType, TBread } from '../../lib/types'
import Bread from './Bread'
import AddBread from './AddBread'
import { useState } from 'react'
import {
	MASS_FLOUR_SALTY,
	MASS_FLOUR_SWEET,
	SALTY_REC,
	SWEET_REC,
} from '../../constants'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { Prep } from '../../clasees'

type BreadListProps = {
	tag: string
}

export default function BreadList({ tag }: BreadListProps) {
	const {
		saltyBreads,
		setSaltyBreads,
		sweetBreads,
		setSweetBreads,
		saltyBreadPrep,
		sweetBreadPrep,
		setSweetBreadPrep,
		setSaltyBreadPrep,
	} = useStateContext() as StateContextType

	const isSweet = tag === 'sweet'
	const breads = isSweet ? sweetBreads : saltyBreads
	const setBreads = isSweet ? setSweetBreads : setSaltyBreads
	const prep = isSweet ? sweetBreadPrep : saltyBreadPrep
	const setBreadPrep = isSweet ? setSweetBreadPrep : setSaltyBreadPrep

	const name = isSweet ? 'Dulce' : 'Salado'

	const BREAD_REC = isSweet ? SWEET_REC : SALTY_REC
	const MASS_FLOUR = isSweet ? MASS_FLOUR_SWEET : MASS_FLOUR_SALTY

	const LSBreads = isSweet ? 'sweetBreads' : 'saltyBreads'
	const LSPrep = isSweet ? 'sweetBreadPrep' : 'saltyBreadPrep'

	const [openAdd, setOpenAdd] = useState(false)
	const toggleAdd = () => setOpenAdd(!openAdd)
	const [flour, setFlour] = useState<number>(0)
	const [showPrep, setShowPrep] = useState(true)
	const togglePrep = () => setShowPrep(!showPrep)

	const calculatePrep = (flour: number) => {
		const newPrep = new Prep(tag)
		const calculated = newPrep.calculateAmounts(
			breads,
			BREAD_REC,
			MASS_FLOUR,
			flour
		)

		if (!calculated) return

		setBreadPrep(newPrep)
		localStorage.setItem(LSPrep, JSON.stringify(newPrep))
		setFlour(newPrep.flour.amount)
	}

	const handleFlourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value)
		setFlour(value)
	}

	const resetList = () => {
		const newBreads: TBread[] = breads!.map(bread => {
			return { ...bread, left: 0, make: 0 }
		})
		setBreads(newBreads)
		setBreadPrep(null)
		localStorage.setItem(LSBreads, JSON.stringify(newBreads))
		localStorage.removeItem(LSPrep)
	}

	const emptylist = () =>
		breads!.every(bread => bread.left === 0 && bread.make === 0)

	return (
		<div className='mb-6'>
			<div className='flex gap-3 items-center mb-3'>
				<h2 className='text-3xl font-semibold'>Pan {name}</h2>
				{breads && !emptylist() && (
					<Button size='sm' onClick={resetList} variant='outlined'>
						Reiniciar
					</Button>
				)}
			</div>

			{breads && (
				<div className='mb-4 gap-2 flex flex-col'>
					{breads.map(bread => {
						return (
							<Bread
								key={bread.id}
								bread={bread}
								breads={breads}
								setBreads={setBreads}
								LSBreads={LSBreads}
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
						calculatePrep(0)
					}}
				>
					Calcular Preparacion
				</Button>
			)}
			{openAdd && (
				<AddBread
					breads={breads}
					setBreads={setBreads}
					toggleAdd={toggleAdd}
					LSBreads={LSBreads}
				/>
			)}
			{prep && (
				<div className='mt-4'>
					<div
						className='flex justify-between items-center'
						onClick={togglePrep}
					>
						<h3 className='text-lg font-bold underline'>Preparacion {name}</h3>
						<span>
							{showPrep ? (
								<BiChevronDown size={30} />
							) : (
								<BiChevronRight size={30} />
							)}
						</span>
					</div>
					<ul className={`${showPrep ? 'block' : 'hidden'}`}>
						{Object.entries(prep).map(([key, ingredient]) => {
							if (!ingredient) return null
							const { name, amount, unit } = ingredient
							if (key === 'flour')
								return (
									<li key={key} className='flex gap-2 items-center'>
										<span>{name}: </span>
										<input
											className='border-2 border-black px-2 rounded outline-none py-[2px] w-24'
											type='number'
											value={flour}
											onFocus={e => e.target.select()}
											onChange={handleFlourChange}
										/>{' '}
										<Button
											type='submit'
											size='sm'
											onClick={() => {
												calculatePrep(flour)
											}}
										>
											Recalcular
										</Button>
									</li>
								)
							return (
								<li key={key}>
									{name}: {amount} {unit}
								</li>
							)
						})}
						<li>Levadura: a su criterio</li>
					</ul>
				</div>
			)}
		</div>
	)
}
