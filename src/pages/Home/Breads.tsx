import { Button } from '@material-tailwind/react'
import { useStateContext } from '../../context/state-context'
import { StateContextType, TBread, TPrep, TSavedBreads } from '../../lib/types'
import AddBread from './AddBread'
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import {
	MASS_FLOUR_SALTY,
	MASS_FLOUR_SWEET,
	SALTY_REC,
	SWEET_REC,
} from '../../constants'
import { Prep } from '../../classes'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import CopyButton from '../../components/CopyButton'

import BreadHistory from './BreadHistory'
import { FaHistory } from 'react-icons/fa'
import ConfirmReset from './ConfirmReset'
const BreadList = lazy(() => import('./BreadList'))
const PreparationDetails = lazy(() => import('./PreparationDetails'))

type BreadsProps = {
	tag: string
}

export default function Breads({ tag }: BreadsProps) {
	const {
		saltyBreads,
		setSaltyBreads,
		savedSaltyBreadsArr,
		setSavedSaltyBreadsArr,
		saltyBreadPrep,
		setSaltyBreadPrep,

		sweetBreads,
		setSweetBreads,
		savedSweetBreadsArr,
		setSavedSweetBreadsArr,
		sweetBreadPrep,
		setSweetBreadPrep,
	} = useStateContext() as StateContextType

	const isSweet = tag === 'sweet'
	const breads = isSweet ? sweetBreads : saltyBreads
	const setBreads = isSweet ? setSweetBreads : setSaltyBreads
	const savedBreadsArr = isSweet ? savedSweetBreadsArr : savedSaltyBreadsArr
	const setSavedBreadsArr = isSweet
		? setSavedSweetBreadsArr
		: setSavedSaltyBreadsArr
	const prep = isSweet ? sweetBreadPrep : saltyBreadPrep
	const setBreadPrep = isSweet ? setSweetBreadPrep : setSaltyBreadPrep

	const name = isSweet ? 'dulce' : 'salado'

	const BREAD_REC = isSweet ? SWEET_REC : SALTY_REC
	const MASS_FLOUR = isSweet ? MASS_FLOUR_SWEET : MASS_FLOUR_SALTY

	const DBBreads = isSweet ? 'sweetBreads' : 'saltyBreads'
	const DbSavedBreadsArr = isSweet ? 'savedSweetBreads' : 'savedSaltyBreads'
	const DBResets = isSweet ? 'sweetResets' : 'saltyResets'

	const LSPrep = isSweet ? 'sweetBreadPrep' : 'saltyBreadPrep'

	const [flour, setFlour] = useState<number>(0)
	const [baseYeast, setBaseYeast] = useState<number>(BREAD_REC.yeast.amount)

	const [openHistory, setOpenHistory] = useState(false)
	const toggleHistory = () => setOpenHistory(!openHistory)

	const [openAdd, setOpenAdd] = useState(false)
	const toggleAdd = () => setOpenAdd(!openAdd)

	const [openPrep, setOpenPrep] = useState(true)
	const togglePrep = () => setOpenPrep(!openPrep)

	const [openConfirmReset, setopenConfirmReset] = useState(false)
	const toggleConfirmReset = () => setopenConfirmReset(!openConfirmReset)

	const [yesterdayBreads, setYesterdayBreads] = useState<TBread[] | null>(null)
	useEffect(() => {
		if (savedBreadsArr) {
			const yBreads = savedBreadsArr[savedBreadsArr.length - 1].breads

			setYesterdayBreads(yBreads)
		}
	}, [savedBreadsArr])

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

	const emptyList = useCallback(() => {
		if (breads)
			return breads.every(bread => bread.left === 0 && bread.make === 0)
		return null
	}, [breads])

	const saveBreadList = useCallback(() => {
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
			.toLocaleString('en-US', { timeZone: 'America/Caracas' })
			.split(',')[0]
			.split('/')
			.reverse()
			.join('-') // Get yesterday's date in YYYY-MM-DD format in Venezuelan time

		const newSavedBreads: TSavedBreads = {
			date: yesterday,
			breads: breads!,
		}
		fetch(`${import.meta.env.VITE_SERVER_URL}/${DbSavedBreadsArr}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newSavedBreads),
		})
			.then(response => response.json())
			.then(data => {
				let newSavedBreadsArr
				if (!savedBreadsArr) newSavedBreadsArr = [data]
				else newSavedBreadsArr = [...savedBreadsArr, data]
				setSavedBreadsArr(newSavedBreadsArr)
			})
			.catch(error => {
				console.error('Error saving bread list:', error)
			})
	}, [breads, DbSavedBreadsArr, setSavedBreadsArr, savedBreadsArr])

	const resetList = useCallback(() => {
		fetch(`${import.meta.env.VITE_SERVER_URL}/${DBBreads}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		})
			.then(response => response.json())
			.then(data => {
				setBreads(data)
				setBreadPrep(null)
				localStorage.removeItem(LSPrep)
			})
			.catch(error => {
				console.error('Error resetting bread list:', error)
			})

		toast.success('Lista reiniciada.')
	}, [DBBreads, setBreadPrep, setBreads, LSPrep])

	const hasRunSweetRef = useRef(false)
	const hasRunSaltyRef = useRef(false)
	const hasRunRef = isSweet ? hasRunSweetRef : hasRunSaltyRef
	useEffect(() => {
		const checkNewDay = async () => {
			const URL = `${import.meta.env.VITE_SERVER_URL}/${DBResets}`
			const today = new Date()
				.toLocaleString('en-US', { timeZone: 'America/Caracas' })
				.split(',')[0]

			const getResets = async () => {
				const res = await fetch(URL)
				const data = await res.json()
				return data
			}

			const createReset = async () => {
				const res = await fetch(URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ value: today }),
				})
				const data = await res.json()
				return data
			}

			const resets = await getResets()

			if (!resets) return await createReset()

			const lastReset = resets[resets.length - 1].value
			if (lastReset !== today && breads && !emptyList()) {
				saveBreadList()
				resetList()
				await createReset()
			}
		}

		if (!hasRunRef.current && breads) {
			checkNewDay()
			hasRunRef.current = true
		}
	}, [breads])

	return (
		<div className='mb-6'>
			{/* *POP UPS */}
			{openHistory && (
				<BreadHistory
					savedBreadsArr={savedBreadsArr}
					toggleHistory={toggleHistory}
					name={name}
				/>
			)}
			{openAdd && (
				<AddBread
					breads={breads}
					setBreads={setBreads}
					toggleAdd={toggleAdd}
					LSBreads={DBBreads}
				/>
			)}
			{openConfirmReset && (
				<ConfirmReset
					toggleConfirmReset={toggleConfirmReset}
					resetList={resetList}
				/>
			)}

			<div className='flex gap-3 mb-3 justify-between items-center'>
				<div className='flex gap-3 items-center'>
					<h2 className='text-3xl font-semibold first-letter:uppercase'>
						{name}
					</h2>
					{savedBreadsArr && <FaHistory onClick={toggleHistory} />}
				</div>
				{breads && !emptyList() && (
					<div className='flex gap-1'>
						<Button size='sm' onClick={toggleConfirmReset} variant='outlined'>
							Reiniciar
						</Button>
						<CopyButton breads={breads} />
					</div>
				)}
			</div>

			{breads && (
				<Suspense fallback={<Loading paddingY='10' />}>
					<BreadList
						breads={breads}
						setBreads={setBreads}
						LSBreads={DBBreads}
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
						showPrep={openPrep}
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
