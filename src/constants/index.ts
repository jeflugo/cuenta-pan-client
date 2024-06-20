import { TPrep } from '../lib/types'

const SALTY_REC: TPrep = {
	mass: {
		name: 'Masa',
		unit: 'g',
		amount: 46310,
	},
	flour: {
		name: 'Harina',
		unit: 'g',
		amount: 30000,
	},
	water: {
		name: 'Agua',
		unit: 'g',
		amount: 14000,
	},
	sugar: {
		name: 'Azucar',
		unit: 'g',
		amount: 1500,
	},
	salt: {
		name: 'Sal',
		unit: 'g',
		amount: 560,
	},
	butter: {
		name: 'Manteca',
		unit: 'g',
		amount: 250,
	},
	vanilla: {
		name: 'Vainilla',
		unit: 'tapa',
		amount: 3,
	},
	butterEssence: {
		name: 'E. mantecado',
		unit: 'tapa',
		amount: 3,
	},
	margarineEssence: {
		name: 'E. mantequilla',
		unit: 'tapa',
		amount: 3,
	},
	yeast: {
		name: 'Levadura',
		unit: 'g',
		amount: 35,
	},
}

const SWEET_REC: TPrep = {
	mass: {
		name: 'Masa',
		unit: 'g',
		amount: 49250,
	},
	flour: {
		name: 'Harina',
		unit: 'g',
		amount: 30000,
	},
	water: {
		name: 'Agua',
		unit: 'g',
		amount: 12000,
	},
	sugar: {
		name: 'Azucar',
		unit: 'g',
		amount: 6800,
	},
	salt: {
		name: 'Sal',
		unit: 'g',
		amount: 200,
	},
	butter: {
		name: 'Manteca',
		unit: 'g',
		amount: 250,
	},
	vanilla: {
		name: 'Vainilla',
		unit: 'tapa',
		amount: 4,
	},
	pineappleEssence: {
		name: 'E. piña',
		unit: 'tapa',
		amount: 4,
	},
	yeast: {
		name: 'Levadura',
		unit: 'g',
		amount: 35,
	},
}

const MASS_FLOUR_SWEET = SWEET_REC.mass.amount / SWEET_REC.flour.amount
const MASS_FLOUR_SALTY = SALTY_REC.mass.amount / SALTY_REC.flour.amount

export { SALTY_REC, SWEET_REC, MASS_FLOUR_SWEET, MASS_FLOUR_SALTY }
