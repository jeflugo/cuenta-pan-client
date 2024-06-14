import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import StateContextProvider from './context/state-context.tsx'

import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')!
createRoot(root).render(
	<StrictMode>
		<BrowserRouter>
			<StateContextProvider>
				<App />
			</StateContextProvider>
		</BrowserRouter>
	</StrictMode>
)
