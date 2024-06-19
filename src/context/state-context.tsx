import { createContext, useContext, useEffect, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
	TBread,
	TPrep,
} from '../lib/types'

// const initialSaltyBreads: TBread[] = [
// 	{
// 		id: v4(),
// 		name: 'campesino',
// 		weight: 400,
// 		left: 0,
// 		make: 0,
// 	},
// ]

// const initialSweetBreads: TBread[] = [
// 	{
// 		id: v4(),
// 		name: 'moñito',
// 		weight: 80,
// 		left: 0,
// 		make: 0,
// 	},
// ]

const initialSaltyBreads: TBread[] = JSON.parse(
	localStorage.getItem('saltyBreads') || 'null'
)

const initialSweetBreads: TBread[] = JSON.parse(
	localStorage.getItem('sweetBreads') || 'null'
)

const initialSaltyBreadPrep: TPrep = JSON.parse(
	localStorage.getItem('saltyBreadPrep') || 'null'
)

const initialSweetBreadPrep: TPrep = JSON.parse(
	localStorage.getItem('sweetBreadPrep') || 'null'
)

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
		setSaltyBreadPrep(initialSaltyBreadPrep)
		setSweetBreadPrep(initialSweetBreadPrep)
	}, [])

	return (
		<StateContext.Provider
			value={{
				saltyBreads,
				setSaltyBreads,
				saltyBreadPrep,
				setSaltyBreadPrep,

				sweetBreads,
				setSweetBreads,
				sweetBreadPrep,
				setSweetBreadPrep,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
