import Container from '../../components/Container'
import BreadList from './BreadList'

export default function Home() {
	return (
		<div className='py-3'>
			<Container>
				<BreadList tag='sweet' />
				<BreadList tag='salty' />
			</Container>
		</div>
	)
}
