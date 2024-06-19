import { createContext, useContext, useEffect, useState } from 'react'
import {
	StateContextProviderProps,
	StateContextType,
	TBread,
	TBreadData,
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
		weight: 400,
		left: 0,
		make: 0,
	},
]

const initialSweetBreads: TBread[] = [
	{
		id: v4(),
		name: 'moñito',
		weight: 80,
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
		const isSweet = tag === 'sweet'
		const breads = isSweet ? sweetBreads : saltyBreads
		const setBreadPrep = isSweet ? setSweetBreadPrep : setSaltyBreadPrep
		const BREAD_REC = isSweet ? SWEET_REC : SALTY_REC
		const MASS_FLOUR = isSweet ? MASS_FLOUR_SWEET : MASS_FLOUR_SALTY

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
		breads?.forEach(({ make, weight }) => {
			mass = mass + make * weight
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
		{ name, weight }: TBreadData,
		tag: string
	) => {
		e.preventDefault()

		const newBread: TBread = {
			id: v4(),
			name,
			weight,
			left: 0,
			make: 0,
		}

		if (tag === 'sweet') {
			if (!sweetBreads) {
				setSweetBreads([newBread])
			} else {
				setSweetBreads([...sweetBreads, newBread])
			}
		} else {
			if (!saltyBreads) {
				setSaltyBreads([newBread])
			} else {
				setSaltyBreads([...saltyBreads, newBread])
			}
		}

		toast.success(`Pan "${name}" agregado.`)
	}

	const toggleAdd = () => setOpenAdd(!openAdd)
	const toggleUpdate = () => setOpenUpdate(!openUpdate)

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

				openAdd,
				toggleAdd,
				openUpdate,
				toggleUpdate,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
