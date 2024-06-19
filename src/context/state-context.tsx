import { createContext, useContext, useEffect, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
	TAddBreadData,
	TBread,
	TPrep,
} from '../lib/types'

import { v4 } from 'uuid'
import toast from 'react-hot-toast'
import {
	MASS_FLOUR_SALTY,
	MASS_FLOUR_SWEET,
	SALTY_REC,
	SWEET_REC,
} from '../constants'

const initialSaltyBreads: TBread[] = [
	{
		id: v4(),
		name: 'campesino',
		title: 'Campesino',
		weightInGr: 400,
		left: 0,
		make: 0,
	},
]

const initialSweetBreads: TBread[] = [
	{
		id: v4(),
		name: 'moñito',
		title: 'Moñito',
		weightInGr: 80,
		left: 0,
		make: 0,
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

	const [openAdd, setOpenAdd] = useState(false)
	const [openUpdate, setOpenUpdate] = useState(false)

	useEffect(() => {
		setSaltyBreads(initialSaltyBreads)
		setSweetBreads(initialSweetBreads)
	}, [])

	const calculateMass = (tag: string) => {
		let breads: TBread[] | null
		let setBreadPrep: React.Dispatch<React.SetStateAction<TPrep | null>>
		let BREAD_REC: TPrep
		let MASS_FLOUR: number

		if (tag === 'sweet') {
			breads = sweetBreads
			setBreadPrep = setSweetBreadPrep
			BREAD_REC = SWEET_REC
			MASS_FLOUR = MASS_FLOUR_SWEET
		} else {
			breads = saltyBreads
			setBreadPrep = setSaltyBreadPrep
			BREAD_REC = SALTY_REC
			MASS_FLOUR = MASS_FLOUR_SALTY
		}

		setBreadPrep(null)

		const prep: TPrep = {
			mass: {
				unit: 'g',
				amount: 0,
			},
			flour: {
				unit: 'g',
				amount: 0,
			},
			water: {
				unit: 'g',
				amount: 0,
			},
			sugar: {
				unit: 'g',
				amount: 0,
			},
			salt: {
				unit: 'g',
				amount: 0,
			},
			butter: {
				unit: 'g',
				amount: 0,
			},
			vanilla: {
				unit: 'tapa',
				amount: 0,
			},
		}

		let mass = 0
		breads?.forEach(({ make, weightInGr }) => {
			mass = mass + make * weightInGr
		})

		// Calculate prep
		prep.mass.amount = mass
		prep.flour.amount = Math.floor(prep.mass.amount / MASS_FLOUR)
		prep.water.amount = Math.floor(
			(BREAD_REC.water.amount / BREAD_REC.flour.amount) * prep.flour.amount
		)
		prep.sugar.amount = Math.floor(
			(BREAD_REC.sugar.amount / BREAD_REC.flour.amount) * prep.flour.amount
		)
		prep.salt.amount = Math.floor(
			(BREAD_REC.salt.amount / BREAD_REC.flour.amount) * prep.flour.amount
		)
		prep.butter.amount = Math.floor(
			(BREAD_REC.butter.amount / BREAD_REC.flour.amount) * prep.flour.amount
		)
		prep.vanilla.amount = parseFloat(
			(
				(BREAD_REC.vanilla.amount / BREAD_REC.flour.amount) *
				prep.flour.amount
			).toFixed(3)
		)

		if (tag === 'sweet') {
			prep.pineappleEssence = {
				unit: 'tapa',
				amount: parseFloat(
					(
						(BREAD_REC.pineappleEssence!.amount / BREAD_REC.flour.amount) *
						prep.flour.amount
					).toFixed(3)
				),
			}
		} else {
			prep.butterEssence = {
				unit: 'tapa',
				amount: parseFloat(
					(
						(BREAD_REC.butterEssence!.amount / BREAD_REC.flour.amount) *
						prep.flour.amount
					).toFixed(3)
				),
			}
			prep.margarineEssence = {
				unit: 'tapa',
				amount: parseFloat(
					(
						(BREAD_REC.margarineEssence!.amount / BREAD_REC.flour.amount) *
						prep.flour.amount
					).toFixed(3)
				),
			}
		}

		if (isNaN(prep.mass.amount) || prep.mass.amount === 0) {
			toast.error('Lista vacia')
			return
		}

		setBreadPrep(prep)
	}

	const addBread = (
		e: React.FormEvent<HTMLFormElement>,
		addBreadData: TAddBreadData,
		tag: string
	) => {
		e.preventDefault()
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
				addBread,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
