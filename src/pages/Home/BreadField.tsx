import { useState } from 'react'
import { StateContextType, TBread } from '../../lib/types'
import { BiPencil, BiTrash } from 'react-icons/bi'
import { useStateContext } from '../../context/state-context'

type BreadFieldProps = {
	bread: TBread
}

export default function BreadField({ bread }: BreadFieldProps) {
	const { title, weightInGr } = bread
	const [inputData, setInputData] = useState({
		left: '',
		make: '',
	})
	const { left, make } = inputData
	const { breads, setBreads } = useStateContext() as StateContextType

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedBread = breads.find(({ id }) => bread.id === id) as TBread

		const modifyBreadIndex = breads.findIndex(({ id }) => bread.id === id)
		const modifiedBreads = breads

		const value = e.target.value

		if (e.target.name === 'left') {
			updatedBread.left = value
		} else {
			updatedBread.make = value
		}

		modifiedBreads[modifyBreadIndex] = updatedBread

		//! ISNAN
		if (isNaN(Math.floor(+value))) return

		setBreads(modifiedBreads)
		setInputData({ ...inputData, [e.target.name]: value })
	}

	return (
		<div className='flex gap-1 items-center'>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-28'
				type='text'
				name='title'
				value={title}
				readOnly
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-16'
				type='text'
				name='weight'
				value={weightInGr}
				readOnly
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-12'
				type='text'
				name='left'
				value={left}
				onChange={handleChange}
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-12'
				type='text'
				name='make'
				value={make}
				onChange={handleChange}
			/>

			<button className='ml-2'>
				<BiPencil size={20} />
			</button>
			<button>
				<BiTrash size={20} />
			</button>
		</div>
	)
}
