import React from 'react'
import { Button } from '@material-tailwind/react'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { TPrep } from '../../lib/types'

type PreparationDetailsProps = {
	name: string
	showPrep: boolean
	togglePrep: () => void
	prep: TPrep
	baseYeast: number
	handleYeastChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	recalculateYeast: () => void
	flour: number
	handleFlourChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	calculatePrep: (flour: number) => void
}

export default function PreparationDetails({
	name,
	showPrep,
	togglePrep,
	prep,
	baseYeast,
	handleYeastChange,
	recalculateYeast,
	flour,
	handleFlourChange,
	calculatePrep,
}: PreparationDetailsProps) {
	return (
		<div className='mt-4'>
			<div className='flex justify-between items-center' onClick={togglePrep}>
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
					if (key === 'yeast')
						return (
							<li key={key}>
								<div>{name}</div>
								<div className='ml-4'>
									<div className='flex gap-2 items-center mb-1'>
										<div>Base: </div>
										<input
											className='border-2 border-black px-2 rounded outline-none py-[2px] w-16'
											type='number'
											value={baseYeast}
											onFocus={e => e.target.select()}
											onChange={handleYeastChange}
										/>
										<Button type='submit' size='sm' onClick={recalculateYeast}>
											Calcular lev
										</Button>
									</div>
									<div>
										<span>Cantidad: </span>
										<span>
											{ingredient.amount} {ingredient.unit}
										</span>
									</div>
								</div>
							</li>
						)
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
								/>
								<Button
									type='submit'
									size='sm'
									onClick={() => calculatePrep(flour)}
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
			</ul>
		</div>
	)
}
