import { Button } from '@material-tailwind/react'

type DeleteBreadProps = {
	name: string
	deleteBread: () => void
	toggleDelete: () => void
}

export default function DeleteBread({
	name,
	deleteBread,
	toggleDelete,
}: DeleteBreadProps) {
	return (
		<div className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center'>
			<div className='py-4 px-6 bg-white rounded'>
				<h3 className='text-lg mb-4'>Eliminar "{name}" de la lista?</h3>
				<div className='flex gap-2 justify-end'>
					<Button size='sm' onClick={toggleDelete}>
						Cancelar
					</Button>
					<Button size='sm' color='red' onClick={deleteBread}>
						Eliminar
					</Button>
				</div>
			</div>
		</div>
	)
}
