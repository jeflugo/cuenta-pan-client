import { Button } from '@material-tailwind/react'

type DeleteBreadProps = {
	resetList: () => void
	toggleConfirmReset: () => void
}

export default function ConfirmReset({
	resetList,
	toggleConfirmReset,
}: DeleteBreadProps) {
	return (
		<div className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center'>
			<div className='py-4 px-6 bg-white rounded'>
				<h3 className='text-lg mb-2'>Reiniciar lista?</h3>
				<div className='flex gap-2 justify-end'>
					<Button size='sm' onClick={toggleConfirmReset} variant='outlined'>
						Cancelar
					</Button>
					<Button
						size='sm'
						color='green'
						onClick={() => {
							resetList()
							toggleConfirmReset()
						}}
					>
						Si
					</Button>
				</div>
			</div>
		</div>
	)
}
