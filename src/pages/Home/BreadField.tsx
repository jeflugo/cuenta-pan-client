import { useState } from 'react'
import { TBread } from '../../lib/types'
import { BiPencil, BiTrash } from 'react-icons/bi'

type BreadFieldProps = {
	bread: TBread
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
}

export default function BreadField({
	bread,
	breads,
	setBreads,
}: BreadFieldProps) {
	const { title, weightInGr } = bread
	const [inputData, setInputData] = useState({
		left: 0,
		make: 0,
	})

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

			<button className='ml-2'>
				<BiPencil size={20} />
			</button>
			<button>
				<BiTrash size={20} />
			</button>
		</div>
	)
}
