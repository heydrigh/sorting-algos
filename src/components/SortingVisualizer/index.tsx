'use client'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { sortingAlgorithms, type SortStep } from '@/lib/sorting'
import { useAudio } from '@/hooks/useAudio'
import { useSorting } from '@/hooks/useSorting'
import Bar from '../Bar'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/lib/utils'
import { SortingAlgorithm } from '@/lib/sorting/types'

export default function SortingVisualizer() {
	const [arraySize, setArraySize] = useState(60)
	const [speed, setSpeed] = useState(50)
	const [isComplete, setIsComplete] = useState(false)
	const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble')
	const [data, setData] = useState<number[]>([])
	const [activeIndices, setActiveIndices] = useState<[number, number]>([-1, -1])
	const { playNote } = useAudio()
	const dataRef = useRef(data)
	const completeRef = useRef(false)
	const pendingStep = useRef<SortStep | null>(null)
	const rafScheduled = useRef(false)

	useEffect(() => {
		const newData = shuffleArray(Array.from({ length: arraySize }, (_, i) => i + 1))
		setData(newData)
		dataRef.current = newData
	}, [arraySize])

	const updateArray = useCallback((step: SortStep) => {
		return step.array
	}, [])

	const handleStep = useCallback(
		(step: SortStep) => {
			pendingStep.current = step

			if (!rafScheduled.current) {
				rafScheduled.current = true
				requestAnimationFrame(() => {
					const s = pendingStep.current!
					setData(() => updateArray(s))
					setActiveIndices(s.swapped)

					if (s.swapped[0] !== -1) {
						playNote(200 + s.array[s.swapped[0]] * 5)
					}

					rafScheduled.current = false
					pendingStep.current = null
				})
			}
		},
		[playNote, updateArray]
	)

	const handleComplete = useCallback(() => {
		setIsComplete(true)
		setActiveIndices([-1, -1])

		data.forEach((value, index) => {
			setTimeout(() => {
				setActiveIndices([index, index])
				playNote(200 + value * 5)
			}, index * 30)
		})
	}, [data, playNote])

	const speedMultipliers: Record<SortingAlgorithm, number> = {
		bubble: 1,
		quick: 2,
		merge: 4,
		insertion: 1,
		heap: 3,
		shell: 2,
		counting: 1,
	}

	const effectiveSpeed = Math.max(
		1,
		speed / speedMultipliers[selectedAlgorithm as keyof typeof speedMultipliers]
	)

	const { startSorting, resetSorting, isSorting } = useSorting({
		algorithm: sortingAlgorithms[selectedAlgorithm as keyof typeof sortingAlgorithms].generator,
		onStep: handleStep,
		onComplete: handleComplete,
		speed: effectiveSpeed,
	})

	const handleStart = useCallback(() => {
		completeRef.current = false
		setIsComplete(false)
		startSorting(dataRef.current)
	}, [startSorting])

	const handleReset = useCallback(() => {
		resetSorting()
		completeRef.current = false
		setIsComplete(false)
		const newData = shuffleArray(Array.from({ length: arraySize }, (_, i) => i + 1))
		setData(newData)
		dataRef.current = newData
		setActiveIndices([-1, -1])
	}, [arraySize, resetSorting])

	const handleAlgorithmChange = useCallback(
		(algorithm: string) => {
			resetSorting()
			setIsComplete(false)
			setSelectedAlgorithm(algorithm)
			handleReset()
		},
		[resetSorting, handleReset]
	)

	const handleSizeChange = useCallback(
		(size: number) => {
			resetSorting()
			setIsComplete(false)
			setArraySize(size)
			const newData = shuffleArray(Array.from({ length: size }, (_, i) => i + 1))
			setData(newData)
			dataRef.current = newData
			setActiveIndices([-1, -1])
		},
		[resetSorting]
	)

	const bars = useMemo(
		() =>
			data.map((value, index) => (
				<Bar
					key={index}
					value={value}
					isActive={activeIndices.includes(index)}
					width={Math.max(100 / arraySize, 1)}
					maxValue={arraySize}
				/>
			)),
		[data, activeIndices, arraySize]
	)

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Controls */}
			<div className='flex flex-col gap-2 p-2 md:p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
				<div className='flex flex-wrap gap-2 items-center justify-center md:justify-start'>
					<select
						value={selectedAlgorithm}
						onChange={(e) => handleAlgorithmChange(e.target.value)}
						className='px-2 py-1 md:px-3 md:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						{Object.entries(sortingAlgorithms).map(([key, algo]) => (
							<option key={key} value={key}>
								{algo.name}
							</option>
						))}
					</select>
					<button
						onClick={handleStart}
						disabled={isComplete || isSorting}
						className={cn(
							'px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed',
							(isComplete || isSorting) && 'opacity-50'
						)}
					>
						Start
					</button>
					<button
						onClick={handleReset}
						className='px-3 py-1 md:px-4 md:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm'
					>
						Reset
					</button>
				</div>
				<div className='flex flex-wrap gap-4 items-center'>
					<div className='flex-1 min-w-[150px] md:min-w-[200px]'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Array Size: {arraySize}
						</label>
						<input
							type='range'
							min='10'
							max='400'
							value={arraySize}
							onChange={(e) => handleSizeChange(Number(e.target.value))}
							className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer'
						/>
					</div>
					<div className='flex-1 min-w-[150px] md:min-w-[200px]'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Speed: {speed}ms
						</label>
						<input
							type='range'
							min='1'
							max='50'
							value={speed}
							onChange={(e) => setSpeed(Number(e.target.value))}
							className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer'
						/>
					</div>
				</div>
			</div>

			{/* Visualization Area */}
			<div className='w-full flex flex-col md:flex-row h-[calc(100vh-112px)]'>
				{/* Bars Visualization */}
				<div className='w-full md:w-1/2 h-full bg-gray-50 dark:bg-gray-900 p-2 md:p-4 overflow-hidden'>
					<div className='h-full w-full flex items-end gap-[1px]'>{bars}</div>
				</div>

				{/* Code Display */}
				<div className='w-full md:w-1/2 max-h-[40vh] md:max-h-none h-auto md:h-full bg-white dark:bg-gray-800 p-4 overflow-y-auto'>
					<SyntaxHighlighter
						language='typescript'
						style={oneDark}
						customStyle={{
							margin: 0,
							background: 'transparent',
							padding: '1rem',
						}}
					>
						{sortingAlgorithms[selectedAlgorithm as keyof typeof sortingAlgorithms].code}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	)
}

function shuffleArray(arr: number[]): number[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}
