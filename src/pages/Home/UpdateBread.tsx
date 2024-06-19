import { useState } from 'react'
import Container from '../../components/Container'
import { Button } from '@material-tailwind/react'
import { StateContextType, TBreadData, TBread } from '../../lib/types'
import { useStateContext } from '../../context/state-context'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

type UpdateBreadProps = {
	name: string
	weight: number
	tag: string
}

export default function UpdateBread({ name, weight, tag }: UpdateBreadProps) {
	const {
		sweetBreads,
		saltyBreads,
		setSweetBreads,
		setSaltyBreads,
		toggleUpdate,
	} = useStateContext() as StateContextType

	const [updateBreadData, setUpdateBreadData] = useState<TBreadData>({
		name,
		weight,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		setUpdateBreadData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.name === 'weight' ? parseInt(value) : value,
		}))
	}

	const updateBread = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const newBread: TBread = {
			id: v4(),
			name: updateBreadData.name,
			weight: updateBreadData.weight,
			left: 0,
			make: 0,
		}
		if (tag === 'sweet') {
			if (!sweetBreads) {
				setSweetBreads([newBread])
			} else {
				setSweetBreads([...sweetBreads, newBread])
			}
		} else {
			if (!saltyBreads) {
				setSaltyBreads([newBread])
			} else {
				setSaltyBreads([...saltyBreads, newBread])
			}
		}
		toast.success(`Pan "${updateBreadData.name}" actualizado.`)
	}

	return (
		<div className='absolute z-10 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center'>
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
