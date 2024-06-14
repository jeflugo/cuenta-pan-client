import Container from '../../components/Container'

export default function Header() {
	return (
		<header className='py-3 border shadow-md'>
			<Container>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-semibold'>Cuenta Pan</h1>
				</div>
			</Container>
		</header>
	)
}
