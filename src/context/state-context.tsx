import { createContext, useContext, useEffect, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
	TBread,
	TPrep,
	TSavedBreads,
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

const initialSavedSweetBreads: TSavedBreads | null = JSON.parse(
	localStorage.getItem('savedSweetBreads') || 'null'
)
const initialSavedSaltyBreads: TSavedBreads | null = JSON.parse(
	localStorage.getItem('savedSaltyBreads') || 'null'
)

const StateContext = createContext<StateContextType | null>(null)

export default function StateContextProvider({
	children,
}: StateContextProviderProps) {
	const [saltyBreads, setSaltyBreads] = useState<TBread[] | null>(null)
	const [savedSaltyBreads, setSavedSaltyBreads] = useState<TSavedBreads | null>(
		null
	)
	const [saltyBreadPrep, setSaltyBreadPrep] = useState<TPrep | null>(null)

	const [sweetBreads, setSweetBreads] = useState<TBread[] | null>(null)
	const [savedSweetBreads, setSavedSweetBreads] = useState<TSavedBreads | null>(
		null
	)
	const [sweetBreadPrep, setSweetBreadPrep] = useState<TPrep | null>(null)

	useEffect(() => {
		setSaltyBreads(initialSaltyBreads)
		setSavedSaltyBreads(initialSavedSaltyBreads)
		setSaltyBreadPrep(initialSaltyBreadPrep)

		setSweetBreads(initialSweetBreads)
		setSavedSweetBreads(initialSavedSweetBreads)
		setSweetBreadPrep(initialSweetBreadPrep)
	}, [])

	return (
		<StateContext.Provider
			value={{
				saltyBreads,
				setSaltyBreads,
				savedSweetBreads,
				setSavedSweetBreads,
				saltyBreadPrep,
				setSaltyBreadPrep,

				sweetBreads,
				setSweetBreads,
				savedSaltyBreads,
				setSavedSaltyBreads,
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
