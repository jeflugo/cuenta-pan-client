import { Spinner } from '@material-tailwind/react'

export default function LoadingScreen() {
	return (
		<div className='bg-white h-screen flex justify-center items-center'>
			<div className='flex gap-2'>
				<span>
					<Spinner />
				</span>
				<span>Cargando datos</span>
			</div>
		</div>
	)
}
