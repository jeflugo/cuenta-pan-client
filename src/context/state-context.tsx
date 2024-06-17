import { createContext, useContext, useEffect, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
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

const initialPrep: TPrep = {
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
		let setBreadPrep: React.Dispatch<React.SetStateAction<TPrep | null>>
		let breads: TBread[] | null
		let BREAD_REC: TPrep
		let MASS_FLOUR: number

		if (tag === 'sweet') {
			setBreadPrep = setSweetBreadPrep
			breads = sweetBreads
			BREAD_REC = SWEET_REC
			MASS_FLOUR = MASS_FLOUR_SWEET
		} else {
			setBreadPrep = setSaltyBreadPrep
			breads = saltyBreads
			BREAD_REC = SALTY_REC
			MASS_FLOUR = MASS_FLOUR_SALTY
		}

		setBreadPrep(null)

		const prep = initialPrep

		let mass = 0
		breads?.forEach(({ make, weightInGr }) => {
			mass = mass + make * weightInGr
		})

		// Calculate prep
		prep.mass.amount = mass
		prep.flour.amount = prep.mass.amount / MASS_FLOUR
		console.log(prep.flour.amount)
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
		prep.vanilla.amount = Math.floor(
			(BREAD_REC.vanilla.amount / BREAD_REC.flour.amount) * prep.flour.amount
		)

		if (tag === 'sweet') {
			prep.pineappleEssence = {
				unit: 'tapa',
				amount: Math.floor(
					(BREAD_REC.pineappleEssence!.amount / BREAD_REC.flour.amount) *
						prep.flour.amount
				),
			}
		} else {
			prep.butterEssence = {
				unit: 'tapa',
				amount: Math.floor(
					(BREAD_REC.margarineEssence!.amount / BREAD_REC.flour.amount) *
						prep.flour.amount
				),
			}
			prep.margarineEssence = {
				unit: 'tapa',
				amount: Math.floor(
					(BREAD_REC.margarineEssence!.amount / BREAD_REC.flour.amount) *
						prep.flour.amount
				),
			}
		}

		if (isNaN(prep.mass.amount) || prep.mass.amount === 0) {
			toast.error('Lista vacia')
			return
		}
		setBreadPrep(prep)
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
