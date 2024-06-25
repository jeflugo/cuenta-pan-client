import { useEffect, useState } from 'react'
import { TBread } from '../../lib/types'
import { BiPencil, BiTrash } from 'react-icons/bi'
import toast from 'react-hot-toast'
import UpdateBread from './UpdateBread'

type BreadFieldProps = {
	bread: TBread
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	LSBreads: string
}

export default function Bread({
	bread,
	breads,
	setBreads,
	LSBreads,
}: BreadFieldProps) {
	const { id, name, weight } = bread
	const [inputData, setInputData] = useState({
		left: bread.left,
		make: bread.make,
	})

	const [openUpdate, setOpenUpdate] = useState(false)

	const toggleUpdate = () => setOpenUpdate(!openUpdate)

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
		localStorage.setItem(LSBreads, JSON.stringify(modifiedBreads))
		setInputData({ ...inputData, [e.target.name]: value })
	}

	const deleteBread = () => {
		let newBreads
		if (breads!.length === 1) {
			newBreads = null
			localStorage.removeItem(LSBreads)
		} else {
			newBreads = breads!.filter(bread => bread.id !== id)
			localStorage.setItem(LSBreads, JSON.stringify(newBreads))
		}

		setBreads(newBreads)
		toast.success(`Pan "${name}" eliminado.`)
	}

	useEffect(() => {
		setInputData({ left: bread.left, make: bread.make })
	}, [bread])

	return (
		<div className='flex gap-1 items-center'>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-24'
				type='text'
				name='name'
				value={name}
				readOnly
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-14'
				type='text'
				name='weight'
				value={weight}
				readOnly
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-10'
				type='number'
				name='left'
				value={inputData.left}
				onChange={handleChange}
				onFocus={e => e.target.select()}
			/>
			<input
				className='border-2 border-black px-2 rounded outline-none py-[2px] w-10'
				type='number'
				name='make'
				value={inputData.make}
				onChange={handleChange}
				onFocus={e => e.target.select()}
			/>

			<button onClick={toggleUpdate}>
				<BiPencil size={20} />
			</button>
			<button onClick={deleteBread}>
				<BiTrash size={20} />
			</button>
			{openUpdate && (
				<UpdateBread
					bread={bread}
					toggleUpdate={toggleUpdate}
					breads={breads}
					setBreads={setBreads}
					LSBreads={LSBreads}
				/>
			)}
		</div>
	)
}
