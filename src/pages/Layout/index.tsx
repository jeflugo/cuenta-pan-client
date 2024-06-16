import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
	return (
		<>
			<Toaster />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}
