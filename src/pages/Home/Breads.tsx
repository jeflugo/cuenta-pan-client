import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType, TBread, TPrep } from '../../lib/types'
import AddBread from './AddBread'
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
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

import BreadHistory from './BreadHistory'
import { FaHistory } from 'react-icons/fa'
const BreadList = lazy(() => import('./BreadList'))
const PreparationDetails = lazy(() => import('./PreparationDetails'))

type BreadListProps = {
	tag: string
}

export default function Breads({ tag }: BreadListProps) {
	const {
		saltyBreads,
		setSaltyBreads,
		savedSaltyBreads,
		setSavedSaltyBreads,
		saltyBreadPrep,
		setSaltyBreadPrep,

		sweetBreads,
		setSweetBreads,
		savedSweetBreads,
		setSavedSweetBreads,
		sweetBreadPrep,
		setSweetBreadPrep,
	} = useStateContext() as StateContextType

	const isSweet = tag === 'sweet'
	const breads = isSweet ? sweetBreads : saltyBreads
	const setBreads = isSweet ? setSweetBreads : setSaltyBreads
	const savedBreads = isSweet ? savedSweetBreads : savedSaltyBreads
	const setSavedBreads = isSweet ? setSavedSweetBreads : setSavedSaltyBreads
	const prep = isSweet ? sweetBreadPrep : saltyBreadPrep
	const setBreadPrep = isSweet ? setSweetBreadPrep : setSaltyBreadPrep

	const name = isSweet ? 'dulce' : 'salado'

	const BREAD_REC = isSweet ? SWEET_REC : SALTY_REC
	const MASS_FLOUR = isSweet ? MASS_FLOUR_SWEET : MASS_FLOUR_SALTY

	const LSBreads = isSweet ? 'sweetBreads' : 'saltyBreads'
	const LSSavedBreads = isSweet ? 'savedSweetBreads' : 'savedSaltyBreads'
	const LSPrep = isSweet ? 'sweetBreadPrep' : 'saltyBreadPrep'

	const [flour, setFlour] = useState<number>(0)
	const [baseYeast, setBaseYeast] = useState<number>(BREAD_REC.yeast.amount)

	const [openHistory, setOpenHistory] = useState(false)
	const toggleHistory = () => setOpenHistory(!openHistory)

	const [openAdd, setOpenAdd] = useState(false)
	const toggleAdd = () => setOpenAdd(!openAdd)

	const [showPrep, setShowPrep] = useState(true)
	const togglePrep = () => setShowPrep(!showPrep)

	const [yesterdayBreads, setYesterdayBreads] = useState<TBread[] | null>(null)
	useEffect(() => {
		if (savedBreads) {
			const yesterdayDate =
				Object.keys(savedBreads)[Object.keys(savedBreads).length - 1]
			const yBreads = savedBreads[yesterdayDate]

			setYesterdayBreads(yBreads)
		}
	}, [savedBreads])

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

	const emptylist = () =>
		breads!.every(bread => bread.left === 0 && bread.make === 0)

	const saveBreadListWithDate = useCallback(() => {
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
			.toLocaleString('en-US', { timeZone: 'America/Caracas' })
			.split(',')[0]
			.split('/')
			.reverse()
			.join('-') // Get yesterday's date in YYYY-MM-DD format in Venezuelan time

		const newSavedBreads = JSON.parse(
			localStorage.getItem(LSSavedBreads) || '{}'
		)
		newSavedBreads[yesterday] = breads
		localStorage.setItem(LSSavedBreads, JSON.stringify(newSavedBreads))
		setSavedBreads(newSavedBreads)
	}, [breads, LSSavedBreads, setSavedBreads])

	const resetList = useCallback(() => {
		saveBreadListWithDate() // Save the current list before resetting

		const newBreads: TBread[] = breads!.map(bread => {
			return { ...bread, left: 0, make: 0 }
		})
		setBreads(newBreads)
		setBreadPrep(null)
		localStorage.setItem(LSBreads, JSON.stringify(newBreads))
		localStorage.removeItem(LSPrep)

		toast.success('Lista reiniciada.')
	}, [LSBreads, breads, saveBreadListWithDate, setBreadPrep, setBreads, LSPrep])

	useEffect(() => {
		const today = new Date()
			.toLocaleString('en-US', { timeZone: 'America/Caracas' })
			.split(',')[0]
		const lastReset = localStorage.getItem('lastReset')

		if (lastReset !== today) {
			if (breads) {
				resetList()
				localStorage.setItem('lastReset', today)
			}
		}
	}, [breads, resetList])

	return (
		<div className='mb-6'>
			{/* *POP UPS */}
			{openHistory && (
				<BreadHistory
					savedBreads={savedBreads}
					toggleHistory={toggleHistory}
					name={name}
				/>
			)}
			{openAdd && (
				<AddBread
					breads={breads}
					setBreads={setBreads}
					toggleAdd={toggleAdd}
					LSBreads={LSBreads}
				/>
			)}
			<div className='flex gap-3 items-center mb-3'>
				<h2 className='text-3xl font-semibold'>Pan {name}</h2>
				{savedBreads && <FaHistory onClick={toggleHistory} />}
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
						yesterdayBreads={yesterdayBreads}
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
