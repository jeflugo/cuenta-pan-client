import { TPrep } from '../lib/types'

const SALTY_REC: TPrep = {
	mass: {
		unit: 'g',
		amount: 46310,
	},
	flour: {
		unit: 'g',
		amount: 30000,
	},
	water: {
		unit: 'g',
		amount: 14000,
	},
	sugar: {
		unit: 'g',
		amount: 1500,
	},
	salt: {
		unit: 'g',
		amount: 560,
	},
	butter: {
		unit: 'g',
		amount: 250,
	},
	vanilla: {
		unit: 'tapa',
		amount: 3,
	},
	butterEssence: {
		unit: 'tapa',
		amount: 3,
	},
	margarineEssence: {
		unit: 'tapa',
		amount: 3,
	},
}

const SWEET_REC: TPrep = {
	mass: {
		unit: 'g',
		amount: 49250,
	},
	flour: {
		unit: 'g',
		amount: 30000,
	},
	water: {
		unit: 'g',
		amount: 12000,
	},
	sugar: {
		unit: 'g',
		amount: 6800,
	},
	salt: {
		unit: 'g',
		amount: 200,
	},
	butter: {
		unit: 'g',
		amount: 250,
	},
	vanilla: {
		unit: 'tapa',
		amount: 4,
	},
	pineappleEssence: {
		unit: 'tapa',
		amount: 4,
	},
}

const MASS_FLOUR_SWEET = SWEET_REC.mass.amount / SWEET_REC.flour.amount
const MASS_FLOUR_SALTY = SALTY_REC.mass.amount / SALTY_REC.flour.amount

export { SALTY_REC, SWEET_REC, MASS_FLOUR_SWEET, MASS_FLOUR_SALTY }
