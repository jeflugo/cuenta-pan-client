export type TBread = {
	id: string
	name: string
	title: string
	weightInGr: number
	left: string
	make: string
}

export type TPrep = {
	mass: number
	water: number
	flour: number
}

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
}
