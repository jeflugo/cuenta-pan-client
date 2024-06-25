import toast from 'react-hot-toast'
import { TBread, TPrep } from '../lib/types'

class Prep {
	mass: { name: string; unit: string; amount: number }
	flour: { name: string; unit: string; amount: number }
	water: { name: string; unit: string; amount: number }
	sugar: { name: string; unit: string; amount: number }
	salt: { name: string; unit: string; amount: number }
	butter: { name: string; unit: string; amount: number }
	vanilla: { name: string; unit: string; amount: number }
	pineappleEssence?: { name: string; unit: string; amount: number }
	butterEssence?: { name: string; unit: string; amount: number }
	margarineEssence?: { name: string; unit: string; amount: number }
	yeast: { name: string; unit: string; amount: number }

	constructor(tag: string) {
		this.mass = { name: 'Masa', unit: 'g', amount: 0 }
		this.flour = { name: 'Harina', unit: 'g', amount: 0 }
		this.water = { name: 'Agua', unit: 'g', amount: 0 }
		this.sugar = { name: 'Azucar', unit: 'g', amount: 0 }
		this.salt = { name: 'Sal', unit: 'g', amount: 0 }
		this.butter = { name: 'Manteca', unit: 'g', amount: 0 }
		this.vanilla = { name: 'Vainilla', unit: 'tapas', amount: 0 }
		this.yeast = { name: 'Levadura', unit: 'g', amount: 0 }

		if (tag === 'sweet') {
			this.pineappleEssence = { name: 'E. piña', unit: 'tapas', amount: 0 }
		} else {
			this.butterEssence = { name: 'E. mantecado', unit: 'tapas', amount: 0 }
			this.margarineEssence = {
				name: 'E. mantequilla',
				unit: 'tapas',
				amount: 0,
			}
		}
	}
	calculateAmounts(
		breads: TBread[] | null,
		breadRec: TPrep,
		baseYeast: number,
		massFlour: number,
		flour: number
	) {
		let mass = 0
		breads?.forEach(({ make, weight }) => {
			mass += make * weight
		})

		if (isNaN(mass) || mass === 0) {
			console.log(mass)
			toast.error('Lista vacia')
			return false
		}

		this.mass.amount = mass
		this.flour.amount = flour !== 0 ? flour : Math.floor(mass / massFlour)
		this.water.amount = Math.floor(
			(breadRec.water.amount / breadRec.flour.amount) * this.flour.amount
		)
		this.sugar.amount = Math.floor(
			(breadRec.sugar.amount / breadRec.flour.amount) * this.flour.amount
		)
		this.salt.amount = Math.floor(
			(breadRec.salt.amount / breadRec.flour.amount) * this.flour.amount
		)
		this.butter.amount = Math.floor(
			(breadRec.butter.amount / breadRec.flour.amount) * this.flour.amount
		)
		this.yeast.amount = parseFloat(
			((baseYeast / breadRec.flour.amount) * this.flour.amount).toFixed(3)
		)
		this.vanilla.amount = parseFloat(
			(
				(breadRec.vanilla.amount / breadRec.flour.amount) *
				this.flour.amount
			).toFixed(3)
		)

		if (this.pineappleEssence) {
			if (breadRec.pineappleEssence) {
				this.pineappleEssence.amount = parseFloat(
					(
						(breadRec.pineappleEssence.amount / breadRec.flour.amount) *
						this.flour.amount
					).toFixed(3)
				)
			}
		}
		if (this.butterEssence) {
			if (breadRec.butterEssence) {
				this.butterEssence.amount = parseFloat(
					(
						(breadRec.butterEssence.amount / breadRec.flour.amount) *
						this.flour.amount
					).toFixed(3)
				)
			}
		}
		if (this.margarineEssence) {
			if (breadRec.margarineEssence) {
				this.margarineEssence.amount = parseFloat(
					(
						(breadRec.margarineEssence.amount / breadRec.flour.amount) *
						this.flour.amount
					).toFixed(3)
				)
			}
		}
		return true
	}
}

export { Prep }
