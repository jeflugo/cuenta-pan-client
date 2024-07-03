import { CgClose } from 'react-icons/cg'
import { TSavedBreads } from '../../lib/types'

type BreadHistoryProps = {
	savedBreads: TSavedBreads | null
	toggleHistory: () => void
	name: string
}

const BreadHistory = ({
	savedBreads,
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

			{savedBreads &&
				Object.keys(savedBreads).map(date => (
					<div key={date}>
						<h3 className='text-xl'>{`${date} (${getWeekday(date)})`}</h3>
						<ul>
							{savedBreads[date].map(({ name, left, make }, index) => (
								<li key={index}>
									{name}: {left}/{make}
								</li>
							))}
						</ul>
					</div>
				))}
		</div>
	)
}

export default BreadHistory
