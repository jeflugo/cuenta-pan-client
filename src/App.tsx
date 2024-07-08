import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Stats from './pages/Stats'
import { useStateContext } from './context/state-context'
import LoadingScreen from './pages/Home/LoadingScreen'
import { StateContextType } from './lib/types'

export default function App() {
	const { somethingIsLoading } = useStateContext() as StateContextType
	if (somethingIsLoading) return <LoadingScreen />
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='/estadisticas' element={<Stats />} />
			</Route>
		</Routes>
	)
}
