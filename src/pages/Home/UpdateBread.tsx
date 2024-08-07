import { useState } from 'react'
import Container from '../../components/Container'
import { Button } from '@material-tailwind/react'
import { TBreadData, TBread } from '../../lib/types'
import toast from 'react-hot-toast'

type UpdateBreadProps = {
	bread: TBread
	breads: TBread[] | null
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	toggleUpdate: () => void
	LSBreads: string
}

export default function UpdateBread({
	bread,
	breads,
	setBreads,
	toggleUpdate,
	LSBreads,
}: UpdateBreadProps) {
	const [updateBreadData, setUpdateBreadData] = useState<TBreadData>({
		name: bread.name,
		weight: bread.weight,
	})
	const { id } = bread

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setUpdateBreadData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.name === 'weight' ? parseInt(value) : value,
		}))
	}

	const updateBread = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		fetch(`${import.meta.env.VITE_SERVER_URL}/${LSBreads}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: updateBreadData.name,
				weight: updateBreadData.weight,
			}),
		})
			.then(response => {
				if (!response.ok) throw new Error('Failed to update bread')

				return response.json()
			})
			.then(data => {
				const newBreads = breads!.map(bread => bread)
				const index = breads!.findIndex(bread => bread.id === data.id)
				newBreads[index].name = data.name
				newBreads[index].weight = data.weight
				setBreads(newBreads)

				toast.success(`Pan "${data.name}" actualizado.`)
				toggleUpdate()
			})
			.catch(error => {
				console.error('Error updating bread:', error)
				toast.error('Error al actualizar el pan.')
			})
	}

	return (
		<div className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center'>
			<Container>
				<form onSubmit={updateBread} className='py-4 px-6 bg-white rounded'>
					<div className='flex gap-2 mb-4'>
						<label className='w-1/2'>
							<h3 className='font-medium'>Nombre</h3>
							<input
								type='text'
								placeholder='Campesino'
								name='name'
								value={updateBreadData.name}
								onChange={handleChange}
								onFocus={e => e.target.select()}
								className='border-2 border-black px-2 rounded outline-none py-[2px] w-full'
							/>
						</label>
						<label className='w-1/2'>
							<h3 className='font-medium'>Peso en gramos</h3>
							<input
								type='number'
								placeholder='400'
								name='weight'
								value={updateBreadData.weight}
								onChange={handleChange}
								onFocus={e => e.target.select()}
								className='border-2 border-black px-2 rounded outline-none py-[2px] w-full'
							/>
						</label>
					</div>
					<div className='w-full flex justify-end'>
						<div className='flex gap-2'>
							<Button size='sm' variant='outlined' onClick={toggleUpdate}>
								Cerrar
							</Button>
							<Button
								type='submit'
								size='sm'
								disabled={!updateBreadData.name || !updateBreadData.weight}
							>
								Actualizar
							</Button>
						</div>
					</div>
				</form>
			</Container>
		</div>
	)
}
