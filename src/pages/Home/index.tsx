import Container from '../../components/Container'
import Breads from './Breads'

export default function Home() {
	return (
		<div className='py-3'>
			<Container>
				<Breads tag='sweet' />
				<Breads tag='salty' />
			</Container>
		</div>
	)
}
