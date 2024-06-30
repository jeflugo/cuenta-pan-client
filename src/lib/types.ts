export type StateContextProviderProps = {
	children: React.ReactNode
}

export type StateContextType = {
	saltyBreads: TBread[] | null
	setSaltyBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	savedSweetBreads:TSavedBreads|null
	setSavedSweetBreads:React.Dispatch<React.SetStateAction<TSavedBreads | null>>
	saltyBreadPrep: TPrep | null
	setSaltyBreadPrep: React.Dispatch<React.SetStateAction<TPrep | null>>

	sweetBreads: TBread[] | null
	setSweetBreads: React.Dispatch<React.SetStateAction<TBread[] | null>>
	savedSaltyBreads:TSavedBreads|null
	setSavedSaltyBreads:React.Dispatch<React.SetStateAction<TSavedBreads | null>>
	sweetBreadPrep: TPrep | null
	setSweetBreadPrep: React.Dispatch<React.SetStateAction<TPrep | null>>
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
		name: string
		unit: string
		amount: number
	}
	flour: {
		name: string
		unit: string
		amount: number
	}
	water: {
		name: string
		unit: string
		amount: number
	}
	sugar: {
		name: string
		unit: string
		amount: number
	}
	salt: {
		name: string
		unit: string
		amount: number
	}
	butter: {
		name: string
		unit: string
		amount: number
	}
	vanilla: {
		name: string
		unit: string
		amount: number
	}
	butterEssence?: {
		name: string
		unit: string
		amount: number
	}
	margarineEssence?: {
		name: string
		unit: string
		amount: number
	}
	pineappleEssence?: {
		name: string
		unit: string
		amount: number
	}
	yeast: {
		name: string
		unit: string
		amount: number
	}
}

export type TBreadData = {
	name: string
	weight: number
}

export type TSavedBreads = {
	[date: string]: TBread[]
}
