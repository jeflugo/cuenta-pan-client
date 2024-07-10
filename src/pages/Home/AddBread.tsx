import { useState } from 'react'
import Container from '../../components/Container'
import { Button } from '@material-tailwind/react'
import { TBread, TBreadData } from '../../lib/types'
// import { v4 } from 'uuid'
import toast from 'react-hot-toast'

const initialAddBreadData = {
	name: '',
	weight: 0,
}

type AddBreadProps = {
	breads: TBread[] | null
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	toggleAdd: () => void
	LSBreads: string
}

export default function AddBread({
	breads,
	setBreads,
	toggleAdd,
	LSBreads,
}: AddBreadProps) {
	const [addBreadData, setAddBreadData] =
		useState<TBreadData>(initialAddBreadData)
	const { name, weight } = addBreadData

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setAddBreadData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.name === 'weight' ? parseInt(value) : value,
		}))
	}

	const addBread = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const newBread: TBread = {
			name,
			weight,
			left: 0,
			make: 0,
			position: breads ? breads.length : 0,
		}

		fetch(`${import.meta.env.VITE_SERVER_URL}/${LSBreads}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newBread),
		})
			.then(response => response.json())
			.then(data => {
				const newBreads = breads ? [...breads, data] : [data]

				setBreads(newBreads)

				toast.success(`Pan "${name}" agregado.`)
				toggleAdd()
			})
			.catch(error => {
				toast.error('Error de base de datos')
				console.log(`Error: ${error}`)
			})
	}

	return (
		<div className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center'>
			<Container>
				<form onSubmit={addBread} className='py-4 px-6 bg-white rounded'>
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
								onFocus={e => e.target.select()}
								className='border-2 border-black px-2 rounded outline-none py-[2px] w-full'
							/>
						</label>
					</div>
					<div className='w-full flex justify-end'>
						<div className='flex gap-2'>
							<Button size='sm' variant='outlined' onClick={toggleAdd}>
								Cerrar
							</Button>
							<Button type='submit' size='sm' disabled={!name || !weight}>
								Añadir
							</Button>
						</div>
					</div>
				</form>
			</Container>
		</div>
	)
}
