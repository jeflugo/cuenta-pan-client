import { BiInfoCircle } from 'react-icons/bi'
import Container from '../../components/Container'
import { useEffect, useState } from 'react'
import { SALTY_REC, SWEET_REC } from '../../constants'
import { CgClose } from 'react-icons/cg'

export default function Header() {
	const [showInfo, setShowInfo] = useState(false)
	const toggleInfo = () => setShowInfo(!showInfo)

	useEffect(() => {
		if (showInfo) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = 'auto'
	}, [showInfo])

	return (
		<header className='py-3 border shadow-md'>
			<Container>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-semibold'>Cuenta Pan</h1>
					<div className='relative ml-4'>
						<BiInfoCircle size={24} onClick={toggleInfo} />
						{showInfo && (
							<div className='fixed z-10 top-0 left-0 w-full rounded shadow-md py-2 px-5 bg-white overflow-y-scroll h-screen'>
								<div className='relative'>
									<h2 className='text-center text-xl font-medium'>
										Recetas base
									</h2>
									<div className='absolute top-1 right-0'>
										<CgClose size={24} onClick={toggleInfo} />
									</div>
								</div>
								<div className='mb-1'>
									<h3 className='text-lg font-bold'>Receta dulce: </h3>
									<div className='ml-4'>
										{Object.entries(SWEET_REC).map(
											([key, { amount, name, unit }]) => (
												<p key={key}>
													{name}: {amount} {unit}
												</p>
											)
										)}
									</div>
								</div>
								<div>
									<h3 className='text-lg font-bold'>Receta salada: </h3>
									<div className='ml-4'>
										{Object.entries(SALTY_REC).map(
											([key, { amount, name, unit }]) => (
												<p key={key}>
													{name}: {amount} {unit}
												</p>
											)
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</Container>
		</header>
	)
}
