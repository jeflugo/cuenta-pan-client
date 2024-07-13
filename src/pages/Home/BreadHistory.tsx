import { CgClose } from 'react-icons/cg'
import { TSavedBreadsArr } from '../../lib/types'

type BreadHistoryProps = {
	savedBreadsArr: TSavedBreadsArr | null
	toggleHistory: () => void
	name: string
}

const BreadHistory = ({
	savedBreadsArr,
	toggleHistory,
	name,
}: BreadHistoryProps) => {
	const getWeekday = (dateString: string): string => {
		const [year, day, month] = dateString.split('-').map(Number)
		const date = new Date(year, month - 1, day) // month is 0-indexed
		const weekdays = [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado',
		]
		return weekdays[date.getDay()]
	}

	return (
		<div className='fixed z-10 top-0 left-0 right-0 bottom-0 w-full py-4 px-5 bg-white overflow-y-scroll'>
			<div className='flex items-center justify-between mb-3'>
				<h2 className='text-2xl font-semibold'>Historial de pan {name}</h2>
				<CgClose size={24} onClick={toggleHistory} />
			</div>
			{savedBreadsArr &&
				[...savedBreadsArr].reverse().map(({ date, breads }) => (
					<div
						key={date}
						className='text-center border rounded mb-2 border-black'
					>
						<h3 className='text-xl underline py-1 bg-blue-700 text-white'>{`${date} (${getWeekday(date)})`}</h3>

						<table className='w-full'>
							<thead>
								<tr className='bg-blue-200 border-y border-black'>
									<td className='text-lg'>Nombre</td>
									<td className='border-x border-black'>Habian</td>
									<td className='text-lg'>Se hizo</td>
								</tr>
							</thead>
							<tbody>
								{breads.map(({ name, left, make }, index) => (
									<tr
										key={index}
										className='bg-gray-100 border-y border-gray-300'
									>
										<td>{name}</td>
										<td className='border-x border-black'>{left}</td>
										<td>{make}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				))}
		</div>
	)
}

export default BreadHistory
