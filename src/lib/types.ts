export type StateContextProviderProps = {
	children: React.ReactNode
}

export type StateContextType = {
	saltyBreads: TBread[] | null
	setSaltyBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	saltyBreadPrep: TPrep | null

	sweetBreads: TBread[] | null
	setSweetBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	sweetBreadPrep: TPrep | null

	calculateMass: (tag: string) => void

	addBread: (
		e: React.FormEvent<HTMLFormElement>,
		addBreadData: TBreadData,
		tag: string
	) => void

	openAdd: boolean
	toggleAdd: () => void
	openUpdate: boolean
	toggleUpdate: () => void
}

export type TBread = {
	id: string
	name: string
	weight: number
	left: number
	make: number
}

export type TPrep = {
	mass: {
		unit: 'g'
		amount: number
	}
	flour: {
		unit: 'g'
		amount: number
	}
	water: {
		unit: 'g'
		amount: number
	}
	sugar: {
		unit: 'g'
		amount: number
	}
	salt: {
		unit: 'g'
		amount: number
	}
	butter: {
		unit: 'g'
		amount: number
	}
	vanilla: {
		unit: 'tapa'
		amount: number
	}
	butterEssence?: {
		unit: 'tapa'
		amount: number
	}
	margarineEssence?: {
		unit: 'tapa'
		amount: number
	}
	pineappleEssence?: {
		unit: 'tapa'
		amount: number
	}
}

export type TBreadData = {
	name: string
	weight: number
}
