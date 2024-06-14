import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Stats from './pages/Stats'

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='/estadisticas' element={<Stats />} />
			</Route>
		</Routes>
	)
}
