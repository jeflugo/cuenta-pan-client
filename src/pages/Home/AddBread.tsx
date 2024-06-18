import { useState } from 'react'
import Container from '../../components/Container'
import { Button } from '@material-tailwind/react'
import { StateContextType, TAddBreadData } from '../../lib/types'
import { useStateContext } from '../../context/state-context'

const initialAddBreadData = {
	name: '',
	weight: 0,
}

type TAddBread = {
	toggleAdd: () => void
	tag: string
}

export default function AddBread({ toggleAdd, tag }: TAddBread) {
	const { addBread } = useStateContext() as StateContextType
	const [addBreadData, setAddBreadData] =
		useState<TAddBreadData>(initialAddBreadData)
	const { name, weight } = addBreadData

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setAddBreadData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.name === 'weight' ? parseInt(value) : value,
		}))
	}
	return (
		<div className='absolute z-10 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center'>
			<Container>
				<form
					onSubmit={e => {
						addBread(e, addBreadData, tag)
					}}
					className='py-4 px-6 bg-white rounded'
				>
					<div className='flex gap-2 mb-4'>
						<label className='w-1/2'>
							<h3 className='font-medium'>Nombre</h3>
							<input
								type='text'
								placeholder='Campesino'
								name='name'
								value={name}
								onChange={handleChange}
								className='border-2 border-black px-2 rounded outline-none py-[2px] w-full'
							/>
						</label>
						<label className='w-1/2'>
							<h3 className='font-medium'>Peso en gramos</h3>
							<input
								type='number'
								placeholder='400'
								name='weight'
								value={weight}
								onChange={handleChange}
								className='border-2 border-black px-2 rounded outline-none py-[2px] w-full'
							/>
						</label>
					</div>
					<div className='w-full flex justify-end'>
						<div className='flex gap-2'>
							<Button size='sm' variant='outlined' onClick={toggleAdd}>
								Cerrar
							</Button>
							<Button type='submit' size='sm'>
								Añadir
							</Button>
						</div>
					</div>
				</form>
			</Container>
		</div>
	)
}
