import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import MainContainer from './MainContainer'

export default function Layout() {
	return (
		<>
			<Header />
			<MainContainer>
				<Outlet />
			</MainContainer>
			<Footer />
		</>
	)
}
