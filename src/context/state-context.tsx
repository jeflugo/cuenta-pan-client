import { createContext, useContext, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
	TBread,
} from '../lib/types'
import { v4 } from 'uuid'

const initialBreads: TBread[] = [
	{
		id: v4(),
		name: 'campesino',
		title: 'Campesino',
		tag: 'salty',
		weightInGr: 400,
		left: '',
		make: '',
	},
	{
		id: v4(),
		name: 'moñito',
		title: 'Moñito',
		tag: 'sweet',
		weightInGr: 80,
		left: '',
		make: '',
	},
]

const StateContext = createContext<StateContextType | null>(null)

export default function StateContextProvider({
	children,
}: StateContextProviderProps) {
	const [breads, setBreads] = useState(initialBreads)

	return (
		<StateContext.Provider value={{ breads, setBreads }}>
			{children}
		</StateContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
