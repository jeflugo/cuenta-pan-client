import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType, TBread, TPrep } from '../../lib/types'
import AddBread from './AddBread'
import { Suspense, lazy, useEffect, useState } from 'react'
import {
	MASS_FLOUR_SALTY,
	MASS_FLOUR_SWEET,
	SALTY_REC,
	SWEET_REC,
} from '../../constants'
import { Prep } from '../../clasees'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import CopyButton from '../../components/CopyButton'
const BreadList = lazy(() => import('./BreadList'))

const PreparationDetails = lazy(() => import('./PreparationDetails'))

type BreadListProps = {
	tag: string
}

export default function Breads({ tag }: BreadListProps) {
	const {
		saltyBreads,
		setSaltyBreads,
		sweetBreads,
		setSweetBreads,
		saltyBreadPrep,
		sweetBreadPrep,
		setSweetBreadPrep,
		setSaltyBreadPrep,
	} = useStateContext() as StateContextType

	const isSweet = tag === 'sweet'
	const breads = isSweet ? sweetBreads : saltyBreads
	const setBreads = isSweet ? setSweetBreads : setSaltyBreads
	const prep = isSweet ? sweetBreadPrep : saltyBreadPrep
	const setBreadPrep = isSweet ? setSweetBreadPrep : setSaltyBreadPrep

	const name = isSweet ? 'Dulce' : 'Salado'

	const BREAD_REC = isSweet ? SWEET_REC : SALTY_REC
	const MASS_FLOUR = isSweet ? MASS_FLOUR_SWEET : MASS_FLOUR_SALTY

	const LSBreads = isSweet ? 'sweetBreads' : 'saltyBreads'
	const LSPrep = isSweet ? 'sweetBreadPrep' : 'saltyBreadPrep'

	const [openAdd, setOpenAdd] = useState(false)
	const toggleAdd = () => setOpenAdd(!openAdd)
	const [flour, setFlour] = useState<number>(0)
	const [baseYeast, setBaseYeast] = useState<number>(BREAD_REC.yeast.amount)
	const [showPrep, setShowPrep] = useState(true)
	const togglePrep = () => setShowPrep(!showPrep)

	useEffect(() => {
		if (prep) setFlour(prep.flour.amount)
	}, [prep])

	useEffect(() => {
		if (!breads) {
			setBreadPrep(null)
			localStorage.removeItem(LSPrep)
		}
	}, [breads, setBreadPrep, LSPrep])

	const calculatePrep = (flour: number) => {
		const newPrep = new Prep(tag)
		const calculated = newPrep.calculateAmounts(
			breads,
			BREAD_REC,
			baseYeast,
			MASS_FLOUR,
			flour
		)

		if (!calculated) return

		setBreadPrep(newPrep)
		localStorage.setItem(LSPrep, JSON.stringify(newPrep))
		setFlour(newPrep.flour.amount)
	}

	const handleFlourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value)
		setFlour(value)
	}

	const handleYeastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value)
		setBaseYeast(value)
	}

	const recalculateYeast = () => {
		if (prep) {
			const newYeast = parseFloat(
				((baseYeast / BREAD_REC.flour.amount) * prep.flour.amount).toFixed(3)
			)
			const newPrep: TPrep = {
				...prep,
				yeast: { ...prep.yeast, amount: newYeast },
			}
			setBreadPrep(newPrep)
			localStorage.setItem(LSPrep, JSON.stringify(newPrep))
		}
	}

	const resetList = () => {
		const newBreads: TBread[] = breads!.map(bread => {
			return { ...bread, left: 0, make: 0 }
		})
		setBreads(newBreads)
		setBreadPrep(null)
		localStorage.setItem(LSBreads, JSON.stringify(newBreads))
		localStorage.removeItem(LSPrep)

		toast.success('Lista reiniciada.')
	}

	const emptylist = () =>
		breads!.every(bread => bread.left === 0 && bread.make === 0)

	return (
		<div className='mb-6'>
			<div className='flex gap-3 items-center mb-3'>
				<h2 className='text-3xl font-semibold'>Pan {name}</h2>
				{breads && !emptylist() && (
					<>
						<Button size='sm' onClick={resetList} variant='outlined'>
							Reiniciar
						</Button>
						<CopyButton breads={breads} />
					</>
				)}
			</div>

			{breads && (
				<Suspense fallback={<Loading paddingY='10' />}>
					<BreadList
						breads={breads}
						setBreads={setBreads}
						LSBreads={LSBreads}
					/>
				</Suspense>
			)}

			<div
				className={`w-full flex ${breads ? 'justify-end' : 'justify-center'} mb-1`}
			>
				<Button size='sm' variant='outlined' onClick={toggleAdd}>
					Añadir nuevo pan
				</Button>
			</div>
			{breads && (
				<Button
					size='sm'
					onClick={() => {
						calculatePrep(0)
					}}
				>
					Calcular Preparacion
				</Button>
			)}
			{openAdd && (
				<AddBread
					breads={breads}
					setBreads={setBreads}
					toggleAdd={toggleAdd}
					LSBreads={LSBreads}
				/>
			)}
			{prep && (
				<Suspense fallback={<Loading paddingY='10' />}>
					<PreparationDetails
						name={name}
						showPrep={showPrep}
						togglePrep={togglePrep}
						prep={prep}
						baseYeast={baseYeast}
						handleYeastChange={handleYeastChange}
						recalculateYeast={recalculateYeast}
						flour={flour}
						handleFlourChange={handleFlourChange}
						calculatePrep={calculatePrep}
					/>
				</Suspense>
			)}
		</div>
	)
}
