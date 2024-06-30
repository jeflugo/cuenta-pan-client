import { TSavedBreads } from '../../lib/types'

type BreadHistoryProps = {
	savedBreads: TSavedBreads | null
}

const BreadHistory = ({ savedBreads }: BreadHistoryProps) => {
	return (
		<div>
			<h2 className='text-3xl font-semibold'>Historial de Panes</h2>
			{savedBreads &&
				Object.keys(savedBreads).map(date => (
					<div key={date}>
						<h3 className='text-2xl'>{date}</h3>
						<ul>
							{savedBreads[date].map((bread, index) => (
								<li key={index}>{bread.name}</li>
							))}
						</ul>
					</div>
				))}
		</div>
	)
}

export default BreadHistory
