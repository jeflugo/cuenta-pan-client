import { useState } from 'react'
import { StateContextType, TBread } from '../../lib/types'
import { BiPencil, BiTrash } from 'react-icons/bi'
import { useStateContext } from '../../context/state-context'
import toast from 'react-hot-toast'
import UpdateBread from './UpdateBread'

type BreadFieldProps = {
	bread: TBread
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	tag: string
}

export default function Bread({
	bread,
	breads,
	setBreads,
	tag,
}: BreadFieldProps) {
	const { id, name, weight } = bread
	const [inputData, setInputData] = useState({
		left: 0,
		make: 0,
	})

	const {
		sweetBreads,
		saltyBreads,
		setSweetBreads,
		setSaltyBreads,
		openUpdate,
		toggleUpdate,
	} = useStateContext() as StateContextType

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Find index
		const modifyBreadIndex = breads.findIndex(({ id }) => bread.id === id)
		// Make copy
		const modifiedBreads = breads.map(a => a)

		const value = parseInt(e.target.value)

		if (e.target.name === 'left') {
			modifiedBreads[modifyBreadIndex].left = value
		} else {
			modifiedBreads[modifyBreadIndex].make = value
		}

		setBreads(modifiedBreads)
		setInputData({ ...inputData, [e.target.name]: value })
	}

	const deleteBread = () => {
		if (tag === 'sweet') {
			if (sweetBreads!.length === 1) setSweetBreads(null)
			else setSweetBreads(sweetBreads!.filter(bread => bread.id !== id))
		} else {
			if (saltyBreads!.length === 1) setSaltyBreads(null)
			else setSaltyBreads(saltyBreads!.filter(bread => bread.id !== id))
		}
		toast.success(`Pan "${name}" eliminado.`)
	}

	return (
		<div className='flex gap-1 items-center'>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-28'
				type='text'
				name='name'
				value={name}
				readOnly
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-16'
				type='text'
				name='weight'
				value={weight}
				readOnly
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-12'
				type='number'
				name='left'
				value={inputData.left}
				onChange={handleChange}
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-12'
				type='number'
				name='make'
				value={inputData.make}
				onChange={handleChange}
			/>

			<button className='ml-2' onClick={toggleUpdate}>
				<BiPencil size={20} />
			</button>
			<button onClick={deleteBread}>
				<BiTrash size={20} />
			</button>
			{openUpdate && <UpdateBread name={name} weight={weight} tag={tag} />}
		</div>
	)
}
