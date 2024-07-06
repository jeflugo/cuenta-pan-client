import { useEffect, useState } from 'react'
import { TBread } from '../../lib/types'
import { BiPencil, BiTrash } from 'react-icons/bi'
import toast from 'react-hot-toast'
import UpdateBread from './UpdateBread'
import { useSortable } from '@dnd-kit/sortable'
import { LuChevronsUpDown } from 'react-icons/lu'
import { CSS } from '@dnd-kit/utilities'
import { Tooltip } from '@material-tailwind/react'
import DeleteBread from './DeleteBread'

type BreadFieldProps = {
	bread: TBread
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	LSBreads: string
	yBread: TBread | null
}

export default function Bread({
	bread,
	breads,
	setBreads,
	LSBreads,
	yBread,
}: BreadFieldProps) {
	const { id, name, weight } = bread
	const [inputData, setInputData] = useState({
		left: bread.left,
		make: bread.make,
	})

	const [openUpdate, setOpenUpdate] = useState(false)
	const toggleUpdate = () => setOpenUpdate(!openUpdate)

	const [openDelete, setOpenDelete] = useState(false)
	const toggleDelete = () => setOpenDelete(!openDelete)

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
		fetch(`${import.meta.env.VITE_SERVER_URL}/${LSBreads}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to delete bread')
				}
				return response.json()
			})
			.then(data => {
				if (breads!.length === 1) {
					newBreads = null
				} else {
					newBreads = breads!.filter(bread => bread.id !== data.id)
				}
				setBreads(newBreads)
				toast.success(`Pan "${name}" eliminado.`)
			})
	}

	useEffect(() => {
		setInputData({ left: bread.left, make: bread.make })
	}, [bread])

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: bread.id! })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div className='flex items-center' style={style}>
			<div ref={setNodeRef} {...attributes} {...listeners}>
				<LuChevronsUpDown size={20} />
			</div>

			<div className='flex gap-1 items-center'>
				<input
					className='border-2 border-black px-2 rounded outline-none py-[2px] min-w-24 w-full'
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
				<Tooltip
					content={`Ayer: ${yBread?.make ? `${yBread.make}` : 'nada'}`}
					placement='left'
				>
					<input
						className='border-2 border-black px-2 rounded outline-none py-[2px] w-10'
						type='number'
						name='make'
						value={inputData.make}
						onChange={handleChange}
						onFocus={e => e.target.select()}
					/>
				</Tooltip>

				<button onClick={toggleUpdate}>
					<BiPencil size={20} />
				</button>
				<button onClick={toggleDelete}>
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
				{openDelete && (
					<DeleteBread
						deleteBread={deleteBread}
						name={name}
						toggleDelete={toggleDelete}
					/>
				)}
			</div>
		</div>
	)
}
