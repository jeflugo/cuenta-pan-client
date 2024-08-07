import { createContext, useContext, useEffect, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
	TBread,
	TPrep,
	TSavedBreadsArr,
} from '../lib/types'

const initialSaltyBreadPrep: TPrep = JSON.parse(
	localStorage.getItem('saltyBreadPrep') || 'null'
)

const initialSweetBreadPrep: TPrep = JSON.parse(
	localStorage.getItem('sweetBreadPrep') || 'null'
)

const fetchInitialData = async (endpoint: string) => {
	return fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch initial data')
			}
			return response.json()
		})
		.then(data => {
			// console.log(`${endpoint}: `, data)
			return data
		})
		.catch(error => {
			console.error('Error fetching initial data:', error)
			return null
		})
}

const StateContext = createContext<StateContextType | null>(null)

export default function StateContextProvider({
	children,
}: StateContextProviderProps) {
	const [saltyBreads, setSaltyBreads] = useState<TBread[] | null>(null)
	const [savedSaltyBreadsArr, setSavedSaltyBreadsArr] =
		useState<TSavedBreadsArr | null>(null)
	const [saltyBreadPrep, setSaltyBreadPrep] = useState<TPrep | null>(null)

	const [sweetBreads, setSweetBreads] = useState<TBread[] | null>(null)
	const [savedSweetBreadsArr, setSavedSweetBreadsArr] =
		useState<TSavedBreadsArr | null>(null)
	const [sweetBreadPrep, setSweetBreadPrep] = useState<TPrep | null>(null)
	const [somethingIsLoading, setSomethingIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const saltyBreadsData = (await fetchInitialData('saltyBreads')) as
				| TBread[]
				| null
			const savedSaltyBreadsArrData = (await fetchInitialData(
				'savedSaltyBreads'
			)) as TSavedBreadsArr | null
			const sweetBreadsData = (await fetchInitialData('sweetBreads')) as
				| TBread[]
				| null
			const savedSweetBreadsArrData = (await fetchInitialData(
				'savedSweetBreads'
			)) as TSavedBreadsArr | null

			const sortedSaltyBreads =
				saltyBreadsData &&
				saltyBreadsData.sort((a, b) => a.position - b.position)
			const sortedSweetBreads =
				sweetBreadsData &&
				sweetBreadsData.sort((a, b) => a.position - b.position)
			setSaltyBreads(sortedSaltyBreads)
			setSavedSaltyBreadsArr(savedSaltyBreadsArrData)
			setSweetBreads(sortedSweetBreads)
			setSavedSweetBreadsArr(savedSweetBreadsArrData)
			setSomethingIsLoading(false)
		}
		fetchData()

		setSaltyBreadPrep(initialSaltyBreadPrep)
		setSweetBreadPrep(initialSweetBreadPrep)
	}, [])

	return (
		<StateContext.Provider
			value={{
				saltyBreads,
				setSaltyBreads,
				savedSweetBreadsArr,
				setSavedSweetBreadsArr,
				saltyBreadPrep,
				setSaltyBreadPrep,

				sweetBreads,
				setSweetBreads,
				savedSaltyBreadsArr,
				setSavedSaltyBreadsArr,
				sweetBreadPrep,
				setSweetBreadPrep,

				somethingIsLoading,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
