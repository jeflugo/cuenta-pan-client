import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
	return (
		<>
			<Toaster />
			<div className='flex flex-col min-h-screen'>
				<Header />
				<main className='flex-1'>
					<Outlet />
				</main>
				<Footer />
			</div>
		</>
	)
}
