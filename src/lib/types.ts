export type TBread = {
	id: string
	name: string
	title: string
	tag: string
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
	breads: TBread[]
	setBreads: React.Dispatch<React.SetStateAction<TBread[]>>
}
