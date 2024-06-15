import { createContext, useContext, useEffect, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
	TBread,
	TPrep,
} from '../lib/types'

import { v4 } from 'uuid'

const initialSaltyBreads: TBread[] = [
	{
		id: v4(),
		name: 'campesino',
		title: 'Campesino',
		weightInGr: 400,
		left: '',
		make: '',
	},
]

const initialSweetBreads: TBread[] = [
	{
		id: v4(),
		name: 'campesino',
		title: 'Campesino',
		weightInGr: 400,
		left: '',
		make: '',
	},
]

const StateContext = createContext<StateContextType | null>(null)

export default function StateContextProvider({
	children,
}: StateContextProviderProps) {
	const [saltyBreads, setSaltyBreads] = useState<TBread[] | null>(null)
	const [saltyBreadPrep, setSaltyBreadPrep] = useState<TPrep | null>(null)

	const [sweetBreads, setSweetBreads] = useState<TBread[] | null>(null)
	const [sweetBreadPrep, setSweetBreadPrep] = useState<TPrep | null>(null)

	useEffect(() => {
		setSaltyBreads(initialSaltyBreads)
		setSweetBreads(initialSweetBreads)
	}, [])

	const calculateMass = (tag: string) => {
		const setBreadPrep = tag === 'sweet' ? setSweetBreadPrep : setSaltyBreadPrep

		setBreadPrep(null)
	}
	return (
		<StateContext.Provider
			value={{
				saltyBreads,
				setSaltyBreads,
				saltyBreadPrep,

				sweetBreads,
				setSweetBreads,
				sweetBreadPrep,

				calculateMass,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
